<?php

namespace App\Filament\Resources\RenunciaFiniquitos\Pages;

use App\Filament\Resources\RenunciaFiniquitos\RenunciaFiniquitoResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditRenunciaFiniquito extends EditRecord
{
    protected static string $resource = RenunciaFiniquitoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
