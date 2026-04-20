<?php

namespace App\Filament\Widgets;

use App\Models\SecuritySpecialLog;
use Filament\Widgets\Widget;
use Filament\Widgets\Concerns\InteractsWithPageFilters;
use Illuminate\Support\Facades\DB;

class NoBadgeReasonsChart extends Widget
{
    use InteractsWithPageFilters;

    protected static ?int $sort = 20;
    protected static string $view = 'filament.widgets.custom-bar-chart';

    protected function getViewData(): array
    {
        $plant = $this->filters['plant'] ?? null;

        $data = SecuritySpecialLog::query()
            ->where('type', 'no_badge')
            ->when($plant, fn ($query) => $query->where('plant', $plant))
            ->select('suspension_reason', DB::raw('count(*) as aggregate'))
            ->groupBy('suspension_reason')
            ->orderByDesc('aggregate')
            ->get();

        $colors = ['#0C1869'];

        $items = $data->map(fn ($row) => [
            'label' => $row->suspension_reason ?? 'Sin motivo',
            'value' => $row->aggregate,
        ])->toArray();

        return [
            'heading' => 'Motivo de ingreso sin gafete',
            'items' => $items,
            'maxValue' => $data->max('aggregate') ?? 0,
            'colors' => $colors,
        ];
    }
}
