<?php

namespace App\Filament\Resources\Visitantes\Pages;

use App\Filament\Resources\Visitantes\VisitanteResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditVisitante extends EditRecord
{
    protected static string $resource = VisitanteResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
