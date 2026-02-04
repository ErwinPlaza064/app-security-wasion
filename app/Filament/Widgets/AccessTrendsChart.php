<?php

namespace App\Filament\Widgets;

use App\Models\AccessLog;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class AccessTrendsChart extends ChartWidget
{
    protected static ?int $sort = 3; // Dejamos el 2 para el welcome

    protected static ?string $heading = 'Tendencia de Accesos (Últimos 7 días)';

    protected static ?string $maxHeight = '300px';

    protected int | string | array $columnSpan = [
        'md' => 2,
        'xl' => 2,
    ];

    protected function getData(): array
    {
        $data = AccessLog::select(
            DB::raw('DATE(entry_at) as date'),
            DB::raw('count(*) as aggregate')
        )
            ->where('entry_at', '>=', now()->subDays(6)->startOfDay())
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->pluck('aggregate', 'date');

        // Llenar huecos de días sin registros
        $finalData = [];
        $labels = [];

        for ($i = 6; $i >= 0; $i--) {
            $dateObj = now()->subDays($i);
            $date = $dateObj->format('Y-m-d');

            // Traducción manual o vía Carbon si está configurado el locale
            $dayNames = [
                'Mon' => 'Lun',
                'Tue' => 'Mar',
                'Wed' => 'Mié',
                'Thu' => 'Jue',
                'Fri' => 'Vie',
                'Sat' => 'Sáb',
                'Sun' => 'Dom',
            ];

            $labels[] = $dayNames[$dateObj->format('D')];
            $finalData[] = $data[$date] ?? 0;
        }

        return [
            'datasets' => [
                [
                    'label' => 'Entradas registradas',
                    'data' => $finalData,
                    'fill' => 'start',
                    'tension' => 0.4,
                    'backgroundColor' => 'rgba(12, 24, 105, 0.1)',
                    'borderColor' => '#0c1869',
                    'pointBackgroundColor' => '#0c1869',
                    'pointBorderColor' => '#fff',
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
