<?php

namespace App\Filament\Resources\SupplierMeetingResource\Pages;

use App\Filament\Resources\SupplierMeetingResource;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Auth;

class CreateSupplierMeeting extends CreateRecord
{
    protected static string $resource = SupplierMeetingResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['user_id'] = Auth::id();

        return $data;
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
