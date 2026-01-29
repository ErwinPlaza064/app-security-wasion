<?php

namespace App\Filament\Resources\TransporteCargaDescargas\Pages;

use App\Filament\Resources\TransporteCargaDescargas\TransporteCargaDescargaResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListTransporteCargaDescargas extends ListRecords
{
    protected static string $resource = TransporteCargaDescargaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
