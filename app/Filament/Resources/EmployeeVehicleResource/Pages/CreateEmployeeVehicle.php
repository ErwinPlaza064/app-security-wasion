<?php

namespace App\Filament\Resources\EmployeeVehicleResource\Pages;

use App\Filament\Resources\EmployeeVehicleResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateEmployeeVehicle extends CreateRecord
{
    protected static string $resource = EmployeeVehicleResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['user_id'] = auth()->id();

        if (auth()->user()->role === 'Admin') {
            $data['plant'] = auth()->user()->plant;
        }

        return $data;
    }
}
