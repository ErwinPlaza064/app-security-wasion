<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\EmployeeVehicle;
use App\Models\User;
use App\Mail\ExpiringVehiclesNotification;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;

class SendVehicleExpirationsReport extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'app:send-vehicle-expirations-report';

    /**
     * The console command description.
     */
    protected $description = 'Envía un reporte de documentación vencida o próxima a vencer a los administradores.';

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

        // Format data for the email
        $reportData = $expiringVehicles->map(function ($vehicle) use ($today) {
            $docs = [];
            if ($vehicle->driver_license_expires_at && $vehicle->driver_license_expires_at <= Carbon::today()->addDays(7)) {
                $docs[] = [
                    'name' => $vehicle->employee_name,
                    'marbete' => $vehicle->marbete_number,
                    'doc_type' => 'Licencia de Conducir',
                    'expiry_date' => $vehicle->driver_license_expires_at,
                    'is_expired' => $vehicle->driver_license_expires_at < $today,
                    'plant' => $vehicle->plant
                ];
            }
            if ($vehicle->insurance_expires_at && $vehicle->insurance_expires_at <= Carbon::today()->addDays(7)) {
                $docs[] = [
                    'name' => $vehicle->employee_name,
                    'marbete' => $vehicle->marbete_number,
                    'doc_type' => 'Póliza de Seguro',
                    'expiry_date' => $vehicle->insurance_expires_at,
                    'is_expired' => $vehicle->insurance_expires_at < $today,
                    'plant' => $vehicle->plant
                ];
            }
            return $docs;
        })->flatten(1);

        // Get all admin and superadmin users (ignoring example seeds)
        $admins = User::whereIn('role', ['admin', 'superadmin', 'Admin', 'SuperAdmin'])
            ->where('email', 'not like', '%@example.com')
            ->get()
            ->filter(function ($user) {
                return $user->isAdmin();
            });

        if ($admins->isEmpty()) {
            $this->error('No se encontraron administradores con correos válidos para notificar.');
            return;
        }

        // Send email to each admin
        foreach ($admins as $admin) {
            Mail::to($admin->email)->send(new ExpiringVehiclesNotification($reportData));
        }

        $mailer = config('mail.default');
        $this->info('Reporte de vencimientos enviado a ' . $admins->count() . ' administradores. (Sistema de correo utilizado: ' . $mailer . ')');
    }
}
