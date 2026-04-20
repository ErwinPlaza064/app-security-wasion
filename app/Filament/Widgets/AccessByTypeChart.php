<?php

namespace App\Filament\Widgets;

use App\Models\AccessLog;
use Filament\Widgets\ChartWidget;
use Filament\Widgets\Concerns\InteractsWithPageFilters;
use Illuminate\Support\Facades\DB;

class AccessByTypeChart extends ChartWidget
{
    use InteractsWithPageFilters;

    protected static ?int $sort = 5;

    protected static ?string $heading = 'Cant. de proveedores, contratistas y visitantes';
    protected static ?string $maxHeight = '300px';

    protected int | string | array $columnSpan = [
        'md' => 1,
        'xl' => 1,
    ];

    protected function getData(): array
    {
        $plant = $this->filters['plant'] ?? null;

        $data = AccessLog::query()
            ->when($plant, fn ($query) => $query->where('plant', $plant))
            ->select('type', DB::raw('count(*) as aggregate'))
            ->groupBy('type')
            ->orderByDesc('aggregate')
            ->get();

        $labelsMap = [
            'visitor' => 'Visitantes',
            'contractor' => 'Contratistas',
            'provider' => 'Proveedores',
        ];

        return [
            'datasets' => [
                [
                    'label' => 'Cantidad',
                    'data' => $data->pluck('aggregate')->toArray(),
                    'backgroundColor' => '#0c1869',
                ],
            ],
            'labels' => $data->pluck('type')->map(fn($t) => $labelsMap[$t] ?? $t)->toArray(),
        ];
    }

    protected function getOptions(): array
    {
        return [
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
                        'size' => 12,
                    ],
                ],
            ],
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}
