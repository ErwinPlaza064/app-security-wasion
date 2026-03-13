<?php

namespace App\Filament\Pages;

use Filament\Pages\Dashboard as BaseDashboard;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Section;
use Filament\Forms\Form;
use Filament\Pages\Dashboard\Concerns\HasFiltersForm;

class AnalyticsDashboard extends BaseDashboard
{
    use HasFiltersForm;

    protected static string $routePath = 'analytics-dashboard';

    protected static ?string $navigationIcon = 'heroicon-o-chart-pie';
    
    protected static ?string $title = 'Dashboard';
    
    protected static ?string $navigationLabel = 'Dashboard';

    protected static ?int $navigationSort = 2;

    public function filtersForm(Form $form): Form
    {
        return $form
            ->schema([
                Section::make()
                    ->schema([
                        Select::make('plant')
                            ->label('Filtrar por Planta')
                            ->placeholder('Todas las plantas')
                            ->options([
                                'Planta 1' => 'Planta 1',
                                'Planta 2' => 'Planta 2',
                                'Planta 3' => 'Planta 3',
                                'Planta 4' => 'Planta 4',
                                'Planta 5' => 'Planta 5',
                            ]),
                    ])
                    ->columns(1),
            ]);
    }

    public function getWidgets(): array
    {
        return collect(\Filament\Facades\Filament::getWidgets())
            ->reject(fn ($widget) => in_array($widget, [
                \App\Filament\Widgets\WelcomeWidget::class,
                \App\Filament\Widgets\GoToDashboardWidget::class,
            ]))
            ->values()
            ->toArray();
    }
}
