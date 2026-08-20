<?php

namespace App\Filament\Resources\SupplierMeetingResource\Pages;

use App\Exports\SupplierMeetingsExport;
use App\Filament\Resources\SupplierMeetingResource;
use App\Models\Company;
use Filament\Actions;
use Filament\Forms;
use Filament\Resources\Pages\ListRecords;
use Maatwebsite\Excel\Facades\Excel;

class ListSupplierMeetings extends ListRecords
{
    protected static string $resource = SupplierMeetingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
            Actions\Action::make('exportExcel')
                ->label('Exportar Excel')
                ->icon('heroicon-o-arrow-down-tray')
                ->color('success')
                ->modalHeading('Exportar Reuniones con Proveedores')
                ->modalDescription('Seleccione los filtros para el reporte. Deje en blanco para exportar todas las reuniones.')
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
                    Forms\Components\Select::make('company_id')
                        ->label('Proveedor')
                        ->options(fn () => Company::query()->orderBy('name')->pluck('name', 'id'))
                        ->searchable()
                        ->placeholder('Todos los proveedores'),
                ])
                ->action(function (array $data) {
                    $month = $data['month'] ?? null;
                    $plant = $data['plant'] ?? null;
                    $companyId = $data['company_id'] ?? null;

                    $filename = 'reuniones_proveedores';
                    if ($month) $filename .= "_{$month}";
                    if ($plant) $filename .= '_' . str_replace(' ', '_', strtolower($plant));
                    if ($companyId) {
                        $company = Company::find($companyId);
                        if ($company) {
                            $filename .= '_' . str_replace(' ', '_', strtolower($company->name));
                        }
                    }
                    $filename .= '.xlsx';

                    return Excel::download(
                        new SupplierMeetingsExport($month, $plant, $companyId),
                        $filename,
                    );
                }),
        ];
    }
}
