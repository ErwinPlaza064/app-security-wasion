<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('external_people')
            ->whereIn(DB::raw('UPPER(TRIM(id_number))'), ['BOCA', 'TENGO', 'TENGO DE ENTRADA'])
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
