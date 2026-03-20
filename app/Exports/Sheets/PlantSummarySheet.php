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

class PlantSummarySheet implements FromArray, WithHeadings, WithStyles, WithTitle, ShouldAutoSize
{
    private const BLUE = '0C1869';
    private const LIGHT_BLUE = 'E8E9F3';

    private const TYPES = [
        'visitor'         => 'Visitantes',
        'supplier'        => 'Proveedores',
        'contractor'      => 'Contratistas',
        'laptop_only'     => 'Solo Laptop',
        'employee_laptop' => 'Laptop Colab.',
        'resignation'     => 'Renuncias',
        'settlement'      => 'Finiquitos',
        'clearance'       => 'Pases de Salida',
        'no_badge'        => 'Sin Gafete',
    ];

    public function __construct(
        protected ?string $month = null,
        protected ?string $plant = null,
        protected ?string $type = null,
    ) {}

    public function title(): string
    {
        return 'Resumen por Planta';
    }

    public function headings(): array
    {
        $headings = ['Planta'];
        foreach (self::TYPES as $label) {
            $headings[] = $label;
        }
        $headings[] = 'Total';
        $headings[] = 'Con Salida';
        $headings[] = 'Sin Salida';

        return $headings;
    }

    public function array(): array
    {
        $query = AccessLog::query();

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
            'type',
            DB::raw('COUNT(*) as total'),
            DB::raw('COUNT(exit_at) as with_exit'),
            DB::raw('COUNT(*) - COUNT(exit_at) as without_exit'),
        )
            ->whereNotNull('plant')
            ->groupBy('plant', 'type')
            ->orderBy('plant')
            ->get();

        // Pivot
        $plants = [];
        foreach ($records as $record) {
            $p = $record->plant;
            if (!isset($plants[$p])) {
                $plants[$p] = [
                    'plant' => $p,
                    'types' => array_fill_keys(array_keys(self::TYPES), 0),
                    'total' => 0,
                    'with_exit' => 0,
                    'without_exit' => 0,
                ];
            }
            if (isset($plants[$p]['types'][$record->type])) {
                $plants[$p]['types'][$record->type] = $record->total;
            }
            $plants[$p]['total'] += $record->total;
            $plants[$p]['with_exit'] += $record->with_exit;
            $plants[$p]['without_exit'] += $record->without_exit;
        }

        $rows = [];
        $grandTotal = ['Grand Total', ...array_fill(0, count(self::TYPES), 0), 0, 0, 0];

        foreach ($plants as $data) {
            $row = [$data['plant']];
            $colIdx = 1;
            foreach (self::TYPES as $key => $_) {
                $row[] = $data['types'][$key];
                $grandTotal[$colIdx] += $data['types'][$key];
                $colIdx++;
            }
            $row[] = $data['total'];
            $row[] = $data['with_exit'];
            $row[] = $data['without_exit'];
            $grandTotal[$colIdx] += $data['total'];
            $grandTotal[$colIdx + 1] += $data['with_exit'];
            $grandTotal[$colIdx + 2] += $data['without_exit'];
            $rows[] = $row;
        }

        $rows[] = $grandTotal;

        return $rows;
    }

    public function styles(Worksheet $sheet): array
    {
        $lastRow = $sheet->getHighestRow();
        $lastCol = $sheet->getHighestColumn();

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
