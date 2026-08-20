<?php

namespace App\Filament\Resources\EmployeeVehicleResource\Pages;

use App\Exports\EmployeeVehiclesExport;
use App\Filament\Resources\EmployeeVehicleResource;
use Filament\Actions;
use Filament\Forms;
use Filament\Resources\Pages\ListRecords;
use Maatwebsite\Excel\Facades\Excel;

class ListEmployeeVehicles extends ListRecords
{
    protected static string $resource = EmployeeVehicleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
            Actions\Action::make('exportExcel')
                ->label('Exportar Excel')
                ->icon('heroicon-o-arrow-down-tray')
                ->color('success')
                ->modalHeading('Exportar Padrón Vehicular')
                ->modalDescription('Seleccione los filtros para el reporte. Deje en blanco para exportar todos los vehículos.')
                ->modalSubmitActionLabel('Descargar Excel')
                ->modalIcon('heroicon-o-arrow-down-tray')
                ->form([
                    Forms\Components\Select::make('plant')
                        ->label('Planta Base')
                        ->options([
                            'Planta 1' => 'Planta 1',
                            'Planta 2' => 'Planta 2',
                            'Planta 3' => 'Planta 3',
                            'Planta 4' => 'Planta 4',
                            'Planta 5' => 'Planta 5',
                        ])
                        ->placeholder('Todas las plantas'),
                    Forms\Components\Select::make('validity_status')
                        ->label('Estatus de Vigencia')
                        ->options([
                            'Vigente' => 'Vigente',
                            'Expirado' => 'Expirado',
                            'Pendiente' => 'Pendiente',
                        ])
                        ->placeholder('Todos los estatus'),
                    Forms\Components\Select::make('is_multi_plant')
                        ->label('Tipo de Asignación')
                        ->options([
                            '1' => 'Solo Multi-Planta',
                            '0' => 'Solo Planta Base',
                        ])
                        ->placeholder('Todos los vehículos'),
                ])
                ->action(function (array $data) {
                    $plant = $data['plant'] ?? null;
                    $validityStatus = $data['validity_status'] ?? null;
                    $isMultiPlant = $data['is_multi_plant'] ?? null;

                    $filename = 'padron_vehicular';
                    if ($plant) $filename .= '_' . str_replace(' ', '_', strtolower($plant));
                    if ($validityStatus) $filename .= '_' . strtolower($validityStatus);
                    if ($isMultiPlant === '1') $filename .= '_multi_planta';
                    $filename .= '.xlsx';

                    return Excel::download(
                        new EmployeeVehiclesExport($plant, $validityStatus, $isMultiPlant),
                        $filename,
                    );
                }),
        ];
    }
}
