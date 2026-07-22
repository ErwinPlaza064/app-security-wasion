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

    // Solo el Admin no puede crear (los guardias crean desde su panel)
    public static function canCreate(): bool
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
                            ->label('Estatus de Documentación')
                            ->options([
                                'Vigente' => 'Vigente',
                                'Expirado' => 'Expirado',
                                'Pendiente' => 'Pendiente',
                            ])
                            ->required()
                            ->native(false)
                            ->default('Vigente')
                            ->live()
                            ->afterStateHydrated(function (\Filament\Forms\Components\Select $component, ?\Illuminate\Database\Eloquent\Model $record, \Filament\Forms\Set $set) {
                                if ($record) {
                                    if (empty($record->driver_license_expires_at) && empty($record->insurance_expires_at)) {
                                        $set('validity_status', 'Pendiente');
                                    } else {
                                        $isLicenseExpired = $record->driver_license_expires_at && \Illuminate\Support\Carbon::parse($record->driver_license_expires_at)->startOfDay()->isBefore(now()->startOfDay());
                                        $isInsuranceExpired = $record->insurance_expires_at && \Illuminate\Support\Carbon::parse($record->insurance_expires_at)->startOfDay()->isBefore(now()->startOfDay());
                                        if ($isLicenseExpired || $isInsuranceExpired) {
                                            $set('validity_status', 'Expirado');
                                        } else {
                                            $set('validity_status', 'Vigente');
                                        }
                                    }
                                }
                            })
                            ->columnSpanFull(),
                        Forms\Components\Fieldset::make('Licencia de Conducir')
                            ->schema([
                                Forms\Components\Toggle::make('has_driver_license')
                                    ->label('Cuenta con Licencia')
                                    ->default(false)
                                    ->live()
                                    ->afterStateUpdated(function (\Filament\Forms\Get $get, \Filament\Forms\Set $set, $state) {
                                        if (!$state) {
                                            $set('driver_license_expires_at', null);
                                            if (empty($get('insurance_expires_at'))) {
                                                $set('validity_status', 'Pendiente');
                                            }
                                        }
                                    }),
                                Forms\Components\DatePicker::make('driver_license_expires_at')
                                    ->label('Vencimiento de Licencia')
                                    ->displayFormat('d/m/Y')
                                    ->visible(fn (\Filament\Forms\Get $get) => $get('has_driver_license'))
                                    ->live()
                                    ->afterStateUpdated(function (\Filament\Forms\Get $get, \Filament\Forms\Set $set, $state) {
                                        $insuranceDate = $get('insurance_expires_at');
                                        if (empty($state) && empty($insuranceDate)) {
                                            $set('validity_status', 'Pendiente');
                                        } elseif ($state && \Illuminate\Support\Carbon::parse($state)->isBefore(now()->startOfDay())) {
                                            $set('validity_status', 'Expirado');
                                        } elseif ($state && !\Illuminate\Support\Carbon::parse($state)->isBefore(now()->startOfDay()) && in_array($get('validity_status'), ['Expirado', 'Pendiente'])) {
                                            if (!$insuranceDate || !\Illuminate\Support\Carbon::parse($insuranceDate)->isBefore(now()->startOfDay())) {
                                                $set('validity_status', 'Vigente');
                                            }
                                        }
                                    }),
                            ])->columns(2),
                        Forms\Components\Fieldset::make('Tarjeta de Circulación')
                            ->schema([
                                Forms\Components\Toggle::make('has_circulation_card')
                                    ->label('Cuenta con Tarjeta de Circulación')
                                    ->default(false),
                            ])->columns(1),
                        Forms\Components\Fieldset::make('Seguro del Vehículo')
                            ->schema([
                                Forms\Components\Toggle::make('has_insurance')
                                    ->label('Cuenta con Póliza de Seguro')
                                    ->default(false)
                                    ->live()
                                    ->afterStateUpdated(function (\Filament\Forms\Get $get, \Filament\Forms\Set $set, $state) {
                                        if (!$state) {
                                            $set('insurance_expires_at', null);
                                            if (empty($get('driver_license_expires_at'))) {
                                                $set('validity_status', 'Pendiente');
                                            }
                                        }
                                    }),
                                Forms\Components\DatePicker::make('insurance_expires_at')
                                    ->label('Vencimiento de Póliza')
                                    ->displayFormat('d/m/Y')
                                    ->visible(fn (\Filament\Forms\Get $get) => $get('has_insurance'))
                                    ->live()
                                    ->afterStateUpdated(function (\Filament\Forms\Get $get, \Filament\Forms\Set $set, $state) {
                                        $licenseDate = $get('driver_license_expires_at');
                                        if (empty($state) && empty($licenseDate)) {
                                            $set('validity_status', 'Pendiente');
                                        } elseif ($state && \Illuminate\Support\Carbon::parse($state)->isBefore(now()->startOfDay())) {
                                            $set('validity_status', 'Expirado');
                                        } elseif ($state && !\Illuminate\Support\Carbon::parse($state)->isBefore(now()->startOfDay()) && in_array($get('validity_status'), ['Expirado', 'Pendiente'])) {
                                            if (!$licenseDate || !\Illuminate\Support\Carbon::parse($licenseDate)->isBefore(now()->startOfDay())) {
                                                $set('validity_status', 'Vigente');
                                            }
                                        }
                                    }),
                            ])->columns(2),
                        Forms\Components\Hidden::make('documentation_status')
                            ->default('Completa'),
                    ])->columns(1),
                Forms\Components\Section::make('Información Administrativa')
                    ->schema([
                        Forms\Components\Select::make('plant')
                            ->label('Planta Base')
                            ->options([
                                'Planta 1' => 'Planta 1',
                                'Planta 2' => 'Planta 2',
                                'Planta 3' => 'Planta 3',
                                'Planta 4' => 'Planta 4',
                                'Planta 5' => 'Planta 5',
                            ])
                            ->required(),
                        Forms\Components\Select::make('user_id')
                            ->label('Registrado por')
                            ->relationship('user', 'name')
                            ->disabled()
                            ->dehydrated(false)
                            ->visible(fn($record) => $record !== null),
                    ])->columns(2),

                Forms\Components\Section::make('Acceso Multi-Planta')
                    ->description('Habilita si este colaborador ingresa a más de una planta. Selecciona las plantas adicionales autorizadas.')
                    ->icon('heroicon-o-map-pin')
                    ->schema([
                        Forms\Components\Toggle::make('is_multi_plant')
                            ->label('Autorizar acceso a otras plantas')
                            ->helperText('Al activar esta opción, el vehículo aparecerá en el padrón de las plantas seleccionadas.')
                            ->default(false)
                            ->live()
                            ->columnSpanFull(),
                        Forms\Components\CheckboxList::make('additional_plants')
                            ->label('Plantas adicionales autorizadas')
                            ->options([
                                'Planta 1' => 'Planta 1',
                                'Planta 2' => 'Planta 2',
                                'Planta 3' => 'Planta 3',
                                'Planta 4' => 'Planta 4',
                                'Planta 5' => 'Planta 5',
                            ])
                            ->descriptions([
                                'Planta 1' => 'Autorizar visibilidad en Planta 1',
                                'Planta 2' => 'Autorizar visibilidad en Planta 2',
                                'Planta 3' => 'Autorizar visibilidad en Planta 3',
                                'Planta 4' => 'Autorizar visibilidad en Planta 4',
                                'Planta 5' => 'Autorizar visibilidad en Planta 5',
                            ])
                            ->visible(fn (Forms\Get $get): bool => (bool) $get('is_multi_plant'))
                            ->columns(3)
                            ->columnSpanFull(),
                    ])->columns(1),
            ]);
    }

    public static function getEloquentQuery(): Builder
    {
        $query = parent::getEloquentQuery();
        /** @var \App\Models\User|null $user */
        $user = \Illuminate\Support\Facades\Auth::user();

        // SuperAdmin y Admin ven todos los registros en el panel de administración
        // El filtro de planta se puede aplicar manualmente desde los filtros de la tabla
        if ($user && !($user->isSuperAdmin() || $user->isAdmin())) {
            $query->where('plant', $user->plant ?? '');
        }

        $today = now()->toDateString();
        $thirtyDaysFromNow = now()->addDays(30)->toDateString();

        return $query->orderByRaw("
            CASE 
                WHEN (driver_license_expires_at IS NOT NULL AND driver_license_expires_at <= ?) 
                     OR (insurance_expires_at IS NOT NULL AND insurance_expires_at <= ?) THEN 0
                WHEN (driver_license_expires_at IS NOT NULL AND driver_license_expires_at <= ?) 
                     OR (insurance_expires_at IS NOT NULL AND insurance_expires_at <= ?) THEN 1
                ELSE 2
            END ASC
        ", [$today, $today, $thirtyDaysFromNow, $thirtyDaysFromNow])
        ->orderBy('driver_license_expires_at', 'asc');
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
                    ->label('Estatus')
                    ->badge()
                    ->formatStateUsing(function ($record) {
                        if (empty($record->driver_license_expires_at) && empty($record->insurance_expires_at)) {
                            return 'Pendiente';
                        }

                        $isLicenseExpired = $record->driver_license_expires_at && $record->driver_license_expires_at->startOfDay()->isBefore(now()->startOfDay());
                        $isInsuranceExpired = $record->insurance_expires_at && $record->insurance_expires_at->startOfDay()->isBefore(now()->startOfDay());
                        
                        return ($isLicenseExpired || $isInsuranceExpired) ? 'Expirado' : $record->validity_status;
                    })
                    ->color(function ($record) {
                        if (empty($record->driver_license_expires_at) && empty($record->insurance_expires_at)) {
                            return 'warning';
                        }

                        $isLicenseExpired = $record->driver_license_expires_at && $record->driver_license_expires_at->startOfDay()->isBefore(now()->startOfDay());
                        $isInsuranceExpired = $record->insurance_expires_at && $record->insurance_expires_at->startOfDay()->isBefore(now()->startOfDay());
                        
                        $computedStatus = ($isLicenseExpired || $isInsuranceExpired) ? 'Expirado' : $record->validity_status;

                        return match ($computedStatus) {
                            'Expirado' => 'danger',
                            'Pendiente' => 'warning',
                            'Vigente' => 'success',
                            default => 'gray',
                        };
                    }),
                Tables\Columns\TextColumn::make('driver_license_expires_at')
                    ->label('Venc. Licencia')
                    ->date('d/m/Y')
                    ->sortable()
                    ->color(fn ($record): string => match (true) {
                        !$record->driver_license_expires_at => 'gray',
                        $record->driver_license_expires_at <= now() => 'danger',
                        $record->driver_license_expires_at <= now()->addDays(30) => 'warning',
                        default => 'success',
                    })
                    ->toggleable(),
                Tables\Columns\TextColumn::make('insurance_expires_at')
                    ->label('Venc. Seguro')
                    ->date('d/m/Y')
                    ->sortable()
                    ->color(fn ($record): string => match (true) {
                        !$record->insurance_expires_at => 'gray',
                        $record->insurance_expires_at <= now() => 'danger',
                        $record->insurance_expires_at <= now()->addDays(30) => 'warning',
                        default => 'success',
                    })
                    ->toggleable(),
                Tables\Columns\TextColumn::make('plant')
                    ->label('Planta Base')
                    ->badge()
                    ->color('primary'),
                Tables\Columns\IconColumn::make('is_multi_plant')
                    ->label('Multi-Planta')
                    ->boolean()
                    ->trueIcon('heroicon-o-map-pin')
                    ->falseIcon('heroicon-o-minus')
                    ->trueColor('warning')
                    ->falseColor('gray')
                    ->tooltip(fn ($record) => $record->is_multi_plant
                        ? 'Plantas adicionales: ' . implode(', ', $record->additional_plants ?? [])
                        : 'Solo planta base'),
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
                    ->visible(function () {
                        /** @var \App\Models\User|null $user */
                        $user = \Illuminate\Support\Facades\Auth::user();
                        return $user && ($user->isSuperAdmin() || $user->isAdmin());
                    }),
                Tables\Filters\SelectFilter::make('validity_status')
                    ->label('Estatus')
                    ->options([
                        'Vigente' => 'Vigente',
                        'Expirado' => 'Expirado',
                        'Pendiente' => 'Pendiente',
                    ]),
                Tables\Filters\Filter::make('alerta_vencimiento')
                    ->label('Solo Vencidos o Próximos')
                    ->toggle()
                    ->query(fn (Builder $query) => $query->where(function ($q) {
                        $today = now()->toDateString();
                        $limit = now()->addDays(30)->toDateString();
                        $q->where(fn ($sub) => $sub->whereNotNull('driver_license_expires_at')->where('driver_license_expires_at', '<=', $limit))
                          ->orWhere(fn ($sub) => $sub->whereNotNull('insurance_expires_at')->where('insurance_expires_at', '<=', $limit));
                    })),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->recordClasses(fn (EmployeeVehicle $record): ?string => match (true) {
                ($record->driver_license_expires_at && $record->driver_license_expires_at <= now()->addDays(30)) ||
                ($record->insurance_expires_at && $record->insurance_expires_at <= now()->addDays(30)) => 'bg-rose-50/50',
                default => null,
            })
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
            'edit' => Pages\EditEmployeeVehicle::route('/{record}/edit'),
        ];
    }
}
