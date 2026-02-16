<?php

namespace App\Filament\Superadmin\Widgets;

use App\Models\User;
use App\Models\Area;
use App\Models\Company;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class SuperadminStats extends BaseWidget
{
    protected static ?string $pollingInterval = '30s';

    protected function getStats(): array
    {
        return [
            Stat::make('Total Usuarios', User::count())
                ->description('Usuarios registrados en el sistema')
                ->descriptionIcon('heroicon-m-users')
                ->color('success'),
            Stat::make('Empresas Aliadas', Company::count())
                ->description('Empresas transportistas y contratistas')
                ->descriptionIcon('heroicon-m-building-office')
                ->color('info'),
            Stat::make('Áreas del Sistema', Area::count())
                ->description('Áreas configuradas por planta')
                ->descriptionIcon('heroicon-m-map-pin')
                ->color('warning'),
        ];
    }
}
