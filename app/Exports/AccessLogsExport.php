<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class AccessLogsExport implements WithMultipleSheets
{
    public function __construct(
        protected ?string $month = null,
        protected ?string $plant = null,
        protected ?string $type = null,
    ) {}

    public function sheets(): array
    {
        return [
            'Detalle' => new Sheets\DetailSheet($this->month, $this->plant, $this->type),
            'Resumen por Mes' => new Sheets\MonthlySummarySheet($this->month, $this->plant, $this->type),
            'Resumen por Planta' => new Sheets\PlantSummarySheet($this->month, $this->plant, $this->type),
            'Ingresos por Planta' => new Sheets\PlantEntriesSheet($this->month, $this->plant, $this->type),
        ];
    }
}
