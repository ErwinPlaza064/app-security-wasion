<?php

namespace App\Filament\Resources\TransporteCargaDescargas\Pages;

use App\Filament\Resources\TransporteCargaDescargas\TransporteCargaDescargaResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditTransporteCargaDescarga extends EditRecord
{
    protected static string $resource = TransporteCargaDescargaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
