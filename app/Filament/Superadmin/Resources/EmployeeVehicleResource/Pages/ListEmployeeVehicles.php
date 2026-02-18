<?php

namespace App\Filament\Superadmin\Resources\EmployeeVehicleResource\Pages;

use App\Filament\Superadmin\Resources\EmployeeVehicleResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListEmployeeVehicles extends ListRecords
{
    protected static string $resource = EmployeeVehicleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
