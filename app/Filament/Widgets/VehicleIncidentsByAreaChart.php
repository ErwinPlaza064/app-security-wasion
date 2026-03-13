<?php

namespace App\Filament\Widgets;

use App\Models\VehicleIncident;
use Filament\Widgets\ChartWidget;
use Filament\Widgets\Concerns\InteractsWithPageFilters;
use Illuminate\Support\Facades\DB;

class VehicleIncidentsByAreaChart extends ChartWidget
{
    use InteractsWithPageFilters;

    protected static ?int $sort = 16;

    protected static ?string $heading = 'Incidencias vehiculares por área';
    protected static ?string $maxHeight = '300px';

    protected function getData(): array
    {
        $plant = $this->filters['plant'] ?? null;

        $data = VehicleIncident::query()
            ->when($plant, fn ($query) => $query->where('plant', $plant))
            ->select('area', DB::raw('count(*) as aggregate'))
            ->groupBy('area')
            ->orderByDesc('aggregate')
            ->get();

        return [
            'datasets' => [
                [
                    'label' => 'Incidencias',
                    'data' => $data->pluck('aggregate')->toArray(),
                    'backgroundColor' => '#0c1869',
                ],
            ],
            'labels' => $data->pluck('area')->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}
