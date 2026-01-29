<?php

namespace App\Filament\Resources\ColaboradorSinGafetes\Pages;

use App\Filament\Resources\ColaboradorSinGafetes\ColaboradorSinGafeteResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditColaboradorSinGafete extends EditRecord
{
    protected static string $resource = ColaboradorSinGafeteResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
