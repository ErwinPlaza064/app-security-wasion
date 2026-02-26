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

    // CRUD habilitado


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
                Forms\Components\Section::make('Detalles del Vehículo 1')
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
                    ])->columns(3),
                Forms\Components\Section::make('Detalles del Vehículo 2 (Opcional)')
                    ->schema([
                        Forms\Components\TextInput::make('vehicle_brand_2')
                            ->label('Marca'),
                        Forms\Components\TextInput::make('vehicle_model_2')
                            ->label('Submarca'),
                        Forms\Components\TextInput::make('vehicle_plates_2')
                            ->label('Placas'),
                    ])->columns(3),
                Forms\Components\Section::make('Documentación y Otros')
                    ->schema([
                        Forms\Components\Select::make('validity_status')
                            ->label('Vigencia del Marbete')
                            ->options([
                                'Vigente' => 'Vigente',
                                'Expirado' => 'Expirado',
                            ])
                            ->required()
                            ->native(false)
                            ->default('Vigente'),
                        Forms\Components\Select::make('documentation_status')
                            ->label('Estatus de Documentación')
                            ->options([
                                'Completa' => 'Completa',
                                'Pendiente' => 'Pendiente',
                                'Vencida' => 'Vencida',
                                'En Revisión' => 'En Revisión',
                                'No Entregada' => 'No Entregada',
                            ])
                            ->required()
                            ->native(false),
                    ])->columns(2),
                Forms\Components\Section::make('Información Administrativa')
                    ->schema([
                        Forms\Components\Select::make('plant')
                            ->label('Planta')
                            ->options([
                                'Planta 1' => 'Planta 1',
                                'Planta 2' => 'Planta 2',
                                'Planta 3' => 'Planta 3',
                                'Planta 4' => 'Planta 4',
                                'Planta 5' => 'Planta 5',
                            ])
                            ->required()
                            ->disabled(fn() => auth()->user()->role !== 'superadmin'),
                        Forms\Components\Select::make('user_id')
                            ->label('Registrado por')
                            ->relationship('user', 'name')
                            ->disabled()
                            ->dehydrated(false)
                            ->visible(fn($record) => $record !== null),
                    ])->columns(2),
            ]);
    }

    public static function getEloquentQuery(): Builder
    {
        $query = parent::getEloquentQuery();

        if (auth()->user()->role === 'Admin') {
            return $query->where('plant', auth()->user()->plant);
        }

        return $query;
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
                    ->formatStateUsing(fn($record) => $record->vehicle_plates . ($record->vehicle_plates_2 ? ' / ' . $record->vehicle_plates_2 : ''))
                    ->searchable(['vehicle_plates', 'vehicle_plates_2']),
                Tables\Columns\TextColumn::make('validity_status')
                    ->label('Vigencia')
                    ->badge()
                    ->colors([
                        'success' => 'Vigente',
                        'danger' => 'Expirado',
                    ]),
                Tables\Columns\TextColumn::make('documentation_status')
                    ->label('Estatus')
                    ->badge()
                    ->colors([
                        'success' => 'Completa',
                        'warning' => 'Pendiente',
                        'danger' => 'Vencida',
                        'info' => 'En Revisión',
                        'rose' => 'No Entregada',
                    ]),
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
                Tables\Filters\SelectFilter::make('plant')
                    ->label('Filtrar por Planta')
                    ->options([
                        'Planta 1' => 'Planta 1',
                        'Planta 2' => 'Planta 2',
                        'Planta 3' => 'Planta 3',
                        'Planta 4' => 'Planta 4',
                        'Planta 5' => 'Planta 5',
                    ])
                    ->visible(fn() => auth()->user()->role === 'superadmin'),
                Tables\Filters\SelectFilter::make('validity_status')
                    ->label('Vigencia')
                    ->options([
                        'Vigente' => 'Vigente',
                        'Expirado' => 'Expirado',
                    ]),
                Tables\Filters\SelectFilter::make('documentation_status')
                    ->label('Estatus de Papeles')
                    ->options([
                        'Completa' => 'Completa',
                        'Pendiente' => 'Pendiente',
                        'Vencida' => 'Vencida',
                        'En Revisión' => 'En Revisión',
                        'No Entregada' => 'No Entregada',
                    ]),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
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
            'create' => Pages\CreateEmployeeVehicle::route('/create'),
            'edit' => Pages\EditEmployeeVehicle::route('/{record}/edit'),
        ];
    }
}
