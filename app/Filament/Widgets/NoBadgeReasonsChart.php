<?php

namespace App\Filament\Widgets;

use App\Models\SecuritySpecialLog;
use Filament\Widgets\ChartWidget;
use Filament\Widgets\Concerns\InteractsWithPageFilters;
use Illuminate\Support\Facades\DB;

class NoBadgeReasonsChart extends ChartWidget
{
    use InteractsWithPageFilters;

    protected static ?int $sort = 20;

    protected static ?string $heading = 'Motivo de ingreso sin gafete';
    protected static ?string $maxHeight = '300px';

    protected function getData(): array
    {
        $plant = $this->filters['plant'] ?? null;

        $data = SecuritySpecialLog::query()
            ->where('type', 'no_badge')
            ->when($plant, fn ($query) => $query->where('plant', $plant))
            ->select('suspension_reason', DB::raw('count(*) as aggregate'))
            ->groupBy('suspension_reason')
            ->orderByDesc('aggregate')
            ->get();

        return [
            'datasets' => [
                [
                    'label' => 'Ocurrencias',
                    'data' => $data->pluck('aggregate')->toArray(),
                    'backgroundColor' => '#0c1869',
                ],
            ],
            'labels' => $data->pluck('suspension_reason')->toArray(),
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
