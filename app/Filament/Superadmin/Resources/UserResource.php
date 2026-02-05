<?php

namespace App\Filament\Superadmin\Resources;

use App\Filament\Superadmin\Resources\UserResource\Pages;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Hash;

class UserResource extends Resource
{
    protected static ?string $model = User::class;
    protected static ?string $navigationIcon = 'heroicon-o-shield-check';
    protected static ?string $navigationGroup = 'Configuración';
    protected static ?string $modelLabel = 'Gestión de Usuario';
    protected static ?string $pluralModelLabel = 'Gestión de Usuarios';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Card::make()
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Nombre')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('email')
                            ->label('Correo Electrónico')
                            ->email()
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255),
                        Forms\Components\Select::make('role')
                            ->label('Rol del Sistema')
                            ->options([
                                'user' => 'Usuario Operativo (Guardia)',
                                'Admin' => 'Administrador de Reportes',
                                'SuperAdmin' => 'Super Administrador',
                            ])
                            ->required(),
                        Forms\Components\Select::make('plant')
                            ->label('Planta Asignada')
                            ->options([
                                'Planta 1' => 'Planta 1',
                                'Planta 3' => 'Planta 3',
                                'Planta 5' => 'Planta 5',
                            ])
                            ->required(fn(Forms\Get $get) => $get('role') === 'user')
                            ->placeholder('Selecciona una planta'),
                        Forms\Components\TextInput::make('password')
                            ->label('Contraseña')
                            ->password()
                            ->dehydrateStateUsing(fn($state) => Hash::make($state))
                            ->dehydrated(fn($state) => filled($state))
                            ->required(fn(string $context): bool => $context === 'create')
                            ->maxLength(255),
                    ])->columns(2)
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Nombre')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('email')
                    ->label('Correo')
                    ->searchable(),
                Tables\Columns\BadgeColumn::make('role')
                    ->label('Rol')
                    ->colors([
                        'danger' => 'SuperAdmin',
                        'warning' => 'Admin',
                        'success' => 'user',
                    ])
                    ->formatStateUsing(fn($state) => [
                        'SuperAdmin' => 'Super Maestro',
                        'Admin' => 'Administrativo',
                        'user' => 'Operativo',
                    ][$state] ?? $state),
                Tables\Columns\TextColumn::make('plant')
                    ->label('Planta')
                    ->badge()
                    ->color('info')
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Fecha Registro')
                    ->dateTime('d/m/Y')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('plant')
                    ->label('Filtrar por Planta')
                    ->options([
                        'Planta 1' => 'Planta 1',
                        'Planta 3' => 'Planta 3',
                        'Planta 5' => 'Planta 5',
                    ]),
                Tables\Filters\SelectFilter::make('role')
                    ->options([
                        'SuperAdmin' => 'Super Maestros',
                        'Admin' => 'Administradores',
                        'user' => 'Operativos',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
