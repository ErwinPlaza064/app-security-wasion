<?php

namespace App\Filament\Resources\ExitVoucherResource\Pages;

use App\Filament\Resources\ExitVoucherResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditExitVoucher extends EditRecord
{
    protected static string $resource = ExitVoucherResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
