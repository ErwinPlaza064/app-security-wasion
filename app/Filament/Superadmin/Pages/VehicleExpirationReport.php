<?php

namespace App\Filament\Superadmin\Pages;

use Filament\Pages\Page;

use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Artisan;

class VehicleExpirationReport extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-envelope';

    protected static ?string $navigationLabel = 'Reporte de Vencimientos';

    protected static ?string $title = 'Reporte de Vencimientos Automático';

    protected static string $view = 'filament.superadmin.pages.vehicle-expiration-report';

    protected function getHeaderActions(): array
    {
        return [
            Action::make('sendReport')
                ->label('Enviar Reporte por Correo')
                ->icon('heroicon-o-paper-airplane')
                ->color('primary')
                ->requiresConfirmation()
                ->modalHeading('¿Enviar reporte ahora?')
                ->modalDescription('Esto enviará el correo de alerta a todos los usuarios con rol Admin y SuperAdmin.')
                ->action(function () {
                    Artisan::call('app:send-vehicle-expirations-report');

                    Notification::make()
                        ->title('Reporte enviado con éxito')
                        ->success()
                        ->send();
                }),
        ];
    }
}
