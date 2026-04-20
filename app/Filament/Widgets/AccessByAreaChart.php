<?php

namespace App\Filament\Widgets;

use App\Models\AccessLog;
use Filament\Widgets\ChartWidget;
use Filament\Widgets\Concerns\InteractsWithPageFilters;
use Illuminate\Support\Facades\DB;

class AccessByAreaChart extends ChartWidget
{
    use InteractsWithPageFilters;

    protected static ?int $sort = 6;

    protected static ?string $heading = 'Top 10 Áreas con más visitas';
    protected static ?string $maxHeight = '300px';

    protected function getData(): array
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
        $repeatedColors = [];
        for ($i = 0; $i < max(1, $data->count()); $i++) {
            $repeatedColors[] = $colors[$i % count($colors)];
        }

        return [
            'datasets' => [
                [
                    'label' => 'Personas',
                    'data' => $data->pluck('aggregate')->toArray(),
                    'backgroundColor' => $repeatedColors,
                    'borderRadius' => 4,
                ],
            ],
            'labels' => $data->pluck('label_area')->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }

    protected function getOptions(): array
    {
        return [
            'indexAxis' => 'y',
            'scales' => [
                'x' => [
                    'beginAtZero' => true,
                    'ticks' => [
                        'stepSize' => 1,
                        'maxRotation' => 0,
                        'minRotation' => 0,
                    ],
                ],
                'y' => [
                    'ticks' => [
                        'autoSkip' => false,
                    ],
                ],
            ],
            'plugins' => [
                'legend' => [
                    'display' => false,
                ],
                'datalabels' => [
                    'display' => true,
                    'color' => '#ffffff',
                    'anchor' => 'end',
                    'align' => 'start',
                    'font' => [
                        'weight' => 'bold',
                        'size' => 11,
                    ],
                ],
            ],
            'maintainAspectRatio' => false,
        ];
    }
}
