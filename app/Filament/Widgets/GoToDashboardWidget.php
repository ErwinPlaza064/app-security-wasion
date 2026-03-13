<?php

namespace App\Filament\Widgets;

use Filament\Widgets\Widget;

class GoToDashboardWidget extends Widget
{
    protected static ?int $sort = 3;

    protected static string $view = 'filament.widgets.go-to-dashboard-widget';

    protected int | string | array $columnSpan = [
        'md' => 1,
        'xl' => 1,
    ];
}
