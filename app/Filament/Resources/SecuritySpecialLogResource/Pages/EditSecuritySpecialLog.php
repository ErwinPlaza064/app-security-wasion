<?php

namespace App\Filament\Resources\SecuritySpecialLogResource\Pages;

use App\Filament\Resources\SecuritySpecialLogResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditSecuritySpecialLog extends EditRecord
{
    protected static string $resource = SecuritySpecialLogResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
