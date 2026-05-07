<?php

namespace App\Filament\Widgets;

use App\Models\AccessLog;
use Filament\Widgets\Widget;
use Filament\Widgets\Concerns\InteractsWithPageFilters;
use Illuminate\Support\Facades\DB;

class AccessByTypeChart extends Widget
{
    use InteractsWithPageFilters;

    protected static ?int $sort = 5;
    protected static string $view = 'filament.widgets.custom-horizontal-bar-chart';

    protected int | string | array $columnSpan = [
        'md' => 1,
        'xl' => 1,
    ];

    protected function getViewData(): array
    {
        $filters = $this->filters;

        $data = AccessLog::query()
            ->when($filters['plant'] ?? null, fn ($query, $plant) => $query->where('plant', $plant))
            ->when($filters['startDate'] ?? null, fn ($query, $date) => $query->whereDate('entry_at', '>=', $date))
            ->when($filters['endDate'] ?? null, fn ($query, $date) => $query->whereDate('entry_at', '<=', $date))
            ->select('type', DB::raw('count(*) as aggregate'))
            ->groupBy('type')
            ->orderByDesc('aggregate')
            ->get();

        $labelsMap = [
            'visitor' => 'Visitantes',
            'contractor' => 'Contratistas',
            'provider' => 'Proveedores',
        ];

        $colors = ['#0C1869'];

        $items = $data->map(fn ($row) => [
            'label' => $labelsMap[$row->type] ?? $row->type,
            'value' => $row->aggregate,
        ])->toArray();

        return [
            'heading' => 'Cant. de proveedores, contratistas y visitantes',
            'items' => $items,
            'maxValue' => $data->max('aggregate') ?? 0,
            'colors' => $colors,
        ];
    }
}
