<?php

namespace App\Filament\Resources\Laptops\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class LaptopsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('fecha')
                    ->date()
                    ->sortable(),
                TextColumn::make('nombre_completo')
                    ->searchable(),
                TextColumn::make('empresa')
                    ->searchable(),
                TextColumn::make('marca')
                    ->searchable(),
                TextColumn::make('color')
                    ->searchable(),
                TextColumn::make('numero_serie')
                    ->searchable(),
                TextColumn::make('hora_entrada')
                    ->time()
                    ->sortable(),
                TextColumn::make('hora_salida')
                    ->time()
                    ->sortable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
