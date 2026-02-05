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
                Forms\Components\Textarea::make('notes')
                    ->label('Notas y Duración')
                    ->columnSpanFull()
                    ->disabled(), // TOTALMENTE INEDITABLE
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
                Tables\Columns\TextColumn::make('notes')
                    ->label('Hallazgos')
                    ->limit(30)
                    ->searchable(),
                Tables\Columns\TextColumn::make('date_only')
                    ->label('Fecha')
                    ->getStateUsing(fn($record) => $record->happened_at->format('d/m/Y'))
                    ->sortable(),
            ])
            ->defaultSort('happened_at', 'desc')
            ->filters([
                //
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
