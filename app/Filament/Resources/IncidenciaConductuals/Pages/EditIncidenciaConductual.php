<?php

namespace App\Filament\Resources\IncidenciaConductuals\Pages;

use App\Filament\Resources\IncidenciaConductuals\IncidenciaConductualResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditIncidenciaConductual extends EditRecord
{
    protected static string $resource = IncidenciaConductualResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
