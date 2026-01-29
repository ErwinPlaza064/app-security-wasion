<?php

namespace App\Filament\Resources\Contratistas\Pages;

use App\Filament\Resources\Contratistas\ContratistaResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditContratista extends EditRecord
{
    protected static string $resource = ContratistaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
