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
                Tables\Columns\BadgeColumn::make('type')
                    ->label('Tipo')
                    ->colors([
                        'primary' => 'visitor',
                        'success' => 'supplier',
                        'warning' => 'contractor',
                        'info' => ['laptop_only', 'employee_laptop'],
                    ])
                    ->formatStateUsing(fn($state) => [
                        'visitor' => 'Visitante',
                        'supplier' => 'Proveedor',
                        'contractor' => 'Contratista',
                        'laptop_only' => 'Solo Laptop',
                        'employee_laptop' => 'Laptop Colaborador',
                    ][$state] ?? $state),
                Tables\Columns\TextColumn::make('entry_at')
                    ->label('Entrada')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
                Tables\Columns\TextColumn::make('exit_at')
                    ->label('Salida')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->placeholder('Aún dentro'),
                Tables\Columns\TextColumn::make('externalPerson.company.name')
                    ->label('Empresa')
                    ->searchable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('type')
                    ->options([
                        'visitor' => 'Visitantes',
                        'supplier' => 'Proveedores',
                        'contractor' => 'Contratistas',
                    ]),
            ])
            ->actions([
                Tables\Actions\Action::make('registrar_salida')
                    ->label('Marcar Salida')
                    ->icon('heroicon-m-clock')
                    ->color('warning')
                    ->hidden(fn(AccessLog $record): bool => (bool) $record->exit_at)
                    ->action(function (AccessLog $record) {
                        $record->update([
                            'exit_at' => now(),
                        ]);
                    })
                    ->requiresConfirmation()
                    ->successNotificationTitle('Salida registrada correctamente'),
                Tables\Actions\EditAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAccessLogs::route('/'),
            'edit' => Pages\EditAccessLog::route('/{record}/edit'),
        ];
    }
}
