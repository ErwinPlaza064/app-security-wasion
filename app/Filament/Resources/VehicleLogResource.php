<?php

namespace App\Filament\Resources;

use App\Filament\Resources\VehicleLogResource\Pages;
use App\Models\VehicleLog;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class VehicleLogResource extends Resource
{
    protected static ?string $model = VehicleLog::class;
    public static function canCreate(): bool
    {
        return false;
    }
    protected static ?string $navigationIcon = 'heroicon-o-truck';
    protected static ?string $navigationGroup = 'Control de Accesos';
    protected static ?string $modelLabel = 'Bitácora Vehicular';
    protected static ?string $pluralModelLabel = 'Bitácoras Vehiculares';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Identificación del Vehículo')
                    ->schema([
                        Forms\Components\TextInput::make('plates')
                            ->label('Placas')
                            ->required()
                            ->maxLength(20)
                            ->extraInputAttributes(['style' => 'text-transform: uppercase; font-family: monospace']),
                        Forms\Components\TextInput::make('brand')
                            ->label('Marca')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('model')
                            ->label('Modelo')
                            ->maxLength(255),
                    ])->columns(3),

                Forms\Components\Section::make('Logística y Chofer')
                    ->schema([
                        Forms\Components\TextInput::make('driver_name')
                            ->label('Nombre del Chofer')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\Select::make('company_id')
                            ->label('Empresa')
                            ->relationship('company', 'name')
                            ->searchable()
                            ->preload(),
                        Forms\Components\Select::make('operation')
                            ->label('Operación')
                            ->options([
                                'load' => 'Carga',
                                'unload' => 'Descarga',
                                'transport' => 'Transporte',
                                'visit' => 'Visita',
                            ])
                            ->required(),
                    ])->columns(3),

                Forms\Components\Section::make('Tiempos y Notas')
                    ->schema([
                        Forms\Components\DateTimePicker::make('entry_at')
                            ->label('Fecha/Hora Entrada')
                            ->required(),
                        Forms\Components\DateTimePicker::make('exit_at')
                            ->label('Fecha/Hora Salida'),
                        Forms\Components\Textarea::make('notes')
                            ->label('Notas de Bitácora')
                            ->columnSpanFull(),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('plates')
                    ->label('Placas')
                    ->searchable()
                    ->sortable()
                    ->fontFamily('mono'),
                Tables\Columns\TextColumn::make('driver_name')
                    ->label('Chofer')
                    ->searchable(),
                Tables\Columns\TextColumn::make('company.name')
                    ->label('Empresa')
                    ->searchable(),
                Tables\Columns\BadgeColumn::make('operation')
                    ->label('Operación')
                    ->colors([
                        'success' => 'load',
                        'warning' => 'unload',
                        'primary' => 'transport',
                        'info' => 'visit',
                    ])
                    ->formatStateUsing(fn($state) => [
                        'load' => 'Carga',
                        'unload' => 'Descarga',
                        'transport' => 'Transporte',
                        'visit' => 'Visita',
                    ][$state] ?? $state),
                Tables\Columns\TextColumn::make('entry_at')
                    ->label('Entrada')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
                Tables\Columns\TextColumn::make('exit_at')
                    ->label('Salida')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->placeholder('En patio'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('operation')
                    ->options([
                        'load' => 'Carga',
                        'unload' => 'Descarga',
                        'transport' => 'Transporte',
                    ]),
            ])
            ->actions([
                Tables\Actions\Action::make('registrar_salida')
                    ->label('Marcar Salida')
                    ->icon('heroicon-m-truck')
                    ->color('warning')
                    ->hidden(fn(VehicleLog $record): bool => (bool) $record->exit_at)
                    ->action(function (VehicleLog $record) {
                        $record->update([
                            'exit_at' => now(),
                        ]);
                    })
                    ->requiresConfirmation()
                    ->modalHeading('¿Marcar salida del vehículo?')
                    ->successNotificationTitle('Salida vehicular registrada'),
                Tables\Actions\EditAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListVehicleLogs::route('/'),
            'edit' => Pages\EditVehicleLog::route('/{record}/edit'),
        ];
    }
}
