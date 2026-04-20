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

        $colors = ['#0c1869', '#E63946', '#2A9D8F', '#F4A261', '#E76F51', '#264653', '#A8DADC', '#457B9D', '#1D3557', '#F1FAEE', '#8AB17D', '#B5838D', '#E5989B', '#FFB4A2'];

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
