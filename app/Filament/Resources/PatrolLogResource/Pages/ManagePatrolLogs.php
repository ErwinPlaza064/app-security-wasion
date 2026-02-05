<?php

namespace App\Filament\Resources\PatrolLogResource\Pages;

use App\Filament\Resources\PatrolLogResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManagePatrolLogs extends ManageRecords
{
    protected static string $resource = PatrolLogResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
