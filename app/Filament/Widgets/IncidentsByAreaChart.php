<?php

namespace App\Filament\Widgets;

use App\Models\Incident;
use Filament\Widgets\ChartWidget;
use Filament\Widgets\Concerns\InteractsWithPageFilters;
use Illuminate\Support\Facades\DB;

class IncidentsByAreaChart extends ChartWidget
{
    use InteractsWithPageFilters;

    protected static ?int $sort = 11;

    protected static ?string $heading = 'Incidencias por área';
    protected static ?string $maxHeight = '300px';

    protected function getData(): array
    {
        $plant = $this->tableFilters['plant'] ?? null;

        $data = Incident::query()
            ->when($plant, fn ($query) => $query->where('plant', $plant))
            ->select('location', DB::raw('count(*) as aggregate'))
            ->groupBy('location')
            ->orderByDesc('aggregate')
            ->get();

        return [
            'datasets' => [
                [
                    'label' => 'Incidentes',
                    'data' => $data->pluck('aggregate')->toArray(),
                    'backgroundColor' => '#0c1869',
                ],
            ],
            'labels' => $data->pluck('location')->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}
