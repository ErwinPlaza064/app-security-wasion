<?php

namespace App\Filament\Resources\TestProveedors\Pages;

use App\Filament\Resources\TestProveedors\TestProveedorResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListTestProveedors extends ListRecords
{
    protected static string $resource = TestProveedorResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
