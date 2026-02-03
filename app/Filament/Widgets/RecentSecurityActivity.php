<?php

namespace App\Filament\Widgets;

use App\Models\AccessLog;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class RecentSecurityActivity extends BaseWidget
{
    protected static ?string $heading = 'Actividad de Accesos Reciente';

    protected int | string | array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                AccessLog::latest()->limit(5)
            )
            ->columns([
                Tables\Columns\TextColumn::make('externalPerson.full_name')
                    ->label('Nombre'),
                Tables\Columns\TextColumn::make('externalPerson.company.name')
                    ->label('Empresa'),
                Tables\Columns\BadgeColumn::make('type')
                    ->label('Tipo')
                    ->colors([
                        'primary' => 'visitor',
                        'success' => 'supplier',
                        'warning' => 'contractor',
                    ]),
                Tables\Columns\TextColumn::make('entry_at')
                    ->label('Entrada')
                    ->dateTime('H:i'),
                Tables\Columns\TextColumn::make('notes')
                    ->label('Notas')
                    ->limit(30),
            ])
            ->actions([
                Tables\Actions\Action::make('Ver Detalles')
                    ->url(fn(AccessLog $record): string => \App\Filament\Resources\AccessLogResource::getUrl('edit', ['record' => $record]))
                    ->icon('heroicon-m-eye'),
            ]);
    }
}
