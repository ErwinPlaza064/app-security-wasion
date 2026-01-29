<?php

namespace App\Filament\Resources\IncidenciaPersonalExternos\Pages;

use App\Filament\Resources\IncidenciaPersonalExternos\IncidenciaPersonalExternoResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditIncidenciaPersonalExterno extends EditRecord
{
    protected static string $resource = IncidenciaPersonalExternoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
