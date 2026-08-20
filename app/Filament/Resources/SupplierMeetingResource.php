<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SupplierMeetingResource\Pages;
use App\Models\SupplierMeeting;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class SupplierMeetingResource extends Resource
{
    protected static ?string $model = SupplierMeeting::class;

    protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-bottom-center-text';

    protected static ?string $navigationGroup = 'Directorio';

    protected static ?string $navigationLabel = 'Reuniones con Proveedores';

    protected static ?string $modelLabel = 'Reunión con Proveedor';

    protected static ?string $pluralModelLabel = 'Reuniones con Proveedores';

    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Información de la Reunión')
                    ->description('Datos generales de la reunión con el proveedor.')
                    ->icon('heroicon-o-calendar')
                    ->schema([
                        Forms\Components\Grid::make(3)
                            ->schema([
                                Forms\Components\DatePicker::make('meeting_date')
                                    ->label('Fecha de la Reunión')
                                    ->required()
                                    ->default(now()),
                                Forms\Components\TimePicker::make('meeting_time')
                                    ->label('Hora de la Reunión')
                                    ->required()
                                    ->default(now()->format('H:i')),
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
                            ]),
                        Forms\Components\Grid::make(2)
                            ->schema([
                                Forms\Components\Select::make('company_id')
                                    ->label('Proveedor / Empresa')
                                    ->relationship('company', 'name')
                                    ->searchable()
                                    ->preload()
                                    ->required()
                                    ->createOptionForm([
                                        Forms\Components\TextInput::make('name')
                                            ->label('Nombre de la Empresa / Proveedor')
                                            ->required(),
                                        Forms\Components\TextInput::make('legal_name')
                                            ->label('Razón Social'),
                                        Forms\Components\TextInput::make('tax_id')
                                            ->label('RFC / Identificación Fiscal'),
                                    ])
                                    ->helperText('Seleccione un proveedor registrado o agregue uno nuevo con el botón (+).'),
                                Forms\Components\TextInput::make('subject')
                                    ->label('Asunto / Tema de la Reunión')
                                    ->placeholder('Ej. Revisión mensual de servicio, entrega de insumos...')
                                    ->maxLength(255),
                            ]),
                        Forms\Components\Textarea::make('attendees')
                            ->label('Asistentes (Wasion / Proveedor)')
                            ->placeholder('Ej. Juan Pérez (Seguridad Wasion), Ing. Carlos Gómez (Proveedor)')
                            ->rows(2)
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('Minuta y Acuerdos')
                    ->description('Puntos tratados, acuerdos establecidos y compromisos de seguimiento.')
                    ->icon('heroicon-o-document-text')
                    ->schema([
                        Forms\Components\RichEditor::make('minutes')
                            ->label('Minuta de la Reunión')
                            ->placeholder('Escriba detalladamente los temas discutidos, acuerdos, fechas límite y responsables...')
                            ->required()
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('meeting_date')
                    ->label('Fecha')
                    ->date('d/m/Y')
                    ->sortable(),
                Tables\Columns\TextColumn::make('meeting_time')
                    ->label('Hora')
                    ->sortable(),
                Tables\Columns\TextColumn::make('company.name')
                    ->label('Proveedor')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->color('primary'),
                Tables\Columns\TextColumn::make('plant')
                    ->label('Planta')
                    ->badge()
                    ->color('info')
                    ->sortable(),
                Tables\Columns\TextColumn::make('subject')
                    ->label('Asunto')
                    ->limit(35)
                    ->searchable()
                    ->placeholder('Sin asunto'),
                Tables\Columns\TextColumn::make('minutes')
                    ->label('Minuta')
                    ->formatStateUsing(fn ($state) => strip_tags($state))
                    ->limit(40)
                    ->searchable(),
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Registró')
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Fecha Registro')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('meeting_date', 'desc')
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
                Tables\Filters\SelectFilter::make('company_id')
                    ->label('Proveedor')
                    ->relationship('company', 'name')
                    ->searchable()
                    ->preload(),
                Tables\Filters\Filter::make('meeting_date')
                    ->form([
                        Forms\Components\DatePicker::make('from')->label('Desde'),
                        Forms\Components\DatePicker::make('until')->label('Hasta'),
                    ])
                    ->query(function ($query, array $data) {
                        return $query
                            ->when($data['from'], fn ($q, $date) => $q->whereDate('meeting_date', '>=', $date))
                            ->when($data['until'], fn ($q, $date) => $q->whereDate('meeting_date', '<=', $date));
                    }),
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

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSupplierMeetings::route('/'),
            'create' => Pages\CreateSupplierMeeting::route('/create'),
            'edit' => Pages\EditSupplierMeeting::route('/{record}/edit'),
        ];
    }
}
