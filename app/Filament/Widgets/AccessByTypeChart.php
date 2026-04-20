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
    protected static string $view = 'filament.widgets.custom-bar-chart';

    protected int | string | array $columnSpan = [
        'md' => 1,
        'xl' => 1,
    ];

    protected function getViewData(): array
    {
        $plant = $this->filters['plant'] ?? null;

        $data = AccessLog::query()
            ->when($plant, fn ($query) => $query->where('plant', $plant))
            ->select('type', DB::raw('count(*) as aggregate'))
            ->groupBy('type')
            ->orderByDesc('aggregate')
            ->get();

        $labelsMap = [
            'visitor' => 'Visitantes',
            'contractor' => 'Contratistas',
            'provider' => 'Proveedores',
        ];

        $colors = ['#0C1869', '#1E3A8A', '#2563EB', '#3B82F6', '#1D4ED8', '#1E40AF', '#2E4F9E', '#4B6CB7'];

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
