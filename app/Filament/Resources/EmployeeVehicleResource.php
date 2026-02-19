<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EmployeeVehicleResource\Pages;
use App\Filament\Resources\EmployeeVehicleResource\RelationManagers;
use App\Models\EmployeeVehicle;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class EmployeeVehicleResource extends Resource
{
    protected static ?string $model = EmployeeVehicle::class;
    protected static ?string $navigationIcon = 'heroicon-o-truck';
    protected static ?string $navigationGroup = 'Gestión Vehicular';
    protected static ?string $modelLabel = 'Padrón Vehicular';
    protected static ?string $pluralModelLabel = 'Padrón Vehicular';

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
                Forms\Components\Section::make('Datos del Colaborador')
                    ->schema([
                        Forms\Components\TextInput::make('marbete_number')
                            ->label('No. Marbete')
                            ->required()
                            ->unique(ignoreRecord: true),
                        Forms\Components\TextInput::make('employee_name')
                            ->label('Nombre del Colaborador')
                            ->required(),
                        Forms\Components\TextInput::make('area')
                            ->label('Área')
                            ->required(),
                    ])->columns(3),
                Forms\Components\Section::make('Detalles del Vehículo')
                    ->schema([
                        Forms\Components\TextInput::make('vehicle_brand')
                            ->label('Marca')
                            ->required(),
                        Forms\Components\TextInput::make('vehicle_model')
                            ->label('Submarca')
                            ->required(),
                        Forms\Components\TextInput::make('vehicle_plates')
                            ->label('Placas')
                            ->required(),
                        Forms\Components\Textarea::make('documentation_status')
                            ->label('Estatus de Documentación')
                            ->columnSpanFull(),
                    ])->columns(3),
                Forms\Components\Section::make('Información Administrativa')
                    ->schema([
                        Forms\Components\TextInput::make('plant')
                            ->label('Planta'),
                        Forms\Components\Select::make('user_id')
                            ->label('Registrado por')
                            ->relationship('user', 'name')
                            ->disabled()
                            ->dehydrated(false)
                            ->placeholder('Se asigna automáticamente'),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('marbete_number')
                    ->label('No. Marbete')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('employee_name')
                    ->label('Colaborador')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('area')
                    ->label('Área')
                    ->searchable(),
                Tables\Columns\TextColumn::make('vehicle_plates')
                    ->label('Placas')
                    ->searchable(),
                Tables\Columns\TextColumn::make('plant')
                    ->label('Planta')
                    ->badge()
                    ->color('primary'),
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Registró')
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
            ])
            ->bulkActions([
                // Sin acciones masivas para reportes
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListEmployeeVehicles::route('/'),
            'view' => Pages\ViewEmployeeVehicle::route('/{record}'),
        ];
    }
}
