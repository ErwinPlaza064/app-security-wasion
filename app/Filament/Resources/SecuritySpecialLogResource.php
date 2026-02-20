<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SecuritySpecialLogResource\Pages;
use App\Models\SecuritySpecialLog;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class SecuritySpecialLogResource extends Resource
{
    protected static ?string $model = SecuritySpecialLog::class;
    public static function canCreate(): bool
    {
        return false;
    }
    protected static ?string $navigationIcon = 'heroicon-o-document-magnifying-glass';
    protected static ?string $navigationGroup = 'Operaciones';
    protected static ?string $modelLabel = 'Pase / Baja / Especial';
    protected static ?string $pluralModelLabel = 'Pases de Salida y Renuncias';

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->where('type', '!=', 'no_badge');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Identificación de Personal')
                    ->schema([
                        Forms\Components\Select::make('user_id')
                            ->label('Registrado por')
                            ->relationship('user', 'name')
                            ->required(),
                        Forms\Components\Select::make('type')
                            ->label('Tipo de Evento')
                            ->options([
                                'resignation' => 'Renuncia',
                                'settlement' => 'Finiquito',
                                'clearance' => 'Pase de Salida',
                            ])
                            ->required(),
                        Forms\Components\DateTimePicker::make('happened_at')
                            ->label('Fecha/Hora del Registro')
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

                Forms\Components\Section::make('Datos del Colaborador')
                    ->schema([
                        Forms\Components\TextInput::make('employee_name')
                            ->label('Nombre Completo')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('employee_id')
                            ->label('Nº de Nómina / ID')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('department')
                            ->label('Departamento'),
                        Forms\Components\TextInput::make('position')
                            ->label('Puesto'),
                        Forms\Components\TextInput::make('direct_supervisor')
                            ->label('Jefe Directo')
                            ->placeholder('Nombre del supervisor responsable'),
                        Forms\Components\TextInput::make('suspension_reason')
                            ->label('Motivo de Suspensión')
                            ->columnSpanFull()
                            ->placeholder('Razón de la baja o finiquito'),
                    ])->columns(2),

                Forms\Components\Section::make('Notas Adicionales')
                    ->schema([
                        Forms\Components\Textarea::make('notes')
                            ->label('Observaciones Administrativas')
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\BadgeColumn::make('type')
                    ->label('Evento')
                    ->colors([
                        'danger' => 'resignation',
                        'warning' => 'settlement',
                        'success' => 'clearance',
                    ])
                    ->formatStateUsing(fn($state) => [
                        'resignation' => 'Renuncia',
                        'settlement' => 'Finiquito',
                        'clearance' => 'Pase de Salida',
                    ][$state] ?? $state),
                Tables\Columns\TextColumn::make('employee_name')
                    ->label('Colaborador')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('employee_id')
                    ->label('ID / Nómina')
                    ->searchable(),
                Tables\Columns\TextColumn::make('department')
                    ->label('Depto.')
                    ->searchable(),
                Tables\Columns\TextColumn::make('position')
                    ->label('Puesto')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('direct_supervisor')
                    ->label('Jefe Directo')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('plant')
                    ->label('Planta')
                    ->badge()
                    ->color('info')
                    ->sortable(),
                Tables\Columns\TextColumn::make('happened_at')
                    ->label('Fecha')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Guardia')
                    ->searchable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('type')
                    ->options([
                        'resignation' => 'Renuncias',
                        'clearance' => 'Pases de Salida',
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
                Tables\Actions\EditAction::make(),
            ])
            ->poll('3s');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSecuritySpecialLogs::route('/'),
            'edit' => Pages\EditSecuritySpecialLog::route('/{record}/edit'),
        ];
    }
}
