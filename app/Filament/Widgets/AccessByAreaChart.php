<?php

namespace App\Filament\Widgets;

use App\Models\AccessLog;
use Filament\Widgets\Widget;
use Filament\Widgets\Concerns\InteractsWithPageFilters;
use Illuminate\Support\Facades\DB;

class AccessByAreaChart extends Widget
{
    use InteractsWithPageFilters;

    protected static ?int $sort = 6;
    protected static string $view = 'filament.widgets.custom-bar-chart';

    protected function getViewData(): array
    {
        $filters = $this->filters;

        $data = AccessLog::query()
            ->when($filters['plant'] ?? null, fn ($query, $plant) => $query->where('plant', $plant))
            ->when($filters['startDate'] ?? null, fn ($query, $date) => $query->whereDate('entry_at', '>=', $date))
            ->when($filters['endDate'] ?? null, fn ($query, $date) => $query->whereDate('entry_at', '<=', $date))
            ->select(DB::raw("COALESCE(work_area, 'Sin Área Especificada') as label_area"), DB::raw('count(*) as aggregate'))
            ->groupBy('label_area')
            ->orderByDesc('aggregate')
            ->limit(10)
            ->get();

        $colors = ['#0C1869', '#1E3A8A', '#2563EB', '#3B82F6', '#1D4ED8', '#1E40AF', '#2E4F9E', '#4B6CB7', '#6B8DD6', '#8AAEE0', '#3C5A99', '#5778B8', '#7195D7', '#8BB3EC'];

        $items = $data->map(fn ($row) => [
            'label' => $row->label_area,
            'value' => $row->aggregate,
        ])->toArray();

        return [
            'heading' => 'Top 10 Áreas con más visitas',
            'items' => $items,
            'maxValue' => $data->max('aggregate') ?? 0,
            'colors' => $colors,
        ];
    }
}
