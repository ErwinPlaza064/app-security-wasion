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
        $plant = $this->filters['plant'] ?? null;

        $completedCount = ExitVoucher::query()
            ->where('status', 'completed')
            ->when($plant, fn ($query) => $query->where('plant', $plant))
            ->count();

        $openCount = ExitVoucher::query()
            ->where('status', '!=', 'completed')
            ->when($plant, fn ($query) => $query->where('plant', $plant))
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
