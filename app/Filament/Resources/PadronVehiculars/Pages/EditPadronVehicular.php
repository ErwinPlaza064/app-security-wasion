<?php

namespace App\Filament\Resources\PadronVehiculars\Pages;

use App\Filament\Resources\PadronVehiculars\PadronVehicularResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditPadronVehicular extends EditRecord
{
    protected static string $resource = PadronVehicularResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
