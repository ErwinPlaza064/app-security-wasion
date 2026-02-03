<?php

namespace App\Filament\Resources\SecuritySpecialLogResource\Pages;

use App\Filament\Resources\SecuritySpecialLogResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListSecuritySpecialLogs extends ListRecords
{
    protected static string $resource = SecuritySpecialLogResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
