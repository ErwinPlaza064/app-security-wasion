<?php

namespace App\Filament\Resources\RenunciaFiniquitos\Pages;

use App\Filament\Resources\RenunciaFiniquitos\RenunciaFiniquitoResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListRenunciaFiniquitos extends ListRecords
{
    protected static string $resource = RenunciaFiniquitoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
