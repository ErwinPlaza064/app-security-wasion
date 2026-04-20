<?php

namespace App\Filament\Widgets;

use App\Models\PatrolLog;
use Filament\Widgets\Widget;
use Filament\Widgets\Concerns\InteractsWithPageFilters;
use Illuminate\Support\Facades\DB;

class PatrolsByDayChart extends Widget
{
    use InteractsWithPageFilters;

    protected static ?int $sort = 30;
    protected static string $view = 'filament.widgets.custom-vertical-bar-chart';

    protected function getViewData(): array
    {
        $filters = $this->filters;

        $data = PatrolLog::query()
            ->when($filters['plant'] ?? null, fn ($query, $plant) => $query->where('plant', $plant))
            ->when($filters['startDate'] ?? null, fn ($query, $date) => $query->whereDate('happened_at', '>=', $date))
            ->when($filters['endDate'] ?? null, fn ($query, $date) => $query->whereDate('happened_at', '<=', $date))
            ->select(DB::raw("trim(to_char(happened_at, 'Day')) as day"), DB::raw('count(*) as aggregate'))
            ->groupBy('day')
            ->get()
            ->pluck('aggregate', 'day');

        $dayNames = [
            'Monday' => 'Lunes',
            'Tuesday' => 'Martes',
            'Wednesday' => 'Miércoles',
            'Thursday' => 'Jueves',
            'Friday' => 'Viernes',
            'Saturday' => 'Sábado',
            'Sunday' => 'Domingo',
        ];

        // Ensure we follow the order in the screenshot: Miercoles, Jueves, Viernes, Sabado, Domingo, Lunes, Martes
        // Actually, screenshot shows a specific 7-day window. I'll just use a standard week order or the one from screenshot.
        $orderedDays = ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday'];

        $items = [];
        foreach ($orderedDays as $day) {
            $items[] = [
                'label' => $dayNames[$day],
                'value' => $data[$day] ?? 0,
            ];
        }

        $maxValue = max(array_column($items, 'value') ?: [0]);

        return [
            'heading' => 'Recorridos por día',
            'items' => $items,
            'maxValue' => $maxValue ?: 1,
            'colors' => ['#0c1869'],
        ];
    }
}
