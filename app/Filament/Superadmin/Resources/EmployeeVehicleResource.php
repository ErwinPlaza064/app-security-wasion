<?php

namespace App\Filament\Superadmin\Resources;

use App\Models\EmployeeVehicle;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use App\Filament\Superadmin\Resources\EmployeeVehicleResource\Pages;

class EmployeeVehicleResource extends Resource
{
    protected static ?string $model = EmployeeVehicle::class;
    protected static ?string $navigationIcon = 'heroicon-o-truck';
    protected static ?string $navigationGroup = 'Control Maestro';
    protected static ?string $modelLabel = 'Padrón Vehicular';
    protected static ?string $pluralModelLabel = 'Padrón Vehicular';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Card::make()
                    ->schema([
                        Forms\Components\TextInput::make('marbete_number')
                            ->label('No. Marbete')
                            ->required(),
                        Forms\Components\TextInput::make('employee_name')
                            ->label('Nombre del Colaborador')
                            ->required(),
                        Forms\Components\TextInput::make('area')
                            ->label('Área')
                            ->required(),
                        Forms\Components\TextInput::make('vehicle_brand')
                            ->label('Marca')
                            ->required(),
                        Forms\Components\TextInput::make('vehicle_model')
                            ->label('Submarca')
                            ->required(),
                        Forms\Components\TextInput::make('vehicle_plates')
                            ->label('Placas')
                            ->required(),
                        Forms\Components\Select::make('plant')
                            ->label('Planta')
                            ->options([
                                'Planta 1' => 'Planta 1',
                                'Planta 2' => 'Planta 2',
                                'Planta 3' => 'Planta 3',
                                'Planta 4' => 'Planta 4',
                                'Planta 5' => 'Planta 5',
                            ])
                            ->required(),
                    ])->columns(2)
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
                Tables\Columns\TextColumn::make('vehicle_plates')
                    ->label('Placas')
                    ->searchable(),
                Tables\Columns\TextColumn::make('plant')
                    ->label('Planta')
                    ->badge()
                    ->color('info')
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Registro')
                    ->dateTime('d/m/Y')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('plant')
                    ->label('Filtrar por Planta')
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
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => \App\Filament\Superadmin\Resources\EmployeeVehicleResource\Pages\ListEmployeeVehicles::route('/'),
        ];
    }
}
