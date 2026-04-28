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
        $filters = $this->filters;

        $data = SecuritySpecialLog::query()
            ->where('type', 'no_badge')
            ->when($filters['plant'] ?? null, fn ($query, $plant) => $query->where('plant', $plant))
            ->when($filters['startDate'] ?? null, fn ($query, $date) => $query->whereDate('created_at', '>=', $date))
            ->when($filters['endDate'] ?? null, fn ($query, $date) => $query->whereDate('created_at', '<=', $date))
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
