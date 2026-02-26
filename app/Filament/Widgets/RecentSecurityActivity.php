<?php

namespace App\Filament\Widgets;

use App\Models\AccessLog;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class RecentSecurityActivity extends BaseWidget
{
    protected static ?int $sort = 5;

    protected static ?string $heading = 'Últimos Movimientos';

    protected int | string | array $columnSpan = [
        'md' => 2,
        'xl' => 2, // Antes era 3, lo bajamos a 2 para que quepa con el chart de tipos
    ];

    public function table(Table $table): Table
    {
        return $table
            ->query(
                AccessLog::latest()->limit(5)
            )
            ->columns([
                Tables\Columns\TextColumn::make('externalPerson.full_name')
                    ->label('Nombre')
                    ->weight('bold')
                    ->size('sm'),
                Tables\Columns\TextColumn::make('externalPerson.company.name')
                    ->label('Empresa')
                    ->color('primary')
                    ->size('xs'),
                Tables\Columns\TextColumn::make('type')
                    ->label('Tipo')
                    ->badge()
                    ->colors([
                        'info' => 'visitor',
                        'success' => 'supplier',
                        'warning' => 'contractor',
                    ])
                    ->formatStateUsing(fn($state) => [
                        'visitor' => 'Visitante',
                        'supplier' => 'Proveedor',
                        'contractor' => 'Contratista',
                    ][$state] ?? $state),
                Tables\Columns\TextColumn::make('entry_at')
                    ->label('Entrada')
                    ->dateTime('H:i')
                    ->color('gray')
                    ->size('xs'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('type')
                    ->label('Tipo')
                    ->options([
                        'visitor' => 'Visitante',
                        'supplier' => 'Proveedor',
                        'contractor' => 'Contratista',
                    ]),
            ])
            ->headerActions([
                // Esto habilita los botones de la cabecera (filtros, columnas, buscador)
            ])
            ->actions([
                Tables\Actions\ViewAction::make()
                    ->icon('heroicon-m-eye')
                    ->color('gray')
                    ->button()
                    ->size('xs'),
            ])
            ->paginated(false);
    }
}
