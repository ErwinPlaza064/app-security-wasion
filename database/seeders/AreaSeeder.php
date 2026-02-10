<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Area;

class AreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            'Planta 1' => [
                'SMT',
                'MCU',
                'THT',
                'DIP',
                'Couting',
                'Post-proceso',
                'Calibración',
                'Ensamble',
                'Control de producción',
                'Producto terminado',
                'Calidad',
                'Mantenimiento',
                'Almacén',
                'Inyección',
                'RH',
                'Administración',
                'Proyectos',
                'Finanzas',
                'Logistica',
                'Compras',
                'Staff Producción',
                'Procesos',
                'Planeación',
                'Soporte tecnico',
                'Staff chino',
                'Externo'
            ],
            'Planta 3' => [
                'Recloser',
                'Calidad',
                'Mantenimiento',
                'Almacén',
                'RH',
                'Administración',
                'Proyectos',
                'Finanzas',
                'Logistica',
                'Compras',
                'Staff Producción',
                'Procesos',
                'Planeación',
                'Soporte tecnico',
                'Staff chino',
                'Externo'
            ],
            'Planta 5' => [
                'Embobinado',
                'Ensamble',
                'Calidad',
                'Mantenimiento',
                'Almacén',
                'RH',
                'Administración',
                'Proyectos',
                'Finanzas',
                'Logistica',
                'Compras',
                'Staff Producción',
                'Procesos',
                'Planeación',
                'Soporte tecnico',
                'Staff chino',
                'Externo'
            ]
        ];

        foreach ($data as $plant => $areas) {
            foreach ($areas as $areaName) {
                Area::firstOrCreate([
                    'plant' => $plant,
                    'name' => $areaName,
                ]);
            }
        }
    }
}
