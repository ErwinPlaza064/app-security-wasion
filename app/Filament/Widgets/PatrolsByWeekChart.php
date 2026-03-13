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
        $plant = $this->filters['plant'] ?? null;

        // Grouping by week of current month (Postgres compatible)
        $data = PatrolLog::query()
            ->whereMonth('happened_at', now()->month)
            ->whereYear('happened_at', now()->year)
            ->when($plant, fn ($query) => $query->where('plant', $plant))
            ->select(
                DB::raw("extract(week from happened_at) - extract(week from date_trunc('month', happened_at)) + 1 as week"),
                DB::raw('count(*) as aggregate')
            )
            ->groupBy('week')
            ->orderBy('week')
            ->get()
            ->pluck('aggregate', 'week');

        $finalData = [];
        $labels = [];
        for ($i = 1; $i <= 4; $i++) {
            $labels[] = "Semana $i";
            $finalData[] = $data[$i] ?? 0;
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
