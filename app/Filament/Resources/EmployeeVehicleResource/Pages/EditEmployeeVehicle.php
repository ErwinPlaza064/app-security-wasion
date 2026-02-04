<?php

namespace App\Filament\Resources\EmployeeVehicleResource\Pages;

use App\Filament\Resources\EmployeeVehicleResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditEmployeeVehicle extends EditRecord
{
    protected static string $resource = EmployeeVehicleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
