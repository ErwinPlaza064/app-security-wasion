<?php

namespace App\Filament\Resources\Contratistas\Pages;

use App\Filament\Resources\Contratistas\ContratistaResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListContratistas extends ListRecords
{
    protected static string $resource = ContratistaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
