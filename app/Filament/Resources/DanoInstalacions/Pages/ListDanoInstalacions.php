<?php

namespace App\Filament\Resources\DanoInstalacions\Pages;

use App\Filament\Resources\DanoInstalacions\DanoInstalacionResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListDanoInstalacions extends ListRecords
{
    protected static string $resource = DanoInstalacionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
