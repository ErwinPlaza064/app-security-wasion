<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\EmployeeVehicle;
use App\Models\User;
use Carbon\Carbon;
use Filament\Notifications\Notification;
use Filament\Notifications\Actions\Action as NotificationAction;

class SendVehicleExpirationsReport extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'app:send-vehicle-expirations-report';

    /**
     * The console command description.
     */
    protected $description = 'Envía notificaciones al dashboard de administradores sobre documentación vencida o próxima a vencer.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $today = Carbon::today();
        $warningLimit = Carbon::today()->addDays(7);

        // Get vehicles with documents expired or expiring in the next 7 days
        $expiringVehicles = EmployeeVehicle::where(function ($query) use ($warningLimit) {
            $query->where(function ($q) use ($warningLimit) {
                $q->whereNotNull('driver_license_expires_at')
                  ->where('driver_license_expires_at', '<=', $warningLimit);
            })->orWhere(function ($q) use ($warningLimit) {
                $q->whereNotNull('insurance_expires_at')
                  ->where('insurance_expires_at', '<=', $warningLimit);
            });
        })->get();

        if ($expiringVehicles->isEmpty()) {
            $this->info('No se detectaron documentos próximos a vencer.');
            return;
        }

        $expiredCount = 0;
        $expiringSoonCount = 0;

        foreach ($expiringVehicles as $vehicle) {
            $isExpired = ($vehicle->driver_license_expires_at && $vehicle->driver_license_expires_at < $today) || 
                         ($vehicle->insurance_expires_at && $vehicle->insurance_expires_at < $today);
            
            if ($isExpired) {
                $expiredCount++;
            } else {
                $expiringSoonCount++;
            }
        }

        // Get all admin and superadmin users
        $admins = User::whereIn('role', ['admin', 'superadmin', 'Admin', 'SuperAdmin'])
            ->get()
            ->filter(function ($user) {
                return $user->isAdmin();
            });

        if ($admins->isEmpty()) {
            $this->error('No se encontraron administradores para notificar.');
            return;
        }

        $totalCount = $expiringVehicles->count();
        $title = '⚠️ Alerta de Vencimientos';
        $body = "Se detectaron **{$totalCount}** vehículos con problemas de documentación:\n";
        if ($expiredCount > 0) $body .= "• {$expiredCount} registros VENCIDOS.\n";
        if ($expiringSoonCount > 0) $body .= "• {$expiringSoonCount} por vencer (7 días).\n";
        $body .= "Revise el reporte para tomar acciones.";

        foreach ($admins as $admin) {
            $url = url('/admin/employee-vehicles'); // Default to list

            if ($totalCount === 1) {
                // Si solo hay uno, ir directo al registro (edit mode)
                $url = url("/admin/employee-vehicles/{$expiringVehicles->first()->id}/edit");
            } else {
                // Si hay varios, ir al listado con filtro de "Expirado" si hay alguno vencido
                if ($expiredCount > 0) {
                    $url = url('/admin/employee-vehicles?tableFilters[validity_status][value]=Expirado');
                }
            }

            Notification::make()
                ->title($title)
                ->body($body)
                ->icon('heroicon-o-exclamation-triangle')
                ->iconColor('danger')
                ->warning()
                ->actions([
                    NotificationAction::make('view_report')
                        ->label($totalCount === 1 ? 'Ir al Registro Directo' : 'Ver Reporte Detallado')
                        ->url($url)
                        ->button()
                        ->markAsRead(),
                ])
                ->sendToDatabase($admin);
        }

        $this->info("Notificaciones enviadas a " . $admins->count() . " administradores.");
    }
}
