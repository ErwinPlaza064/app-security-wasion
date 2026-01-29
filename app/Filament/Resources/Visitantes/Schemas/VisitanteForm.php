<?php

namespace App\Filament\Resources\Visitantes\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TimePicker;
use Filament\Schemas\Schema;

class VisitanteForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                DatePicker::make('fecha')
                    ->required(),
                TextInput::make('nombre_completo')
                    ->required(),
                TextInput::make('empresa')
                    ->required(),
                TextInput::make('marca')
                    ->default(null),
                TextInput::make('color')
                    ->default(null),
                TextInput::make('numero_serie')
                    ->default(null),
                TimePicker::make('hora_entrada')
                    ->required(),
                TimePicker::make('hora_salida'),
                Textarea::make('firma')
                    ->default(null)
                    ->columnSpanFull(),
            ]);
    }
}
