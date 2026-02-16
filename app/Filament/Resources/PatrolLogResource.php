<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PatrolLogResource\Pages;
use App\Models\PatrolLog;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class PatrolLogResource extends Resource
{
    protected static ?string $model = PatrolLog::class;

    protected static ?string $navigationIcon = 'heroicon-o-map';

    protected static ?string $navigationGroup = 'Operaciones';

    protected static ?string $navigationLabel = 'Rondines de Planta';

    protected static ?string $modelLabel = 'Rondín';

    protected static ?string $pluralModelLabel = 'Rondines';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                    ->relationship('user', 'name')
                    ->label('Operador')
                    ->disabled(), // Inmovilizado
                Forms\Components\TextInput::make('area_name')
                    ->label('Área/Tipo')
                    ->disabled(), // Inmovilizado
                Forms\Components\Select::make('status')
                    ->label('Estado')
                    ->options([
                        'ok' => 'Normal (OK)',
                        'incident' => 'Incidencia',
                    ])
                    ->disabled(), // Inmovilizado
                Forms\Components\DateTimePicker::make('started_at')
                    ->label('Hora de Inicio')
                    ->disabled(), // Inmovilizado
                Forms\Components\DateTimePicker::make('happened_at')
                    ->label('Hora de Finalización')
                    ->disabled(), // Inmovilizado
                Forms\Components\TextInput::make('duration')
                    ->label('Duración del Recorrido')
                    ->afterStateHydrated(fn($component, $record) => $component->state($record?->duration))
                    ->prefixIcon('heroicon-m-clock')
                    ->disabled(),
                Forms\Components\Textarea::make('notes')
                    ->label('Notas o Hallazgos')
                    ->afterStateHydrated(function ($component, $state) {
                        if (!$state) return;
                        // Filtramos el texto antiguo de duración para que no aparezca en las notas
                        $clean = preg_replace('/Duración del recorrido:.*?\n*/i', '', $state);
                        $component->state(trim($clean) ?: 'Sin hallazgos registrados');
                    })
                    ->columnSpanFull()
                    ->disabled(),
                Forms\Components\Select::make('plant')
                    ->label('Planta')
                    ->options([
                        'Planta 1' => 'Planta 1',
                        'Planta 2' => 'Planta 2',
                        'Planta 3' => 'Planta 3',
                        'Planta 4' => 'Planta 4',
                        'Planta 5' => 'Planta 5',
                    ])
                    ->disabled(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Operador')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('status')
                    ->label('Estado')
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'ok' => 'success',
                        'incident' => 'danger',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn(string $state): string => match ($state) {
                        'ok' => 'NORMAL',
                        'incident' => 'INCIDENCIA',
                        default => $state,
                    }),
                Tables\Columns\TextColumn::make('started_at')
                    ->label('Inicio')
                    ->dateTime('H:i:s')
                    ->sortable(),
                Tables\Columns\TextColumn::make('happened_at')
                    ->label('Fin')
                    ->dateTime('H:i:s')
                    ->sortable(),
                Tables\Columns\TextColumn::make('duration')
                    ->label('Duración')
                    ->badge()
                    ->color('info'),
                Tables\Columns\TextColumn::make('notes')
                    ->label('Hallazgos')
                    ->formatStateUsing(function ($state) {
                        if (!$state) return 'Sin hallazgos';
                        $clean = preg_replace('/Duración del recorrido:.*?\n*/i', '', $state);
                        return trim($clean) ?: 'Sin hallazgos';
                    })
                    ->limit(30)
                    ->searchable(),
                Tables\Columns\TextColumn::make('date_only')
                    ->label('Fecha')
                    ->getStateUsing(fn($record) => $record->happened_at ? $record->happened_at->format('d/m/Y') : 'N/A')
                    ->sortable(),
                Tables\Columns\TextColumn::make('plant')
                    ->label('Planta')
                    ->badge()
                    ->color('info')
                    ->sortable(),
            ])
            ->defaultSort('happened_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('plant')
                    ->label('Planta')
                    ->options([
                        'Planta 1' => 'Planta 1',
                        'Planta 2' => 'Planta 2',
                        'Planta 3' => 'Planta 3',
                        'Planta 4' => 'Planta 4',
                        'Planta 5' => 'Planta 5',
                    ]),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(), // Solo Ver, no Editar
            ])
            ->bulkActions([
                // Quitamos acciones masivas si quieres máxima seguridad, pero dejamos Delete si es necesario
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManagePatrolLogs::route('/'),
        ];
    }
}
