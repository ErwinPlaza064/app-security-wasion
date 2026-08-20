<?php

namespace App\Filament\Resources\PatrolLogResource\Pages;

use App\Exports\PatrolLogsExport;
use App\Filament\Resources\PatrolLogResource;
use Filament\Actions;
use Filament\Forms;
use Filament\Resources\Pages\ListRecords;
use Maatwebsite\Excel\Facades\Excel;

class ListPatrolLogs extends ListRecords
{
    protected static string $resource = PatrolLogResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('exportExcel')
                ->label('Exportar Excel')
                ->icon('heroicon-o-arrow-down-tray')
                ->color('success')
                ->modalHeading('Exportar Rondines de Planta')
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
                    Forms\Components\Select::make('status')
                        ->label('Estado')
                        ->options([
                            'ok' => 'Normal (OK)',
                            'incident' => 'Incidencia',
                        ])
                        ->placeholder('Todos los estados'),
                ])
                ->action(function (array $data) {
                    $month = $data['month'] ?? null;
                    $plant = $data['plant'] ?? null;
                    $status = $data['status'] ?? null;

                    $filename = 'rondines_planta';
                    if ($month) $filename .= "_{$month}";
                    if ($plant) $filename .= '_' . str_replace(' ', '_', strtolower($plant));
                    if ($status) $filename .= "_{$status}";
                    $filename .= '.xlsx';

                    return Excel::download(
                        new PatrolLogsExport($month, $plant, $status),
                        $filename,
                    );
                }),
        ];
    }
}
