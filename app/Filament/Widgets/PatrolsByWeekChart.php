<?php

namespace App\Filament\Widgets;

use App\Models\PatrolLog;
use Filament\Widgets\Widget;
use Filament\Widgets\Concerns\InteractsWithPageFilters;
use Illuminate\Support\Facades\DB;

class PatrolsByWeekChart extends Widget
{
    use InteractsWithPageFilters;

    protected static ?int $sort = 31;
    protected static string $view = 'filament.widgets.custom-bar-chart';

    protected function getViewData(): array
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

        $items = [];

        // If filters are active, we show the weeks found in the data or a fixed range
        // For simplicity, we'll keep showing a range or just the keys
        foreach ($data as $weekNum => $count) {
            $items[] = [
                'label' => "Sem $weekNum",
                'value' => $count,
            ];
        }

        if (empty($items)) {
            for ($i = 1; $i <= 4; $i++) {
                $items[] = [
                    'label' => "Sem $i",
                    'value' => 0,
                ];
            }
        }

        $maxValue = max(array_column($items, 'value') ?: [0]);

        return [
            'heading' => 'Recorridos por semana',
            'items' => $items,
            'maxValue' => $maxValue ?: 1,
            'colors' => ['#0C1869'],
        ];
    }
}
