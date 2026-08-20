<?php

namespace App\Filament\Resources\SupplierMeetingResource\Pages;

use App\Filament\Resources\SupplierMeetingResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditSupplierMeeting extends EditRecord
{
    protected static string $resource = SupplierMeetingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
        ];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
