<?php

namespace App\Exports\Sheets;

use App\Models\AccessLog;
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

class DetailSheet implements FromQuery, WithHeadings, WithMapping, WithStyles, WithTitle, ShouldAutoSize
{
    private const BLUE = '0C1869';
    private const LIGHT_BLUE = 'E8E9F3';

    private const TYPE_LABELS = [
        'visitor'         => 'Visitante',
        'supplier'        => 'Proveedor',
        'contractor'      => 'Contratista',
        'laptop_only'     => 'Solo Laptop',
        'employee_laptop' => 'Laptop Colaborador',
        'resignation'     => 'Renuncia',
        'clearance'       => 'Finiquito',
        'no_badge'        => 'Sin Gafete',
    ];

    public function __construct(
        protected ?string $month = null,
        protected ?string $plant = null,
        protected ?string $type = null,
    ) {}

    public function title(): string
    {
        return 'Detalle';
    }

    public function query()
    {
        $query = AccessLog::query()
            ->with(['externalPerson.company', 'user']);

        if ($this->month) {
            $query->whereRaw("TO_CHAR(entry_at, 'YYYY-MM') = ?", [$this->month]);
        }

        if ($this->plant) {
            $query->where('plant', $this->plant);
        }

        if ($this->type) {
            $query->where('type', $this->type);
        }

        return $query->orderBy('entry_at', 'desc');
    }

    public function headings(): array
    {
        return [
            'ID',
            'Nombre Completo',
            'Empresa',
            'Tipo de Acceso',
            'Planta',
            'Persona que Visita',
            'Motivo de Visita',
            'Área de Trabajo',
            'Fecha/Hora Entrada',
            'Fecha/Hora Salida',
            'Estado',
            'Marca Vehículo',
            'Placas',
            'Marca Equipo',
            'Color Equipo',
            'Serial Equipo',
            'Notas',
            'Registró',
        ];
    }

    public function map($log): array
    {
        return [
            $log->id,
            $log->externalPerson?->full_name ?? $log->visiting_person ?? '---',
            $log->externalPerson?->company?->name ?? (in_array($log->type, ['resignation', 'clearance', 'no_badge']) ? 'INTERNO' : '---'),
            self::TYPE_LABELS[$log->type] ?? $log->type,
            $log->plant ?? '---',
            $log->visiting_person ?? '---',
            $log->visit_reason ?? '---',
            $log->work_area ?? '---',
            $log->entry_at?->format('d/m/Y H:i'),
            $log->exit_at?->format('d/m/Y H:i') ?? 'Pendiente',
            $log->exit_at ? 'Completado' : 'En planta',
            $log->vehicle_brand ?? '',
            $log->vehicle_plate ?? '',
            $log->item_brand ?? '',
            $log->item_color ?? '',
            $log->item_serial ?? '',
            $log->notes ?? '',
            $log->user?->name ?? '---',
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        $lastRow = $sheet->getHighestRow();
        $lastCol = 'R';

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
