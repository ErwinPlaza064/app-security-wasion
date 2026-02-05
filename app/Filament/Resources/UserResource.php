<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Filament\Resources\UserResource\RelationManagers;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-users';
    protected static ?string $navigationGroup = 'Configuración';
    protected static ?string $modelLabel = 'Usuario / Guardia';
    protected static ?string $pluralModelLabel = 'Usuarios y Guardias';

    public static function shouldRegisterNavigation(): bool
    {
        return false;
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Datos del Usuario')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Nombre Completo')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('email')
                            ->label('Correo Electrónico')
                            ->email()
                            ->required()
                            ->maxLength(255),
                    ])->columns(2),

                Forms\Components\Section::make('Seguridad y Rol')
                    ->schema([
                        Forms\Components\TextInput::make('password')
                            ->label('Contraseña')
                            ->password()
                            ->dehydrated(fn($state) => filled($state))
                            ->required(fn(string $context): bool => $context === 'create')
                            ->maxLength(255),
                        Forms\Components\Select::make('role')
                            ->label('Rol del Sistema')
                            ->options([
                                'user' => 'Guardia / Operador',
                                'admin' => 'Administrador',
                                'superadmin' => 'Super Administrador',
                            ])
                            ->required()
                            ->default('user'),
                        Forms\Components\Select::make('plant')
                            ->label('Planta Asignada')
                            ->options([
                                'Planta 1' => 'Planta 1',
                                'Planta 2' => 'Planta 2',
                                'Planta 3' => 'Planta 3',
                                'Planta 4' => 'Planta 4',
                                'Planta 5' => 'Planta 5',
                            ])
                            ->required(),
                    ])->columns(3),
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
                        'danger' => 'superadmin',
                        'warning' => 'admin',
                        'success' => 'user',
                    ])
                    ->formatStateUsing(fn($state) => [
                        'user' => 'Guardia',
                        'admin' => 'Admin',
                        'superadmin' => 'SuperAdmin',
                    ][$state] ?? $state),
                Tables\Columns\TextColumn::make('plant')
                    ->label('Planta')
                    ->badge()
                    ->color('info'),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Desde')
                    ->dateTime('d/m/y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('plant')
                    ->label('Filtrar por Planta')
                    ->options([
                        'Planta 1' => 'Planta 1',
                        'Planta 2' => 'Planta 2',
                        'Planta 3' => 'Planta 3',
                        'Planta 4' => 'Planta 4',
                        'Planta 5' => 'Planta 5',
                    ]),
                Tables\Filters\SelectFilter::make('role')
                    ->label('Filtrar por Rol')
                    ->options([
                        'user' => 'Guardia',
                        'admin' => 'Admin',
                        'superadmin' => 'SuperAdmin',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
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
