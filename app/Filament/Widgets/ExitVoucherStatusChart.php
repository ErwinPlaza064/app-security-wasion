<?php

namespace App\Filament\Widgets;

use App\Models\ExitVoucher;
use Filament\Widgets\Widget;
use Filament\Widgets\Concerns\InteractsWithPageFilters;

class ExitVoucherStatusChart extends Widget
{
    use InteractsWithPageFilters;

    protected static ?int $sort = 25;
    protected static string $view = 'filament.widgets.custom-horizontal-bar-chart';

    protected int | string | array $columnSpan = 'full';

    protected function getViewData(): array
    {
        $filters = $this->filters;

        $completedCount = ExitVoucher::query()
            ->where('status', 'completed')
            ->when($filters['plant'] ?? null, fn ($query, $plant) => $query->where('plant', $plant))
            ->when($filters['startDate'] ?? null, fn ($query, $date) => $query->whereDate('created_at', '>=', $date))
            ->when($filters['endDate'] ?? null, fn ($query, $date) => $query->whereDate('created_at', '<=', $date))
            ->count();

        $openCount = ExitVoucher::query()
            ->where('status', '!=', 'completed')
            ->when($filters['plant'] ?? null, fn ($query, $plant) => $query->where('plant', $plant))
            ->when($filters['startDate'] ?? null, fn ($query, $date) => $query->whereDate('created_at', '>=', $date))
            ->when($filters['endDate'] ?? null, fn ($query, $date) => $query->whereDate('created_at', '<=', $date))
            ->count();

        $items = [
            ['label' => 'Vales cerrados', 'value' => $completedCount],
            ['label' => 'Vales abiertos', 'value' => $openCount],
        ];

        return [
            'heading' => 'Estatus vales de salida',
            'items' => $items,
            'maxValue' => max($completedCount, $openCount, 1),
            'colors' => ['#0C1869'],
        ];
    }
}
