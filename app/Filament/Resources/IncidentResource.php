<?php

namespace App\Filament\Resources;

use App\Filament\Resources\IncidentResource\Pages;
use App\Models\Incident;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Storage;

class IncidentResource extends Resource
{
    protected static ?string $model = Incident::class;
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
                            ->disabled()
                            ->required(),
                        Forms\Components\Select::make('category')
                            ->label('Categoría')
                            ->options([
                                'general' => 'Incidencia General',
                                'damage' => 'Daño / Falla Instalación',
                                'conduct' => 'Conductual',
                                'observation' => 'Observación de Entorno',
                                'theft' => 'Robo/Extravío',
                                'safety' => 'Seguridad Industrial',
                            ])
                            ->disabled()
                            ->required(),
                        Forms\Components\Select::make('status')
                            ->label('Estado')
                            ->options([
                                'open' => 'Abierto',
                                'investigating' => 'En Investigación',
                                'resolved' => 'Resuelto',
                                'closed' => 'Cerrado',
                            ])
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
                    ])->columns(4),

                Forms\Components\Section::make('Hechos y Ubicación')
                    ->schema([
                        Forms\Components\DateTimePicker::make('happened_at')
                            ->label('Fecha/Hora del Suceso')
                            ->disabled()
                            ->required(),
                        Forms\Components\TextInput::make('location')
                            ->label('Lugar del Evento')
                            ->disabled()
                            ->required(),
                        Forms\Components\TextInput::make('involved_person')
                            ->label('Persona Involucrada')
                            ->disabled(),
                        Forms\Components\TextInput::make('payroll_number')
                            ->label('Número de Nómina')
                            ->disabled(),
                        Forms\Components\TextInput::make('company')
                            ->label('Empresa')
                            ->disabled(),
                        Forms\Components\Textarea::make('description')
                            ->label('Descripción Detallada')
                            ->disabled()
                            ->required()
                            ->columnSpanFull(),
                    ])->columns(2),

                Forms\Components\Section::make('Evidencia Fotográfica')
                    ->schema([
                        Forms\Components\Placeholder::make('evidence_image_preview')
                            ->label('Imagen de Evidencia')
                            ->content(
                                fn($record) => $record && $record->evidence_image
                                    ? new \Illuminate\Support\HtmlString('<img src="' . Storage::url($record->evidence_image) . '" class="max-h-64 rounded-xl shadow-sm border border-gray-100" />')
                                    : 'Sin evidencia fotográfica registrada.'
                            )
                            ->columnSpanFull(),
                        Forms\Components\Textarea::make('resolution_notes')
                            ->label('Notas de Resolución / Cierre')
                            ->placeholder('Ingrese aquí las notas de seguimiento o resolución...')
                            ->required(fn($get) => $get('status') === 'resolved' || $get('status') === 'closed')
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\SelectColumn::make('status')
                    ->label('Estado')
                    ->options([
                        'open' => 'Abierto',
                        'investigating' => 'Investigando',
                        'resolved' => 'Resuelto',
                        'closed' => 'Cerrado',
                    ])
                    ->selectablePlaceholder(false),
                Tables\Columns\TextColumn::make('category')
                    ->label('Categoría')
                    ->icon(fn(string $state): string => match ($state) {
                        'general' => 'heroicon-m-information-circle',
                        'damage' => 'heroicon-m-wrench-screwdriver',
                        'conduct' => 'heroicon-m-user-minus',
                        'observation' => 'heroicon-m-eye',
                        'theft' => 'heroicon-m-archive-box-x-mark',
                        'safety' => 'heroicon-m-shield-check',
                        default => 'heroicon-m-question-mark-circle',
                    })
                    ->iconColor('primary')
                    ->formatStateUsing(fn($state) => [
                        'general' => 'General',
                        'damage' => 'Daño/Falla',
                        'conduct' => 'Conducta',
                        'observation' => 'Observación',
                        'theft' => 'Robo',
                        'safety' => 'Segur. Ind.',
                    ][$state] ?? $state),
                Tables\Columns\TextColumn::make('location')
                    ->label('Ubicación')
                    ->searchable()
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('plant')
                    ->label('Planta')
                    ->badge()
                    ->color('info')
                    ->sortable(),
                Tables\Columns\TextColumn::make('happened_at')
                    ->label('Fecha del Suceso')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->color('gray'),
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Guardia')
                    ->searchable()
                    ->icon('heroicon-m-user')
                    ->iconColor('gray'),
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
                        'damage' => 'Daños/Fallas',
                        'conduct' => 'Conducta',
                        'observation' => 'Observaciones',
                        'general' => 'General',
                    ]),
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
                Tables\Actions\ViewAction::make(),
            ])
            ->bulkActions([])
            ->poll('3s');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListIncidents::route('/'),
        ];
    }
}
