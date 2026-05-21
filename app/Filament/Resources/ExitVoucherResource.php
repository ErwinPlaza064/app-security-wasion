<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ExitVoucherResource\Pages;
use App\Models\ExitVoucher;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Repeater;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\SelectColumn;

class ExitVoucherResource extends Resource
{
    protected static ?string $model = ExitVoucher::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';

    public static function shouldRegisterNavigation(): bool
    {
        return true;
    }

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

    protected static ?string $navigationLabel = 'Vales de Salida';

    protected static ?string $modelLabel = 'Vale de Salida';

    protected static ?string $pluralModelLabel = 'Vales de Salida';

    protected static ?string $navigationGroup = 'Operaciones';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Información General')
                    ->schema([
                        Grid::make(5)
                            ->schema([
                                Forms\Components\TextInput::make('folio')
                                    ->label('Folio №')
                                    ->required()
                                    ->disabled()
                                    ->dehydrated(),
                                Forms\Components\TextInput::make('reference_number')
                                    ->label('Referencia')
                                    ->required(),
                                Forms\Components\DatePicker::make('voucher_date')
                                    ->label('Fecha del Vale')
                                    ->required()
                                    ->default(now()),
                                Forms\Components\Select::make('status')
                                    ->label('Estado')
                                    ->options([
                                        'open'   => 'Abierto',
                                        'closed' => 'Cerrado',
                                    ])
                                    ->required()
                                    ->native(false),
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
                                    ->native(false),
                            ]),
                        Grid::make(2)
                            ->schema([
                                Forms\Components\TextInput::make('recipient_name')
                                    ->label('Nombre del Solicitante')
                                    ->required()
                                    ->columnSpan(1),
                                Forms\Components\Select::make('user_id')
                                    ->label('Registrado por')
                                    ->relationship('user', 'name')
                                    ->searchable()
                                    ->required()
                                    ->columnSpan(1),
                            ]),
                    ]),

                Section::make('Detalles de Salida')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                Forms\Components\Select::make('concept')
                                    ->label('Concepto / Motivo')
                                    ->options([
                                        'loan' => 'Préstamo',
                                        'sample' => 'Muestra',
                                        'repair' => 'Reparación',
                                        'others' => 'Otros',
                                    ])
                                    ->required()
                                    ->reactive(),
                                Forms\Components\TextInput::make('other_concept_details')
                                    ->label('Especificar Motivo')
                                    ->visible(fn(callable $get) => $get('concept') === 'others')
                                    ->required(fn(callable $get) => $get('concept') === 'others'),
                                Forms\Components\Toggle::make('is_fixed_asset')
                                    ->label('¿Es Activo Fijo?')
                                    ->required()
                                    ->inline(false),
                            ]),
                        Grid::make(2)
                            ->schema([
                                Forms\Components\DatePicker::make('exit_date')
                                    ->label('Fecha de Salida')
                                    ->required()
                                    ->default(now()),
                                Forms\Components\DatePicker::make('return_date')
                                    ->label('Fecha Estimada de Retorno'),
                            ]),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('folio')
                    ->label('Folio')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->color('primary'),
                TextColumn::make('recipient_name')
                    ->label('Solicitante')
                    ->searchable(),
                TextColumn::make('concept')
                    ->label('Motivo')
                    ->formatStateUsing(fn(string $state): string => match ($state) {
                        'loan' => 'Préstamo',
                        'sample' => 'Muestra',
                        'repair' => 'Reparación',
                        'others' => 'Otros',
                        default => $state,
                    })
                    ->badge()
                    ->color('gray'),
                IconColumn::make('is_fixed_asset')
                    ->label('Activo')
                    ->boolean()
                    ->trueIcon('heroicon-o-check-badge')
                    ->falseIcon('heroicon-o-x-circle'),
                TextColumn::make('plant')
                    ->label('Planta')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('status')
                    ->label('Estado')
                    ->badge()
                    ->formatStateUsing(fn(string $state): string => match ($state) {
                        'open'   => 'Abierto',
                        'closed' => 'Cerrado',
                        default  => $state,
                    })
                    ->color(fn(string $state): string => match ($state) {
                        'open'   => 'success',
                        'closed' => 'danger',
                        default  => 'gray',
                    }),
                TextColumn::make('exit_date')
                    ->label('Salida')
                    ->date()
                    ->sortable(),
                TextColumn::make('return_date')
                    ->label('Retorno')
                    ->date()
                    ->sortable()
                    ->placeholder('No Aplica'),
                TextColumn::make('closedBy.name')
                    ->label('Cerrado por')
                    ->placeholder('Aún activo'),
                TextColumn::make('user.name')
                    ->label('Registrado por')
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('created_at')
                    ->label('Registro')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->label('Estado')
                    ->options([
                        'open'   => 'Abierto',
                        'closed' => 'Cerrado',
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
                Tables\Filters\TernaryFilter::make('is_fixed_asset')
                    ->label('Activo Fijo'),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
            ])
            ->bulkActions([]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListExitVouchers::route('/'),
        ];
    }
}
