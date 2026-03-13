<?php

namespace App\Filament\Widgets;

use App\Models\ExitVoucher;
use Filament\Widgets\ChartWidget;
use Filament\Widgets\Concerns\InteractsWithPageFilters;
use Illuminate\Support\Facades\DB;

class ExitVoucherStatusChart extends ChartWidget
{
    use InteractsWithPageFilters;

    protected static ?int $sort = 25;

    protected static ?string $heading = 'Estatus vales de salida';
    protected static ?string $maxHeight = '300px';

    protected function getData(): array
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

        return [
            'datasets' => [
                [
                    'label' => 'Vales',
                    'data' => [$completedCount, $openCount],
                    'backgroundColor' => ['#0c1869', '#1e293b'],
                ],
            ],
            'labels' => ['Vales cerrados', 'Vales abiertos'],
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}
