<?php

namespace App\Exports;

use App\Models\SupplierMeeting;
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

class SupplierMeetingsExport implements FromQuery, WithHeadings, WithMapping, WithStyles, WithTitle, ShouldAutoSize
{
    private const BLUE = '0C1869';
    private const LIGHT_BLUE = 'E8E9F3';

    public function __construct(
        protected ?string $month = null,
        protected ?string $plant = null,
        protected ?string $company_id = null,
    ) {}

    public function title(): string
    {
        return 'Reuniones con Proveedores';
    }

    public function query()
    {
        $query = SupplierMeeting::query()
            ->with(['company', 'user']);

        if ($this->month) {
            $parts = explode('-', $this->month);
            if (count($parts) === 2) {
                $query->whereYear('meeting_date', $parts[0])
                    ->whereMonth('meeting_date', $parts[1]);
            }
        }

        if ($this->plant) {
            $query->where('plant', $this->plant);
        }

        if ($this->company_id) {
            $query->where('company_id', $this->company_id);
        }

        return $query->orderBy('meeting_date', 'desc')->orderBy('meeting_time', 'desc');
    }

    public function headings(): array
    {
        return [
            'ID',
            'Fecha',
            'Hora',
            'Proveedor',
            'Planta',
            'Asunto / Motivo',
            'Asistentes',
            'Minuta / Acuerdos',
            'Registrado Por',
            'Fecha Registro',
        ];
    }

    public function map($meeting): array
    {
        // Strip tags if rich text was used
        $cleanMinutes = strip_tags($meeting->minutes ?? '');

        return [
            $meeting->id,
            $meeting->meeting_date?->format('d/m/Y') ?? '---',
            $meeting->meeting_time ?? '---',
            $meeting->supplier_name,
            $meeting->plant ?? '---',
            $meeting->subject ?: 'Sin asunto especificado',
            $meeting->attendees ?: '---',
            $cleanMinutes ?: 'Sin minuta registrada',
            $meeting->user?->name ?? '---',
            $meeting->created_at?->format('d/m/Y H:i') ?? '---',
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        $lastRow = max($sheet->getHighestRow(), 1);
        $lastCol = 'J';

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
