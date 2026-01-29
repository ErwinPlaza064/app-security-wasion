<?php

namespace App\Filament\Resources\Visitantes\Pages;

use App\Filament\Resources\Visitantes\VisitanteResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListVisitantes extends ListRecords
{
    protected static string $resource = VisitanteResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
