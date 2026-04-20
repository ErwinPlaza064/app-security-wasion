<?php

namespace App\Filament\Widgets;

use App\Models\SecuritySpecialLog;
use Filament\Widgets\Widget;
use Filament\Widgets\Concerns\InteractsWithPageFilters;
use Illuminate\Support\Facades\DB;

class NoBadgeByAreaChart extends Widget
{
    use InteractsWithPageFilters;

    protected static ?int $sort = 21;
    protected static string $view = 'filament.widgets.custom-bar-chart';

    protected function getViewData(): array
    {
        $plant = $this->filters['plant'] ?? null;

        $data = SecuritySpecialLog::query()
            ->where('type', 'no_badge')
            ->when($plant, fn ($query) => $query->where('plant', $plant))
            ->select('department', DB::raw('count(*) as aggregate'))
            ->groupBy('department')
            ->orderByDesc('aggregate')
            ->get();

        $colors = ['#0C1869'];

        $items = $data->map(fn ($row) => [
            'label' => $row->department ?? 'Sin depto.',
            'value' => $row->aggregate,
        ])->toArray();

        return [
            'heading' => 'Ingresos sin gafete por área',
            'items' => $items,
            'maxValue' => $data->max('aggregate') ?? 0,
            'colors' => $colors,
        ];
    }
}
