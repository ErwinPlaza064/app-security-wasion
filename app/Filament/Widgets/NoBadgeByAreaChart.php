<?php

namespace App\Filament\Widgets;

use App\Models\SecuritySpecialLog;
use Filament\Widgets\ChartWidget;
use Filament\Widgets\Concerns\InteractsWithPageFilters;
use Illuminate\Support\Facades\DB;

class NoBadgeByAreaChart extends ChartWidget
{
    use InteractsWithPageFilters;

    protected static ?int $sort = 21;

    protected static ?string $heading = 'Ingresos sin gafete por área';
    protected static ?string $maxHeight = '300px';

    protected function getData(): array
    {
        $plant = $this->filters['plant'] ?? null;

        $data = SecuritySpecialLog::query()
            ->where('type', 'no_badge')
            ->when($plant, fn ($query) => $query->where('plant', $plant))
            ->select('department', DB::raw('count(*) as aggregate'))
            ->groupBy('department')
            ->orderByDesc('aggregate')
            ->get();

        return [
            'datasets' => [
                [
                    'label' => 'Ingresos',
                    'data' => $data->pluck('aggregate')->toArray(),
                    'backgroundColor' => '#0c1869',
                ],
            ],
            'labels' => $data->pluck('department')->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}
