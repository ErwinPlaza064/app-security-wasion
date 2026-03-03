<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NoBadgeLogResource\Pages;
use App\Filament\Resources\NoBadgeLogResource\RelationManagers;
use App\Models\SecuritySpecialLog;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class NoBadgeLogResource extends Resource
{
    protected static ?string $model = SecuritySpecialLog::class;
    protected static ?string $navigationIcon = 'heroicon-o-identification';
    protected static ?string $navigationGroup = 'Operaciones';
    protected static ?string $modelLabel = 'Registro Sin Gafete';
    protected static ?string $pluralModelLabel = 'Colaboradores Sin Gafete';

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

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->where('type', 'no_badge');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Datos del Colaborador')
                    ->schema([
                        Forms\Components\Select::make('user_id')
                            ->label('Registrado por')
                            ->relationship('user', 'name')
                            ->required(),
                        Forms\Components\TextInput::make('employee_name')
                            ->label('Nombre Completo')
                            ->required(),
                        Forms\Components\TextInput::make('employee_id')
                            ->label('Nº de Nómina / ID'),
                        Forms\Components\TextInput::make('department')
                            ->label('Departamento'),
                        Forms\Components\TextInput::make('suspension_reason')
                            ->label('Motivo'),
                        Forms\Components\DateTimePicker::make('happened_at')
                            ->label('Fecha/Hora')
                            ->required(),
                        Forms\Components\Select::make('plant')
                            ->label('Planta')
                            ->options([
                                'Planta 1' => 'Planta 1',
                                'Planta 2' => 'Planta 2',
                                'Planta 3' => 'Planta 3',
                                'Planta 4' => 'Planta 4',
                                'Planta 5' => 'Planta 5',
                            ])->required(),
                    ])->columns(3),
                Forms\Components\Section::make('Notas')
                    ->schema([
                        Forms\Components\Textarea::make('notes')
                            ->label('Observaciones')
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('employee_name')
                    ->label('Colaborador')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('employee_id')
                    ->label('ID / Nómina'),
                Tables\Columns\TextColumn::make('department')
                    ->label('Depto.'),
                Tables\Columns\TextColumn::make('suspension_reason')
                    ->label('Motivo')
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'Olvido' => 'warning',
                        'Extravió' => 'danger',
                        'No entregado' => 'gray',
                        default => 'info',
                    }),
                Tables\Columns\TextColumn::make('plant')
                    ->label('Planta')
                    ->badge()
                    ->color('info'),
                Tables\Columns\TextColumn::make('happened_at')
                    ->label('Fecha')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Guardia'),
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
            'index' => Pages\ListNoBadgeLogs::route('/'),
        ];
    }
}
