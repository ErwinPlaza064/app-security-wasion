<?php

namespace App\Filament\Widgets;

use App\Models\Incident;
use Filament\Widgets\Widget;
use Filament\Widgets\Concerns\InteractsWithPageFilters;
use Illuminate\Support\Facades\DB;

class BehavioralIncidentsChart extends Widget
{
    use InteractsWithPageFilters;

    protected static ?int $sort = 10;
    protected static string $view = 'filament.widgets.custom-bar-chart';

    protected function getViewData(): array
    {
        $filters = $this->filters;

        $data = Incident::query()
            ->where('category', 'conduct')
            ->when($filters['plant'] ?? null, fn ($query, $plant) => $query->where('plant', $plant))
            ->when($filters['startDate'] ?? null, fn ($query, $date) => $query->whereDate('created_at', '>=', $date))
            ->when($filters['endDate'] ?? null, fn ($query, $date) => $query->whereDate('created_at', '<=', $date))
            ->select(DB::raw("COALESCE(type, 'Sin Clasificar') as label_type"), DB::raw('count(*) as aggregate'))
            ->groupBy('label_type')
            ->orderByDesc('aggregate')
            ->get();

        $colors = ['#0C1869', '#1E3A8A', '#2563EB', '#3B82F6', '#1D4ED8', '#1E40AF', '#2E4F9E', '#4B6CB7', '#6B8DD6', '#8AAEE0', '#3C5A99', '#5778B8', '#7195D7', '#8BB3EC'];

        $items = $data->map(fn ($row) => [
            'label' => $row->label_type,
            'value' => $row->aggregate,
        ])->toArray();

        return [
            'heading' => 'Tipos de incidencias (Conductual)',
            'items' => $items,
            'maxValue' => $data->max('aggregate') ?? 0,
            'colors' => $colors,
        ];
    }
}
