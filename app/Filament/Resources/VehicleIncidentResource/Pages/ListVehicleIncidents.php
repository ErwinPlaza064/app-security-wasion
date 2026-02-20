<?php

namespace App\Filament\Resources\VehicleIncidentResource\Pages;

use App\Filament\Resources\VehicleIncidentResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListVehicleIncidents extends ListRecords
{
    protected static string $resource = VehicleIncidentResource::class;

    protected function getHeaderActions(): array
    {
        return [];
    }
}
