<?php

namespace App\Filament\Resources\Contratistas\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ContratistasTable
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
                TextColumn::make('persona_que_visita')
                    ->searchable(),
                TextColumn::make('area_trabajo')
                    ->searchable(),
                TextColumn::make('hora_entrada')
                    ->time()
                    ->sortable(),
                TextColumn::make('hora_salida')
                    ->time()
                    ->sortable(),
                TextColumn::make('numero_gafete')
                    ->searchable(),
                TextColumn::make('marca_vehiculo')
                    ->searchable(),
                TextColumn::make('placas')
                    ->searchable(),
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
