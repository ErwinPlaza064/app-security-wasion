<?php

namespace App\Exports;

use App\Models\ExitVoucher;
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

class ExitVouchersExport implements FromQuery, WithHeadings, WithMapping, WithStyles, WithTitle, ShouldAutoSize
{
    private const BLUE = '0C1869';
    private const LIGHT_BLUE = 'E8E9F3';

    private const CONCEPT_LABELS = [
        'loan' => 'Préstamo',
        'sample' => 'Muestra',
        'repair' => 'Reparación',
        'others' => 'Otros',
    ];

    public function __construct(
        protected ?string $month = null,
        protected ?string $plant = null,
        protected ?string $status = null,
        protected ?string $concept = null,
    ) {}

    public function title(): string
    {
        return 'Vales de Salida';
    }

    public function query()
    {
        $query = ExitVoucher::query()
            ->with(['user', 'closedBy', 'items']);

        if ($this->month) {
            $parts = explode('-', $this->month);
            if (count($parts) === 2) {
                $query->whereYear('voucher_date', $parts[0])
                    ->whereMonth('voucher_date', $parts[1]);
            }
        }

        if ($this->plant) {
            $query->where('plant', $this->plant);
        }

        if ($this->status) {
            $query->where('status', $this->status);
        }

        if ($this->concept) {
            $query->where('concept', $this->concept);
        }

        return $query->orderBy('created_at', 'desc');
    }

    public function headings(): array
    {
        return [
            'ID',
            'Folio',
            'Solicitante',
            'Referencia',
            'Concepto / Motivo',
            'Detalle Motivo',
            '¿Activo Fijo?',
            'Planta',
            'Estado',
            'Fecha del Vale',
            'Fecha Salida',
            'Fecha Estimada Retorno',
            'Fecha Real Retorno',
            'Artículos / Materiales',
            'Registrado Por',
            'Cerrado Por',
            'Fecha Registro',
        ];
    }

    public function map($voucher): array
    {
        $itemsSummary = $voucher->items->map(function ($item) {
            $unit = $item->unit ? " {$item->unit}" : '';
            return "{$item->quantity}{$unit} - {$item->description}";
        })->implode(' | ');

        return [
            $voucher->id,
            $voucher->folio,
            $voucher->recipient_name,
            $voucher->reference_number ?? '',
            self::CONCEPT_LABELS[$voucher->concept] ?? $voucher->concept,
            $voucher->other_concept_details ?? '',
            $voucher->is_fixed_asset ? 'SÍ' : 'NO',
            $voucher->plant ?? '---',
            $voucher->status === 'closed' ? 'CERRADO' : 'ABIERTO',
            $voucher->voucher_date?->format('d/m/Y') ?? '---',
            $voucher->exit_date?->format('d/m/Y') ?? '---',
            $voucher->return_date?->format('d/m/Y') ?? 'No Aplica',
            $voucher->actual_return_date?->format('d/m/Y H:i') ?? 'Pendiente',
            $itemsSummary ?: 'Sin artículos especificados',
            $voucher->user?->name ?? '---',
            $voucher->closedBy?->name ?? ($voucher->status === 'closed' ? 'Cerrado' : 'Aún activo'),
            $voucher->created_at?->format('d/m/Y H:i') ?? '---',
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        $lastRow = max($sheet->getHighestRow(), 1);
        $lastCol = 'Q';

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
