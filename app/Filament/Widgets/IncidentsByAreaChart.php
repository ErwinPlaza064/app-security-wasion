<?php

namespace App\Filament\Widgets;

use App\Models\Incident;
use Filament\Widgets\Widget;
use Filament\Widgets\Concerns\InteractsWithPageFilters;
use Illuminate\Support\Facades\DB;

class IncidentsByAreaChart extends Widget
{
    use InteractsWithPageFilters;

    protected static ?int $sort = 11;
    protected static string $view = 'filament.widgets.custom-bar-chart';

    protected function getViewData(): array
    {
        $filters = $this->filters;

        $data = Incident::query()
            ->when($filters['plant'] ?? null, fn ($query, $plant) => $query->where('plant', $plant))
            ->when($filters['startDate'] ?? null, fn ($query, $date) => $query->whereDate('created_at', '>=', $date))
            ->when($filters['endDate'] ?? null, fn ($query, $date) => $query->whereDate('created_at', '<=', $date))
            ->select('location', DB::raw('count(*) as aggregate'))
            ->groupBy('location')
            ->orderByDesc('aggregate')
            ->get();

        $colors = ['#0C1869'];

        $items = $data->map(fn ($row) => [
            'label' => $row->location ?? 'Sin ubicación',
            'value' => $row->aggregate,
        ])->toArray();

        return [
            'heading' => 'Incidencias por área',
            'items' => $items,
            'maxValue' => $data->max('aggregate') ?? 0,
            'colors' => $colors,
        ];
    }
}
