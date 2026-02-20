<?php

namespace App\Filament\Resources\VehicleIncidentResource\Pages;

use App\Filament\Resources\VehicleIncidentResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditVehicleIncident extends EditRecord
{
    protected static string $resource = VehicleIncidentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
