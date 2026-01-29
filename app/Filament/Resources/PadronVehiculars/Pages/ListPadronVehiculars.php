<?php

namespace App\Filament\Resources\PadronVehiculars\Pages;

use App\Filament\Resources\PadronVehiculars\PadronVehicularResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListPadronVehiculars extends ListRecords
{
    protected static string $resource = PadronVehicularResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
