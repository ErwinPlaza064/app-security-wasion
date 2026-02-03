<?php

namespace App\Filament\Widgets;

use App\Models\AccessLog;
use App\Models\VehicleLog;
use App\Models\Incident;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Carbon\Carbon;

class SecurityOverview extends BaseWidget
{
    protected function getStats(): array
    {
        $today = Carbon::today();

        $visitorsToday = AccessLog::whereDate('entry_at', $today)->count();
        $visitorsYesterday = AccessLog::whereDate('entry_at', Carbon::yesterday())->count();

        $vehiclesToday = VehicleLog::whereDate('entry_at', $today)->count();

        $incidentsOpen = Incident::where('status', 'open')->count();

        return [
            Stat::make('Visitantes Hoy', $visitorsToday)
                ->description($visitorsToday >= $visitorsYesterday ? 'Aumento del personal externo' : 'Menos que ayer')
                ->descriptionIcon($visitorsToday >= $visitorsYesterday ? 'heroicon-m-arrow-trending-up' : 'heroicon-m-arrow-trending-down')
                ->color($visitorsToday >= $visitorsYesterday ? 'success' : 'warning'),

            Stat::make('Accesos Vehiculares', $vehiclesToday)
                ->description('Logística en curso')
                ->descriptionIcon('heroicon-m-truck')
                ->color('info'),

            Stat::make('Incidentes Abiertos', $incidentsOpen)
                ->description('Requieren atención inmediata')
                ->descriptionIcon('heroicon-m-exclamation-triangle')
                ->color($incidentsOpen > 0 ? 'danger' : 'success'),
        ];
    }
}
