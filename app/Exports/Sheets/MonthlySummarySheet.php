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
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use Illuminate\Support\Facades\DB;

class MonthlySummarySheet implements FromArray, WithHeadings, WithStyles, WithTitle, ShouldAutoSize
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
        return 'Resumen por Mes';
    }

    public function headings(): array
    {
        $headings = ['Mes'];
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

        // Group by month
        $records = $query->select(
            DB::raw("TO_CHAR(entry_at, 'YYYY-MM') as month"),
            'type',
            DB::raw('COUNT(*) as total'),
            DB::raw('COUNT(exit_at) as with_exit'),
            DB::raw('COUNT(*) - COUNT(exit_at) as without_exit'),
        )
            ->groupBy(DB::raw("TO_CHAR(entry_at, 'YYYY-MM')"), 'type')
            ->orderBy(DB::raw("TO_CHAR(entry_at, 'YYYY-MM')"))
            ->get();

        // Pivot the data
        $months = [];
        foreach ($records as $record) {
            $m = $record->month;
            if (!isset($months[$m])) {
                $months[$m] = [
                    'month' => $m,
                    'types' => array_fill_keys(array_keys(self::TYPES), 0),
                    'total' => 0,
                    'with_exit' => 0,
                    'without_exit' => 0,
                ];
            }
            if (isset($months[$m]['types'][$record->type])) {
                $months[$m]['types'][$record->type] = $record->total;
            }
            $months[$m]['total'] += $record->total;
            $months[$m]['with_exit'] += $record->with_exit;
            $months[$m]['without_exit'] += $record->without_exit;
        }

        // Build rows
        $rows = [];
        $grandTotal = ['Grand Total', ...array_fill(0, count(self::TYPES), 0), 0, 0, 0];

        foreach ($months as $data) {
            $row = [$this->formatMonth($data['month'])];
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

        // Add grand total row
        $rows[] = $grandTotal;

        return $rows;
    }

    private function formatMonth(string $yearMonth): string
    {
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

        $parts = explode('-', $yearMonth);
        return ($monthNames[$parts[1]] ?? $parts[1]) . ' ' . $parts[0];
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

        // Grand total row (last row)
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
