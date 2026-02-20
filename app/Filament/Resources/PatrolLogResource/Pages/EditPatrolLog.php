<?php

namespace App\Filament\Resources\PatrolLogResource\Pages;

use App\Filament\Resources\PatrolLogResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPatrolLog extends EditRecord
{
    protected static string $resource = PatrolLogResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
