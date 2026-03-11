<?php

namespace App\Filament\Superadmin\Pages;

use Filament\Pages\Page;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Artisan;

class BackupPage extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-circle-stack';
    protected static ?string $navigationLabel = 'Respaldos';
    protected static ?string $title = 'Respaldo de Base de Datos';
    protected static ?string $slug = 'backup';
    protected static ?int $navigationSort = 99;

    protected static string $view = 'filament.superadmin.pages.backup-page';

    protected function getHeaderActions(): array
    {
        return [
            Action::make('createBackup')
                ->label('Crear Respaldo Ahora')
                ->icon('heroicon-o-arrow-down-tray')
                ->color('success')
                ->requiresConfirmation()
                ->modalHeading('Confirmar Respaldo')
                ->modalDescription('¿Estás seguro de que deseas iniciar un nuevo respaldo completo de la base de datos y archivos? Este proceso puede tardar unos segundos. El archivo se guardará automáticamente en Cloudflare R2.')
                ->modalSubmitActionLabel('Comenzar Respaldo')
                ->action(function () {
                    try {
                        Artisan::call('backup:run', ['--disable-notifications' => true]);
                        $output = Artisan::output();

                        Notification::make()
                            ->title('¡Respaldo completado!')
                            ->body('El respaldo se ha completado correctamente y se ha guardado en la nube.')
                            ->success()
                            ->duration(8000)
                            ->send();
                    } catch (\Exception $e) {
                        Notification::make()
                            ->title('Error en el respaldo')
                            ->body('No se pudo completar el respaldo: ' . $e->getMessage())
                            ->danger()
                            ->duration(10000)
                            ->send();
                    }
                }),
        ];
    }
}
