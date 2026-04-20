<?php

namespace App\Filament\Widgets;

use App\Models\VehicleIncident;
use Filament\Widgets\Widget;
use Filament\Widgets\Concerns\InteractsWithPageFilters;
use Illuminate\Support\Facades\DB;

class VehicleIncidentsByAreaChart extends Widget
{
    use InteractsWithPageFilters;

    protected static ?int $sort = 16;
    protected static string $view = 'filament.widgets.custom-bar-chart';

    protected function getViewData(): array
    {
        $filters = $this->filters;

        $data = VehicleIncident::query()
            ->when($filters['plant'] ?? null, fn ($query, $plant) => $query->where('plant', $plant))
            ->when($filters['startDate'] ?? null, fn ($query, $date) => $query->whereDate('created_at', '>=', $date))
            ->when($filters['endDate'] ?? null, fn ($query, $date) => $query->whereDate('created_at', '<=', $date))
            ->select('area', DB::raw('count(*) as aggregate'))
            ->groupBy('area')
            ->orderByDesc('aggregate')
            ->get();

        $colors = ['#0C1869', '#1E3A8A', '#2563EB', '#3B82F6', '#1D4ED8', '#1E40AF', '#2E4F9E', '#4B6CB7', '#6B8DD6', '#8AAEE0'];

        $items = $data->map(fn ($row) => [
            'label' => $row->area ?? 'Sin área',
            'value' => $row->aggregate,
        ])->toArray();

        return [
            'heading' => 'Incidencias vehiculares por área',
            'items' => $items,
            'maxValue' => $data->max('aggregate') ?? 0,
            'colors' => $colors,
        ];
    }
}
