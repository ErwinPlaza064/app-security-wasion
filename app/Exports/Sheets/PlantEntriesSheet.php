<?php

namespace App\Exports\Sheets;

use App\Models\AccessLog;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use Illuminate\Support\Facades\DB;

class PlantEntriesSheet implements FromArray, WithHeadings, WithStyles, WithTitle, ShouldAutoSize
{
    private const BLUE = '0C1869';
    private const LIGHT_BLUE = 'E8E9F3';

    public function __construct(
        protected ?string $month = null,
        protected ?string $plant = null,
        protected ?string $type = null,
    ) {}

    public function title(): string
    {
        return 'Ingresos por Planta';
    }

    public function headings(): array
    {
        return [
            'Planta',
            'Mes',
            'Total Ingresos',
            'Total Salidas',
            'Actualmente en Planta',
        ];
    }

    public function array(): array
    {
        $query = AccessLog::query()->whereNotNull('plant');

        if ($this->month) {
            $query->whereRaw("TO_CHAR(entry_at, 'YYYY-MM') = ?", [$this->month]);
        }
        if ($this->plant) {
            $query->where('plant', $this->plant);
        }
        if ($this->type) {
            $query->where('type', $this->type);
        }

        $records = $query->select(
            'plant',
            DB::raw("TO_CHAR(entry_at, 'YYYY-MM') as month"),
            DB::raw('COUNT(*) as total_entries'),
            DB::raw('COUNT(exit_at) as total_exits'),
            DB::raw('COUNT(*) - COUNT(exit_at) as still_inside'),
        )
            ->groupBy('plant', DB::raw("TO_CHAR(entry_at, 'YYYY-MM')"))
            ->orderBy('plant')
            ->orderBy(DB::raw("TO_CHAR(entry_at, 'YYYY-MM')"))
            ->get();

        $rows = [];
        $grandEntries = 0;
        $grandExits = 0;
        $grandInside = 0;

        $monthNames = [
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

        foreach ($records as $record) {
            $parts = explode('-', $record->month);
            $monthLabel = ($monthNames[$parts[1]] ?? $parts[1]) . ' ' . $parts[0];

            $rows[] = [
                $record->plant,
                $monthLabel,
                $record->total_entries,
                $record->total_exits,
                $record->still_inside,
            ];

            $grandEntries += $record->total_entries;
            $grandExits += $record->total_exits;
            $grandInside += $record->still_inside;
        }

        // Grand total
        $rows[] = [
            'TOTAL GENERAL',
            '',
            $grandEntries,
            $grandExits,
            $grandInside,
        ];

        return $rows;
    }

    public function styles(Worksheet $sheet): array
    {
        $lastRow = $sheet->getHighestRow();
        $lastCol = 'E';

        // Header row
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

        // Grand total row
        $sheet->getStyle("A{$lastRow}:{$lastCol}{$lastRow}")->applyFromArray([
            'font' => [
                'bold' => true,
                'color' => ['rgb' => 'FFFFFF'],
                'size' => 11,
            ],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => self::BLUE],
            ],
        ]);

        // Alternating rows
        for ($row = 2; $row < $lastRow; $row++) {
            if ($row % 2 === 0) {
                $sheet->getStyle("A{$row}:{$lastCol}{$row}")->applyFromArray([
                    'fill' => [
                        'fillType' => Fill::FILL_SOLID,
                        'startColor' => ['rgb' => self::LIGHT_BLUE],
                    ],
                ]);
            }
        }

        // Borders
        $sheet->getStyle("A1:{$lastCol}{$lastRow}")->applyFromArray([
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => 'CCCCCC'],
                ],
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
            ],
        ]);

        $sheet->freezePane('A2');
        $sheet->getRowDimension(1)->setRowHeight(25);

        return [];
    }
}
