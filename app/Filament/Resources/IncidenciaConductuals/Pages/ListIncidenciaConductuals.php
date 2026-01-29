<?php

namespace App\Filament\Resources\IncidenciaConductuals\Pages;

use App\Filament\Resources\IncidenciaConductuals\IncidenciaConductualResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListIncidenciaConductuals extends ListRecords
{
    protected static string $resource = IncidenciaConductualResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
