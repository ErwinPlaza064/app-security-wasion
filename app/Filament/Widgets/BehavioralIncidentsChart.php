<?php

namespace App\Filament\Widgets;

use App\Models\Incident;
use Filament\Widgets\ChartWidget;
use Filament\Widgets\Concerns\InteractsWithPageFilters;
use Illuminate\Support\Facades\DB;

class BehavioralIncidentsChart extends ChartWidget
{
    use InteractsWithPageFilters;

    protected static ?int $sort = 10;

    protected static ?string $heading = 'Tipos de incidencias (Conductual)';
    protected static ?string $maxHeight = '300px';

    protected function getData(): array
    {
        $plant = $this->tableFilters['plant'] ?? null;

        $data = Incident::query()
            ->where('category', 'conduct')
            ->when($plant, fn ($query) => $query->where('plant', $plant))
            ->select('involved_person', DB::raw('count(*) as aggregate'))
            ->groupBy('involved_person')
            ->orderByDesc('aggregate')
            ->limit(10)
            ->get();

        // Note: The screenshot shows labels like "Attempted theft", "Dress Code", etc.
        // My Incident categories are 'general', 'damage', 'conduct', etc.
        // But the user screenshot shows these specific labels for "Tipos de incidencias".
        // It's possible they use 'involved_person' or 'description' for these labels if they aren't standardized.
        // For now, I'll group by description as it's the most likely place for "Dress Code" etc if conduct is a sub-type.
        
        $data = Incident::query()
            ->where('category', 'conduct')
            ->when($plant, fn ($query) => $query->where('plant', $plant))
            ->select('description', DB::raw('count(*) as aggregate'))
            ->groupBy('description')
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
            'labels' => $data->pluck('description')->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}
