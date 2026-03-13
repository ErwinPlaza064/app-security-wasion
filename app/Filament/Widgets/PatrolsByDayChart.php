<?php

namespace App\Filament\Widgets;

use App\Models\PatrolLog;
use Filament\Widgets\ChartWidget;
use Filament\Widgets\Concerns\InteractsWithPageFilters;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class PatrolsByDayChart extends ChartWidget
{
    use InteractsWithPageFilters;

    protected static ?int $sort = 30;

    protected static ?string $heading = 'Recorridos por día';
    protected static ?string $maxHeight = '300px';

    protected function getData(): array
    {
        $plant = $this->filters['plant'] ?? null;

        $data = PatrolLog::query()
            ->when($plant, fn ($query) => $query->where('plant', $plant))
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
        
        $finalData = [];
        $labels = [];
        foreach ($orderedDays as $day) {
            $labels[] = $dayNames[$day];
            $finalData[] = $data[$day] ?? 0;
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
