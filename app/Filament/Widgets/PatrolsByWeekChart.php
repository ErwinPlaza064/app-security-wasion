<?php

namespace App\Filament\Widgets;

use App\Models\PatrolLog;
use Filament\Widgets\ChartWidget;
use Filament\Widgets\Concerns\InteractsWithPageFilters;
use Illuminate\Support\Facades\DB;

class PatrolsByWeekChart extends ChartWidget
{
    use InteractsWithPageFilters;

    protected static ?int $sort = 31;

    protected static ?string $heading = 'Recorridos por semana';
    protected static ?string $maxHeight = '300px';

    protected function getData(): array
    {
        $filters = $this->filters;

        // Grouping by week
        $data = PatrolLog::query()
            ->when($filters['plant'] ?? null, fn ($query, $plant) => $query->where('plant', $plant))
            ->when($filters['startDate'] ?? null, fn ($query, $date) => $query->whereDate('happened_at', '>=', $date))
            ->when($filters['endDate'] ?? null, fn ($query, $date) => $query->whereDate('happened_at', '<=', $date))
            ->select(
                DB::raw("extract(week from happened_at) as week"),
                DB::raw('count(*) as aggregate')
            )
            ->groupBy('week')
            ->orderBy('week')
            ->get()
            ->pluck('aggregate', 'week');

        $finalData = [];
        $labels = [];
        
        // If filters are active, we show the weeks found in the data or a fixed range
        // For simplicity, we'll keep showing a range or just the keys
        foreach ($data as $weekNum => $count) {
            $labels[] = "Semana $weekNum";
            $finalData[] = $count;
        }

        if (empty($labels)) {
            for ($i = 1; $i <= 4; $i++) {
                $labels[] = "Semana $i";
                $finalData[] = 0;
            }
        }

        return [
            'datasets' => [
                [
                    'label' => 'Recorridos',
                    'data' => $finalData,
                    'backgroundColor' => '#0c1869',
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}
