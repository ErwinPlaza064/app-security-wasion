<?php

namespace App\Filament\Resources\PatrolLogResource\Pages;

use App\Filament\Resources\PatrolLogResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPatrolLogs extends ListRecords
{
    protected static string $resource = PatrolLogResource::class;

    protected function getHeaderActions(): array
    {
        return [];
    }
}
