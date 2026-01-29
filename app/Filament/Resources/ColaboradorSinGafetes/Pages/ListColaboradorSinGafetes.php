<?php

namespace App\Filament\Resources\ColaboradorSinGafetes\Pages;

use App\Filament\Resources\ColaboradorSinGafetes\ColaboradorSinGafeteResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListColaboradorSinGafetes extends ListRecords
{
    protected static string $resource = ColaboradorSinGafeteResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
