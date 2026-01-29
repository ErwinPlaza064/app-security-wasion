<?php

namespace App\Filament\Resources\Contratistas\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TimePicker;
use Filament\Schemas\Schema;

class ContratistaForm
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
                TextInput::make('persona_que_visita')
                    ->required(),
                TextInput::make('area_trabajo')
                    ->required(),
                TimePicker::make('hora_entrada')
                    ->required(),
                TimePicker::make('hora_salida'),
                TextInput::make('numero_gafete')
                    ->default(null),
                TextInput::make('marca_vehiculo')
                    ->default(null),
                TextInput::make('placas')
                    ->default(null),
                Textarea::make('firma')
                    ->default(null)
                    ->columnSpanFull(),
            ]);
    }
}
