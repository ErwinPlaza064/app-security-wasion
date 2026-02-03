<?php

namespace App\Filament\Resources;

use App\Filament\Resources\IncidentResource\Pages;
use App\Models\Incident;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class IncidentResource extends Resource
{
    protected static ?string $model = Incident::class;
    public static function canCreate(): bool
    {
        return false;
    }
    protected static ?string $navigationIcon = 'heroicon-o-exclamation-triangle';
    protected static ?string $navigationGroup = 'Seguridad Corporativa';
    protected static ?string $modelLabel = 'Reporte de Incidencia';
    protected static ?string $pluralModelLabel = 'Reportes de Incidencias';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Métrica de Seguridad')
                    ->schema([
                        Forms\Components\Select::make('user_id')
                            ->label('Reportado por')
                            ->relationship('user', 'name')
                            ->searchable()
                            ->preload()
                            ->required(),
                        Forms\Components\Select::make('category')
                            ->label('Categoría')
                            ->options([
                                'general' => 'Incidencia General',
                                'damage' => 'Daño a Instalación',
                                'conduct' => 'Conductual',
                                'theft' => 'Robo/Extravío',
                                'safety' => 'Seguridad Industrial',
                            ])
                            ->required(),
                        Forms\Components\Select::make('status')
                            ->label('Estado')
                            ->options([
                                'open' => 'Abierto',
                                'investigating' => 'En Investigación',
                                'resolved' => 'Resuelto',
                                'closed' => 'Cerrado',
                            ])
                            ->default('open')
                            ->required(),
                    ])->columns(3),

                Forms\Components\Section::make('Hechos y Ubicación')
                    ->schema([
                        Forms\Components\DateTimePicker::make('happened_at')
                            ->label('Fecha/Hora del Suceso')
                            ->required(),
                        Forms\Components\TextInput::make('location')
                            ->label('Lugar del Evento')
                            ->placeholder('Ej. Nave 4, Pasillo B')
                            ->required(),
                        Forms\Components\TextInput::make('involved_person')
                            ->label('Persona Involucrada'),
                        Forms\Components\TextInput::make('payroll_number')
                            ->label('Número de Nómina'),
                        Forms\Components\TextInput::make('company')
                            ->label('Empresa')
                            ->default('WASION'),
                        Forms\Components\Textarea::make('description')
                            ->label('Descripción Detallada')
                            ->required()
                            ->columnSpanFull(),
                    ])->columns(2),

                Forms\Components\Section::make('Seguimiento y Evidencia')
                    ->schema([
                        Forms\Components\FileUpload::make('evidence_image')
                            ->label('Imagen de Evidencia')
                            ->image()
                            ->directory('incidents-evidence')
                            ->visibility('public')
                            ->columnSpanFull(),
                        Forms\Components\Textarea::make('resolution_notes')
                            ->label('Notas de Resolución / Cierre')
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\BadgeColumn::make('status')
                    ->label('Estado')
                    ->colors([
                        'danger' => 'open',
                        'warning' => 'investigating',
                        'success' => 'resolved',
                        'secondary' => 'closed',
                    ])
                    ->formatStateUsing(fn($state) => [
                        'open' => 'Abierto',
                        'investigating' => 'Investigando',
                        'resolved' => 'Resuelto',
                        'closed' => 'Cerrado',
                    ][$state] ?? $state),
                Tables\Columns\TextColumn::make('category')
                    ->label('Categoría')
                    ->formatStateUsing(fn($state) => [
                        'general' => 'General',
                        'damage' => 'Daño',
                        'conduct' => 'Conducta',
                        'theft' => 'Robo',
                        'safety' => 'Segur. Ind.',
                    ][$state] ?? $state),
                Tables\Columns\TextColumn::make('location')
                    ->label('Ubicación')
                    ->searchable(),
                Tables\Columns\TextColumn::make('happened_at')
                    ->label('Fecha del Suceso')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Guardia')
                    ->searchable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'open' => 'Pendientes',
                        'investigating' => 'En proceso',
                        'resolved' => 'Cerrados',
                    ]),
                Tables\Filters\SelectFilter::make('category')
                    ->options([
                        'damage' => 'Daños',
                        'conduct' => 'Conducta',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListIncidents::route('/'),
            'edit' => Pages\EditIncident::route('/{record}/edit'),
        ];
    }
}
