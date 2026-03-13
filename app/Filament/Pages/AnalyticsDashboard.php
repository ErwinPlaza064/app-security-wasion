<?php

namespace App\Filament\Pages;

use Filament\Pages\Dashboard as BaseDashboard;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Section;
use Filament\Forms\Form;
use Filament\Pages\Dashboard\Concerns\HasFiltersForm;
use Filament\Forms\Components\Actions\Action;
use Filament\Forms\Set;

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
                Section::make('Filtros')
                    ->headerActions([
                        Action::make('reset')
                            ->label('Resetear Filtros')
                            ->icon('heroicon-m-arrow-path')
                            ->color('gray')
                            ->size('sm')
                            ->action(function (Set $set) {
                                $set('plant', null);
                                $set('period', null);
                                $set('startDate', null);
                                $set('endDate', null);
                            }),
                    ])
                    ->schema([
                        Select::make('plant')
                            ->label('Planta')
                            ->placeholder('Todas las plantas')
                            ->options([
                                'Planta 1' => 'Planta 1',
                                'Planta 2' => 'Planta 2',
                                'Planta 3' => 'Planta 3',
                                'Planta 4' => 'Planta 4',
                                'Planta 5' => 'Planta 5',
                            ]),
                        Select::make('period')
                            ->label('Periodo')
                            ->placeholder('Personalizado')
                            ->options([
                                'today' => 'Hoy',
                                'week' => 'Esta semana',
                                'month' => 'Este mes',
                                'year' => 'Este año',
                            ])
                            ->live()
                            ->afterStateUpdated(fn ($state, $set) => match ($state) {
                                'today' => [
                                    $set('startDate', now()->startOfDay()->toDateString()),
                                    $set('endDate', now()->endOfDay()->toDateString()),
                                ],
                                'week' => [
                                    $set('startDate', now()->startOfWeek()->toDateString()),
                                    $set('endDate', now()->endOfWeek()->toDateString()),
                                ],
                                'month' => [
                                    $set('startDate', now()->startOfMonth()->toDateString()),
                                    $set('endDate', now()->endOfMonth()->toDateString()),
                                ],
                                'year' => [
                                    $set('startDate', now()->startOfYear()->toDateString()),
                                    $set('endDate', now()->endOfYear()->toDateString()),
                                ],
                                default => null,
                            }),
                        \Filament\Forms\Components\DatePicker::make('startDate')
                            ->label('Desde'),
                        \Filament\Forms\Components\DatePicker::make('endDate')
                            ->label('Hasta'),
                    ])
                    ->columns(4),
            ]);
    }

    public function getWidgets(): array
    {
        return collect(\Filament\Facades\Filament::getWidgets())
            ->reject(fn ($widget) => in_array($widget, [
                \App\Filament\Widgets\WelcomeWidget::class,
                \App\Filament\Widgets\SecurityOverview::class,
                \App\Filament\Widgets\AccessTrendsChart::class,
                \App\Filament\Widgets\VisitorTypeChart::class,
                \App\Filament\Widgets\AccessByTypeChart::class,
                \App\Filament\Widgets\RecentSecurityActivity::class,
                \App\Filament\Widgets\GoToDashboardWidget::class,
            ]))
            ->values()
            ->toArray();
    }
}
