<?php

namespace App\Filament\Resources\NoBadgeLogResource\Pages;

use App\Filament\Resources\NoBadgeLogResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListNoBadgeLogs extends ListRecords
{
    protected static string $resource = NoBadgeLogResource::class;

    protected function getHeaderActions(): array
    {
        return [];
    }
}
