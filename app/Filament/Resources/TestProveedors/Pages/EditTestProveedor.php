<?php

namespace App\Filament\Resources\TestProveedors\Pages;

use App\Filament\Resources\TestProveedors\TestProveedorResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditTestProveedor extends EditRecord
{
    protected static string $resource = TestProveedorResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
