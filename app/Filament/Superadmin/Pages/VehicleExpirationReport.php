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
                ->label('Notificar al Panel')
                ->icon('heroicon-o-bell')
                ->color('primary')
                ->requiresConfirmation()
                ->modalHeading('¿Enviar notificaciones ahora?')
                ->modalDescription('Esto enviará una alerta al dashboard de todos los usuarios con rol Admin y SuperAdmin.')
                ->action(function () {
                    try {
                        Artisan::call('app:send-vehicle-expirations-report');
                        $output = Artisan::output();
 
                        Notification::make()
                            ->title('Notificaciones Enviadas')
                            ->body('Se han enviado las alertas al dashboard de los administradores.')
                            ->success()
                            ->send();
                    } catch (\Exception $e) {
                        Notification::make()
                            ->title('Error al enviar el reporte')
                            ->body($e->getMessage())
                            ->danger()
                            ->send();
                    }
                }),
        ];
    }
}
