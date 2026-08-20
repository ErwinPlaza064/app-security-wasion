<?php

namespace App\Exports;

use App\Models\EmployeeVehicle;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;

class EmployeeVehiclesExport implements FromQuery, WithHeadings, WithMapping, WithStyles, WithTitle, ShouldAutoSize
{
    private const BLUE = '0C1869';
    private const LIGHT_BLUE = 'E8E9F3';

    public function __construct(
        protected ?string $plant = null,
        protected ?string $validity_status = null,
        protected ?string $is_multi_plant = null,
    ) {}

    public function title(): string
    {
        return 'Padrón Vehicular';
    }

    public function query()
    {
        $query = EmployeeVehicle::query()
            ->with(['user']);

        if ($this->plant) {
            $query->where('plant', $this->plant);
        }

        if ($this->validity_status) {
            $query->where('validity_status', $this->validity_status);
        }

        if ($this->is_multi_plant !== null && $this->is_multi_plant !== '') {
            $query->where('is_multi_plant', (bool)$this->is_multi_plant);
        }

        return $query->orderBy('created_at', 'desc');
    }

    public function headings(): array
    {
        return [
            'ID',
            'No. Marbete',
            'Colaborador',
            'Área',
            'Planta Base',
            '¿Multi-Planta?',
            'Plantas Adicionales',
            'Marca Vehículo 1',
            'Submarca Vehículo 1',
            'Placas Vehículo 1',
            'Marca Vehículo 2',
            'Submarca Vehículo 2',
            'Placas Vehículo 2',
            'Estatus Documentación',
            'Licencia',
            'Venc. Licencia',
            'Tarjeta Circulación',
            'Seguro',
            'Venc. Seguro',
            'Registrado Por',
            'Fecha Registro',
        ];
    }

    public function map($vehicle): array
    {
        $additionalPlants = is_array($vehicle->additional_plants) ? implode(', ', $vehicle->additional_plants) : ($vehicle->additional_plants ?? '');

        // Computed status based on dates
        $status = $vehicle->validity_status;
        if (empty($vehicle->driver_license_expires_at) && empty($vehicle->insurance_expires_at)) {
            $status = 'Pendiente';
        } else {
            $isLicenseExpired = $vehicle->driver_license_expires_at && $vehicle->driver_license_expires_at->startOfDay()->isBefore(now()->startOfDay());
            $isInsuranceExpired = $vehicle->insurance_expires_at && $vehicle->insurance_expires_at->startOfDay()->isBefore(now()->startOfDay());
            if ($isLicenseExpired || $isInsuranceExpired) {
                $status = 'Expirado';
            }
        }

        return [
            $vehicle->id,
            $vehicle->marbete_number,
            $vehicle->employee_name,
            $vehicle->area,
            $vehicle->plant ?? '---',
            $vehicle->is_multi_plant ? 'SÍ' : 'NO',
            $additionalPlants ?: 'N/A',
            $vehicle->vehicle_brand ?? '',
            $vehicle->vehicle_model ?? '',
            $vehicle->vehicle_plates ?? '',
            $vehicle->vehicle_brand_2 ?? '',
            $vehicle->vehicle_model_2 ?? '',
            $vehicle->vehicle_plates_2 ?? '',
            $status,
            $vehicle->has_driver_license ? 'SÍ' : 'NO',
            $vehicle->driver_license_expires_at ? $vehicle->driver_license_expires_at->format('d/m/Y') : 'N/A',
            $vehicle->has_circulation_card ? 'SÍ' : 'NO',
            $vehicle->has_insurance ? 'SÍ' : 'NO',
            $vehicle->insurance_expires_at ? $vehicle->insurance_expires_at->format('d/m/Y') : 'N/A',
            $vehicle->user?->name ?? '---',
            $vehicle->created_at?->format('d/m/Y H:i') ?? '---',
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        $lastRow = max($sheet->getHighestRow(), 1);
        $lastCol = 'U';

        // Header row styles
        $sheet->getStyle("A1:{$lastCol}1")->applyFromArray([
            'font' => [
                'bold' => true,
                'color' => ['rgb' => 'FFFFFF'],
                'size' => 11,
            ],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => self::BLUE],
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
            ],
        ]);

        // Alternate row colors for readability
        for ($row = 2; $row <= $lastRow; $row++) {
            if ($row % 2 === 0) {
                $sheet->getStyle("A{$row}:{$lastCol}{$row}")->applyFromArray([
                    'fill' => [
                        'fillType' => Fill::FILL_SOLID,
                        'startColor' => ['rgb' => self::LIGHT_BLUE],
                    ],
                ]);
            }
        }

        // Borders for all data
        $sheet->getStyle("A1:{$lastCol}{$lastRow}")->applyFromArray([
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => 'CCCCCC'],
                ],
            ],
        ]);

        // Freeze header row
        $sheet->freezePane('A2');

        // Set row height for header
        $sheet->getRowDimension(1)->setRowHeight(25);

        return [];
    }
}
