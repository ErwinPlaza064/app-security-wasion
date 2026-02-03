<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SecuritySpecialLogResource\Pages;
use App\Models\SecuritySpecialLog;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class SecuritySpecialLogResource extends Resource
{
    protected static ?string $model = SecuritySpecialLog::class;
    public static function canCreate(): bool
    {
        return false;
    }
    protected static ?string $navigationIcon = 'heroicon-o-document-magnifying-glass';
    protected static ?string $navigationGroup = 'Seguridad Corporativa';
    protected static ?string $modelLabel = 'Bitácora Especial';
    protected static ?string $pluralModelLabel = 'Bitácoras Especiales';

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
                                'resignation' => 'Renuncia / Finiquito',
                                'no_badge' => 'Ingreso sin Gafete',
                                'clearance' => 'Pase de Salida',
                            ])
                            ->required(),
                        Forms\Components\DateTimePicker::make('happened_at')
                            ->label('Fecha/Hora del Registro')
                            ->required(),
                    ])->columns(3),

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
                        'warning' => 'no_badge',
                        'success' => 'clearance',
                    ])
                    ->formatStateUsing(fn($state) => [
                        'resignation' => 'Baja / Renuncia',
                        'no_badge' => 'Sin Gafete',
                        'clearance' => 'Liquidación',
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
                        'no_badge' => 'Sin Gafete',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSecuritySpecialLogs::route('/'),
            'edit' => Pages\EditSecuritySpecialLog::route('/{record}/edit'),
        ];
    }
}
