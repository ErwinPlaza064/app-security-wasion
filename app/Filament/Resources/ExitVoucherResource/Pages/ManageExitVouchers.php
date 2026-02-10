<?php

namespace App\Filament\Resources\ExitVoucherResource\Pages;

use App\Filament\Resources\ExitVoucherResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManageExitVouchers extends ManageRecords
{
    protected static string $resource = ExitVoucherResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
