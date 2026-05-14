<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Clean invalid id_number values that don't match valid ID types.
     * Valid types: INE, LICENCIA DE CONDUCIR, CARTILLA MILITAR, PASAPORTE, CÉDULA PROFESIONAL, GAFETE
     */
    public function up(): void
    {
        $validTypes = [
            'INE',
            'LICENCIA DE CONDUCIR',
            'CARTILLA MILITAR',
            'PASAPORTE',
            'CÉDULA PROFESIONAL',
            'GAFETE',
        ];

        // Set any invalid id_number to 'INE' as default
        DB::table('external_people')
            ->whereNotNull('id_number')
            ->where('id_number', '!=', '')
            ->whereNotIn('id_number', $validTypes)
            ->update(['id_number' => 'INE']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
