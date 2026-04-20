<?php

namespace App\Filament\Widgets;

use App\Models\VehicleIncident;
use Filament\Widgets\Widget;
use Filament\Widgets\Concerns\InteractsWithPageFilters;
use Illuminate\Support\Facades\DB;

class VehicleIncidentsByPlantChart extends Widget
{
    use InteractsWithPageFilters;

    protected static ?int $sort = 15;
    protected static string $view = 'filament.widgets.custom-bar-chart';

    protected function getViewData(): array
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

        $colors = ['#0c1869', '#E63946', '#2A9D8F', '#F4A261', '#E76F51', '#264653'];

        $items = $data->map(fn ($row) => [
            'label' => $row->plant ?? 'Sin planta',
            'value' => $row->aggregate,
        ])->toArray();

        return [
            'heading' => 'Incidencias vehiculares por planta',
            'items' => $items,
            'maxValue' => $data->max('aggregate') ?? 0,
            'colors' => $colors,
        ];
    }
}
