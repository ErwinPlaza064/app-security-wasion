<?php

namespace App\Filament\Resources\AccessLogResource\Pages;

use App\Exports\AccessLogsExport;
use App\Filament\Resources\AccessLogResource;
use Filament\Actions;
use Filament\Forms;
use Filament\Resources\Pages\ListRecords;
use Maatwebsite\Excel\Facades\Excel;

class ListAccessLogs extends ListRecords
{
    protected static string $resource = AccessLogResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('exportExcel')
                ->label('Exportar Excel')
                ->icon('heroicon-o-arrow-down-tray')
                ->color('success')
                ->modalHeading('Exportar Registros de Acceso')
                ->modalDescription('Seleccione los filtros para el reporte. Deje en blanco para exportar todos los registros.')
                ->modalSubmitActionLabel('Descargar Excel')
                ->modalIcon('heroicon-o-arrow-down-tray')
                ->form([
                    Forms\Components\Select::make('month')
                        ->label('Mes')
                        ->options(function () {
                            $months = [
                                '01' => 'Enero',
                                '02' => 'Febrero',
                                '03' => 'Marzo',
                                '04' => 'Abril',
                                '05' => 'Mayo',
                                '06' => 'Junio',
                                '07' => 'Julio',
                                '08' => 'Agosto',
                                '09' => 'Septiembre',
                                '10' => 'Octubre',
                                '11' => 'Noviembre',
                                '12' => 'Diciembre',
                            ];

                            $currentYear = now()->year;
                            $options = [];

                            // Current year and previous year
                            foreach ([$currentYear, $currentYear - 1] as $year) {
                                foreach ($months as $num => $name) {
                                    $key = "{$year}-{$num}";
                                    $options[$key] = "{$name} {$year}";
                                }
                            }

                            return $options;
                        })
                        ->searchable()
                        ->placeholder('Todos los meses'),
                    Forms\Components\Select::make('plant')
                        ->label('Planta')
                        ->options([
                            'Planta 1' => 'Planta 1',
                            'Planta 2' => 'Planta 2',
                            'Planta 3' => 'Planta 3',
                            'Planta 4' => 'Planta 4',
                            'Planta 5' => 'Planta 5',
                        ])
                        ->placeholder('Todas las plantas'),
                    Forms\Components\Select::make('type')
                        ->label('Tipo de Acceso')
                        ->options([
                            'visitor'         => 'Visitante',
                            'supplier'        => 'Proveedor',
                            'contractor'      => 'Contratista',
                            'laptop_only'     => 'Solo Laptop',
                            'employee_laptop' => 'Laptop Colaborador',
                            'resignation'     => 'Renuncia',
                            'clearance'       => 'Finiquito',
                            'no_badge'        => 'Sin Gafete',
                        ])
                        ->placeholder('Todos los tipos'),
                ])
                ->action(function (array $data) {
                    $month = $data['month'] ?? null;
                    $plant = $data['plant'] ?? null;
                    $type = $data['type'] ?? null;

                    $filename = 'registros_acceso';
                    if ($month) $filename .= "_{$month}";
                    if ($plant) $filename .= '_' . str_replace(' ', '_', strtolower($plant));
                    if ($type) $filename .= "_{$type}";
                    $filename .= '.xlsx';

                    return Excel::download(
                        new AccessLogsExport($month, $plant, $type),
                        $filename,
                    );
                }),
        ];
    }
}
