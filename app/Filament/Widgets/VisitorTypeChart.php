<?php

namespace App\Filament\Widgets;

use App\Models\AccessLog;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;

class VisitorTypeChart extends ChartWidget
{
    protected static ?int $sort = 4;

    protected static ?string $heading = 'Distribución por Tipo de Acceso';

    protected static ?string $maxHeight = '300px';

    protected int | string | array $columnSpan = [
        'md' => 1,
        'xl' => 1,
    ];

    protected function getData(): array
    {
        $data = AccessLog::select('type', DB::raw('count(*) as count'))
            ->groupBy('type')
            ->pluck('count', 'type')
            ->toArray();

        $labels = [
            'visitor' => 'Visitantes',
            'supplier' => 'Proveedores',
            'contractor' => 'Contratistas',
            'laptop_only' => 'Laptops',
            'employee_laptop' => 'Laptop Colab.',
        ];

        $chartData = [];
        $chartLabels = [];

        foreach ($data as $type => $count) {
            $chartLabels[] = $labels[$type] ?? $type;
            $chartData[] = $count;
        }

        return [
            'datasets' => [
                [
                    'label' => 'Total de registros',
                    'data' => $chartData,
                    'backgroundColor' => [
                        '#0c1869', // visitor
                        '#10b981', // supplier
                        '#f59e0b', // contractor
                        '#6366f1', // laptop
                        '#94a3b8', // colab
                    ],
                ],
            ],
            'labels' => $chartLabels,
        ];
    }

    protected function getType(): string
    {
        return 'doughnut';
    }
}
