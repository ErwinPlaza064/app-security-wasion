<?php

namespace App\Filament\Resources\IncidenciaPersonalExternos\Pages;

use App\Filament\Resources\IncidenciaPersonalExternos\IncidenciaPersonalExternoResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListIncidenciaPersonalExternos extends ListRecords
{
    protected static string $resource = IncidenciaPersonalExternoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
