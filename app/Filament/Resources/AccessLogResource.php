<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AccessLogResource\Pages;
use App\Models\AccessLog;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class AccessLogResource extends Resource
{
    protected static ?string $model = AccessLog::class;
    public static function canCreate(): bool
    {
        return false;
    }
    protected static ?string $navigationIcon = 'heroicon-o-identification';
    protected static ?string $navigationGroup = 'Control de Accesos';
    protected static ?string $modelLabel = 'Registro de Acceso';
    protected static ?string $pluralModelLabel = 'Registros de Acceso';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Información del Visitante')
                    ->schema([
                        Forms\Components\Select::make('external_person_id')
                            ->label('Persona Externa')
                            ->relationship('externalPerson', 'full_name')
                            ->searchable()
                            ->preload()
                            ->required(),
                        Forms\Components\Select::make('type')
                            ->label('Tipo de Acceso')
                            ->options([
                                'visitor' => 'Visitante',
                                'supplier' => 'Proveedor',
                                'contractor' => 'Contratista',
                                'laptop_only' => 'Solo Laptop',
                                'employee_laptop' => 'Laptop Colaborador',
                            ])
                            ->required(),
                        Forms\Components\DateTimePicker::make('entry_at')
                            ->label('Fecha/Hora Entrada')
                            ->required(),
                        Forms\Components\DateTimePicker::make('exit_at')
                            ->label('Fecha/Hora Salida'),
                        Forms\Components\TextInput::make('visiting_person')
                            ->label('Persona que Visita')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('work_area')
                            ->label('Área de Trabajo')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('visit_reason')
                            ->label('Motivo de la Visita')
                            ->columnSpanFull()
                            ->maxLength(255),
                    ])->columns(2),

                Forms\Components\Section::make('Detalles del Equipo')
                    ->schema([
                        Forms\Components\TextInput::make('item_brand')
                            ->label('Marca')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('item_color')
                            ->label('Color'),
                        Forms\Components\TextInput::make('item_serial')
                            ->label('Nº Serial'),
                    ])->columns(3),

                Forms\Components\Section::make('Control Vehicular')
                    ->schema([
                        Forms\Components\TextInput::make('vehicle_brand')
                            ->label('Marca del Vehículo')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('vehicle_plate')
                            ->label('Placas')
                            ->maxLength(255),
                    ])->columns(2),

                Forms\Components\Section::make('Validación')
                    ->schema([
                        Forms\Components\Textarea::make('notes')
                            ->label('Observaciones')
                            ->columnSpanFull(),
                        Forms\Components\ViewField::make('signature')
                            ->label('Firma')
                            ->view('filament.forms.components.signature-preview'),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('externalPerson.full_name')
                    ->label('Nombre Completo')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('type')
                    ->label('Tipo')
                    ->badge()
                    ->colors([
                        'info' => 'visitor',
                        'success' => 'supplier',
                        'warning' => 'contractor',
                        'gray' => ['laptop_only', 'employee_laptop'],
                    ])
                    ->icon(fn(string $state): string => match ($state) {
                        'visitor' => 'heroicon-m-user',
                        'supplier' => 'heroicon-m-truck',
                        'contractor' => 'heroicon-m-wrench-screwdriver',
                        'laptop_only' => 'heroicon-m-laptop',
                        'employee_laptop' => 'heroicon-m-laptop',
                        default => 'heroicon-m-question-mark-circle',
                    })
                    ->formatStateUsing(fn($state) => [
                        'visitor' => 'Visitante',
                        'supplier' => 'Proveedor',
                        'contractor' => 'Contratista',
                        'laptop_only' => 'Solo Laptop',
                        'employee_laptop' => 'Laptop Colab.',
                    ][$state] ?? $state),
                Tables\Columns\TextColumn::make('externalPerson.company.name')
                    ->label('Empresa')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('plant')
                    ->label('Planta')
                    ->badge()
                    ->color('info')
                    ->sortable(),
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Registró')
                    ->searchable()
                    ->icon('heroicon-m-user')
                    ->iconColor('gray')
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('visiting_person')
                    ->label('A quién visita')
                    ->searchable()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('work_area')
                    ->label('Área')
                    ->searchable()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('entry_at')
                    ->label('Entrada')
                    ->dateTime('d/m/y H:i')
                    ->sortable(),
                Tables\Columns\TextColumn::make('exit_at')
                    ->label('Salida')
                    ->dateTime('d/m/y H:i')
                    ->sortable()
                    ->placeholder('Pendiente...'),
            ])
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
                Tables\Filters\SelectFilter::make('type')
                    ->options([
                        'visitor' => 'Visitantes',
                        'supplier' => 'Proveedores',
                        'contractor' => 'Contratistas',
                        'laptop_only' => 'Laptops',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->poll('5s');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAccessLogs::route('/'),
            'edit' => Pages\EditAccessLog::route('/{record}/edit'),
        ];
    }
}
