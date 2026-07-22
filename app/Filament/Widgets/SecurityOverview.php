<?php

namespace App\Filament\Widgets;

use App\Models\AccessLog;
use App\Models\VehicleLog;
use App\Models\Incident;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Filament\Widgets\Concerns\InteractsWithPageFilters;
use Carbon\Carbon;

class SecurityOverview extends BaseWidget
{
    use InteractsWithPageFilters;

    protected static ?int $sort = 1;

    protected int | string | array $columnSpan = [
        'md' => 2,
        'xl' => 2,
    ];

    protected function getStats(): array
    {
        $filters = $this->filters;
        $today = Carbon::today();

        // Aplicamos los filtros globales si existen
        $visitorsQuery = AccessLog::query()
            ->when($filters['plant'] ?? null, fn ($query, $plant) => $query->where('plant', $plant))
            ->when($filters['startDate'] ?? null, fn ($query, $date) => $query->whereDate('entry_at', '>=', $date))
            ->when($filters['endDate'] ?? null, fn ($query, $date) => $query->whereDate('entry_at', '<=', $date));

        $vehiclesQuery = VehicleLog::query()
            ->when($filters['plant'] ?? null, fn ($query, $plant) => $query->where('plant', $plant))
            ->when($filters['startDate'] ?? null, fn ($query, $date) => $query->whereDate('entry_at', '>=', $date))
            ->when($filters['endDate'] ?? null, fn ($query, $date) => $query->whereDate('entry_at', '<=', $date));

        $incidentsQuery = Incident::query()
            ->when($filters['plant'] ?? null, fn ($query, $plant) => $query->where('plant', $plant))
            ->when($filters['startDate'] ?? null, fn ($query, $date) => $query->whereDate('created_at', '>=', $date))
            ->when($filters['endDate'] ?? null, fn ($query, $date) => $query->whereDate('created_at', '<=', $date));

        $visitorsCount = $visitorsQuery->count();
        $vehiclesCount = $vehiclesQuery->count();
        $incidentsCount = $incidentsQuery->count();
        $incidentsOpen = (clone $incidentsQuery)->whereIn('status', ['open', 'investigating'])->count();

        // Datos para comparar si no hay filtros activos de fechas (comportamiento original de "Hoy")
        if (empty($filters['startDate']) && empty($filters['endDate'])) {
            $plantFilter = $filters['plant'] ?? null;

            $visitorsToday = AccessLog::whereDate('entry_at', $today)
                ->when($plantFilter, fn ($query, $plant) => $query->where('plant', $plant))
                ->count();
            $visitorsYesterday = AccessLog::whereDate('entry_at', Carbon::yesterday())
                ->when($plantFilter, fn ($query, $plant) => $query->where('plant', $plant))
                ->count();
            
            $vehiclesToday = VehicleLog::whereDate('entry_at', $today)
                ->when($plantFilter, fn ($query, $plant) => $query->where('plant', $plant))
                ->count();
            $vehiclesYesterday = VehicleLog::whereDate('entry_at', Carbon::yesterday())
                ->when($plantFilter, fn ($query, $plant) => $query->where('plant', $plant))
                ->count();

            return [
                Stat::make('Visitantes Hoy', $visitorsToday)
                    ->description($visitorsToday >= $visitorsYesterday ? 'Aumento del personal externo' : 'Menos que ayer')
                    ->descriptionIcon($visitorsToday >= $visitorsYesterday ? 'heroicon-m-arrow-trending-up' : 'heroicon-m-arrow-trending-down')
                    ->color($visitorsToday >= $visitorsYesterday ? 'success' : 'warning')
                    ->url(\App\Filament\Resources\AccessLogResource::getUrl()),

                Stat::make('Accesos Vehiculares Hoy', $vehiclesToday)
                    ->description($vehiclesToday >= $vehiclesYesterday ? 'Mayor flujo vehicular' : 'Menor flujo vehicular')
                    ->descriptionIcon($vehiclesToday >= $vehiclesYesterday ? 'heroicon-m-arrow-trending-up' : 'heroicon-m-arrow-trending-down')
                    ->color($vehiclesToday >= $vehiclesYesterday ? 'success' : 'info')
                    ->url(\App\Filament\Resources\VehicleLogResource::getUrl()),

                Stat::make('Incidentes Abiertos', $incidentsOpen)
                    ->description('Requieren atención inmediata')
                    ->descriptionIcon('heroicon-m-exclamation-triangle')
                    ->color($incidentsOpen > 0 ? 'danger' : 'success')
                    ->url(\App\Filament\Resources\IncidentResource::getUrl()),
            ];
        }

        return [
            Stat::make('Total Visitantes', $visitorsCount)
                ->description('En el periodo seleccionado')
                ->descriptionIcon('heroicon-m-users')
                ->color('primary')
                ->url(\App\Filament\Resources\AccessLogResource::getUrl()),

            Stat::make('Total Vehículos', $vehiclesCount)
                ->description('En el periodo seleccionado')
                ->descriptionIcon('heroicon-m-truck')
                ->color('info')
                ->url(\App\Filament\Resources\VehicleLogResource::getUrl()),

            Stat::make('Total Incidentes', $incidentsCount)
                ->description($incidentsOpen . ' aún sin resolver')
                ->descriptionIcon('heroicon-m-exclamation-triangle')
                ->color($incidentsOpen > 0 ? 'danger' : 'success')
                ->url(\App\Filament\Resources\IncidentResource::getUrl()),
        ];
    }
}
