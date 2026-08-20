<?php

namespace App\Exports;

use App\Models\PatrolLog;
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

class PatrolLogsExport implements FromQuery, WithHeadings, WithMapping, WithStyles, WithTitle, ShouldAutoSize
{
    private const BLUE = '0C1869';
    private const LIGHT_BLUE = 'E8E9F3';

    public function __construct(
        protected ?string $month = null,
        protected ?string $plant = null,
        protected ?string $status = null,
    ) {}

    public function title(): string
    {
        return 'Rondines de Planta';
    }

    public function query()
    {
        $query = PatrolLog::query()
            ->with(['user']);

        if ($this->month) {
            $parts = explode('-', $this->month);
            if (count($parts) === 2) {
                $query->whereYear('started_at', $parts[0])
                    ->whereMonth('started_at', $parts[1]);
            }
        }

        if ($this->plant) {
            $query->where('plant', $this->plant);
        }

        if ($this->status) {
            $query->where('status', $this->status);
        }

        return $query->orderBy('happened_at', 'desc')->orderBy('started_at', 'desc');
    }

    public function headings(): array
    {
        return [
            'ID',
            'Fecha',
            'Operador / Guardia',
            'Planta',
            'Área / Tipo',
            'Estado',
            'Hora Inicio',
            'Hora Fin',
            'Duración',
            'Hallazgos / Notas',
        ];
    }

    public function map($log): array
    {
        $cleanNotes = $log->notes ? trim(preg_replace('/Duración del recorrido:.*?\n*/i', '', $log->notes)) : '';

        return [
            $log->id,
            $log->happened_at?->format('d/m/Y') ?? $log->started_at?->format('d/m/Y') ?? '---',
            $log->user?->name ?? '---',
            $log->plant ?? '---',
            $log->area_name ?? 'General',
            $log->status === 'incident' ? 'INCIDENCIA' : 'NORMAL',
            $log->started_at?->format('H:i:s') ?? '---',
            $log->happened_at?->format('H:i:s') ?? '---',
            $log->duration ?? 'N/A',
            $cleanNotes ?: 'Sin hallazgos',
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
