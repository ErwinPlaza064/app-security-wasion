<?php

namespace App\Filament\Widgets;

use App\Models\VehicleIncident;
use Filament\Widgets\ChartWidget;
use Filament\Widgets\Concerns\InteractsWithPageFilters;
use Illuminate\Support\Facades\DB;

class VehicleIncidentsByPlantChart extends ChartWidget
{
    use InteractsWithPageFilters;

    protected static ?int $sort = 15;

    protected static ?string $heading = 'Incidencias vehiculares por planta';
    protected static ?string $maxHeight = '300px';

    protected function getData(): array
    {
        $filters = $this->filters;

        $data = VehicleIncident::query()
            ->when($filters['plant'] ?? null, fn ($query, $plant) => $query->where('plant', $plant))
            ->when($filters['startDate'] ?? null, fn ($query, $date) => $query->whereDate('created_at', '>=', $date))
            ->when($filters['endDate'] ?? null, fn ($query, $date) => $query->whereDate('created_at', '<=', $date))
            ->select('plant', DB::raw('count(*) as aggregate'))
            ->groupBy('plant')
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
            'labels' => $data->pluck('plant')->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }

    protected function getOptions(): array
    {
        return [
            'indexAxis' => 'y',
        ];
    }
}
