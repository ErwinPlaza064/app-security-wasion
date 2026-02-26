<?php

namespace App\Filament\Resources;

use App\Filament\Resources\VehicleIncidentResource\Pages;
use App\Models\VehicleIncident;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class VehicleIncidentResource extends Resource
{
    protected static ?string $model = VehicleIncident::class;

    protected static ?string $navigationIcon = 'heroicon-o-exclamation-triangle';

    protected static ?string $navigationGroup = 'Control Vehicular';

    protected static ?string $modelLabel = 'Incidencia Vehicular';
    protected static ?string $pluralModelLabel = 'Incidencias Vehiculares';

    public static function canCreate(): bool
    {
        return false;
    }

    public static function canEdit($record): bool
    {
        return false;
    }

    public static function canDelete($record): bool
    {
        return false;
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Detalles de la Incidencia')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->label('Título / Vehículo')
                            ->placeholder('Ej: Carro Ford Con placas GAY-123')
                            ->required()
                            ->disabled(fn(string $context): bool => $context === 'edit')
                            ->dehydrated()
                            ->maxLength(255),
                        Forms\Components\DateTimePicker::make('happened_at')
                            ->label('Fecha y Hora')
                            ->required()
                            ->disabled(fn(string $context): bool => $context === 'edit')
                            ->dehydrated()
                            ->default(now()),
                        Forms\Components\Textarea::make('description')
                            ->label('Descripción')
                            ->required()
                            ->disabled(fn(string $context): bool => $context === 'edit')
                            ->dehydrated()
                            ->columnSpanFull(),
                    ])->columns(2),
                Forms\Components\Section::make('Metadatos')
                    ->schema([
                        Forms\Components\Select::make('user_id')
                            ->relationship('user', 'name')
                            ->label('Reportado por')
                            ->required()
                            ->disabled()
                            ->dehydrated()
                            ->default(Auth::id()),
                        Forms\Components\TextInput::make('plant')
                            ->label('Planta')
                            ->required()
                            ->disabled()
                            ->dehydrated()
                            ->default(fn() => Auth::user()->plant),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->label('Título / Vehículo')
                    ->searchable()
                    ->sortable()
                    ->icon('heroicon-m-exclamation-circle')
                    ->iconColor('danger')
                    ->weight('bold')
                    ->wrap(),
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Reportado por')
                    ->icon('heroicon-m-user')
                    ->iconColor('gray')
                    ->sortable(),
                Tables\Columns\TextColumn::make('plant')
                    ->label('Planta')
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'Planta 1' => 'info',
                        'Planta 2' => 'success',
                        'Planta 3' => 'warning',
                        'Planta 4' => 'danger',
                        'Planta 5' => 'primary',
                        default => 'gray',
                    })
                    ->sortable(),
                Tables\Columns\TextColumn::make('happened_at')
                    ->label('Fecha y Hora')
                    ->dateTime('d/m/Y H:i')
                    ->color('gray')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('plant')
                    ->options([
                        'Planta 1' => 'Planta 1',
                        'Planta 2' => 'Planta 2',
                        'Planta 3' => 'Planta 3',
                        'Planta 4' => 'Planta 4',
                        'Planta 5' => 'Planta 5',
                    ]),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
            ])
            ->bulkActions([])
            ->poll('3s');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListVehicleIncidents::route('/'),
        ];
    }
}
