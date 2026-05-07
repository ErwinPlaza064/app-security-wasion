<?php

namespace App\Filament\Widgets;

use App\Models\SecuritySpecialLog;
use Filament\Widgets\Widget;
use Filament\Widgets\Concerns\InteractsWithPageFilters;
use Illuminate\Support\Facades\DB;

class NoBadgeByAreaChart extends Widget
{
    use InteractsWithPageFilters;

    protected static ?int $sort = 21;
    protected static string $view = 'filament.widgets.custom-horizontal-bar-chart';

    protected function getViewData(): array
    {
        $filters = $this->filters;

        $data = SecuritySpecialLog::query()
            ->where('type', 'no_badge')
            ->when($filters['plant'] ?? null, fn ($query, $plant) => $query->where('plant', $plant))
            ->when($filters['startDate'] ?? null, fn ($query, $date) => $query->whereDate('created_at', '>=', $date))
            ->when($filters['endDate'] ?? null, fn ($query, $date) => $query->whereDate('created_at', '<=', $date))
            ->select('department', DB::raw('count(*) as aggregate'))
            ->groupBy('department')
            ->orderByDesc('aggregate')
            ->get();

        $colors = ['#0C1869'];

        $items = $data->map(fn ($row) => [
            'label' => $row->department ?? 'Sin depto.',
            'value' => $row->aggregate,
        ])->toArray();

        return [
            'heading' => 'Ingresos sin gafete por área',
            'items' => $items,
            'maxValue' => $data->max('aggregate') ?? 0,
            'colors' => $colors,
        ];
    }
}
