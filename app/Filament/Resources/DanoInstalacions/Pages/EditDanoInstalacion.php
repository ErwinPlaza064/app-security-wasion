<?php

namespace App\Filament\Resources\DanoInstalacions\Pages;

use App\Filament\Resources\DanoInstalacions\DanoInstalacionResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditDanoInstalacion extends EditRecord
{
    protected static string $resource = DanoInstalacionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
