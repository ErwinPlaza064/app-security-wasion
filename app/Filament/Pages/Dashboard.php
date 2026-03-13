<?php

namespace App\Filament\Pages;

use Filament\Pages\Dashboard as BaseDashboard;

class Dashboard extends BaseDashboard
{
    public function getWidgets(): array
    {
        return [
            \App\Filament\Widgets\WelcomeWidget::class,
            \App\Filament\Widgets\SecurityOverview::class,
            \App\Filament\Widgets\AccessTrendsChart::class,
            \App\Filament\Widgets\VisitorTypeChart::class,
            \App\Filament\Widgets\AccessByTypeChart::class,
            \App\Filament\Widgets\RecentSecurityActivity::class,
            \App\Filament\Widgets\GoToDashboardWidget::class,
        ];
    }
}
