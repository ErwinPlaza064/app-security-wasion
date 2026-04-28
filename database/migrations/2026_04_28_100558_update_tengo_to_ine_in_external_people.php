<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('external_people')
            ->where('id_number', 'TENGO')
            ->orWhere('id_number', 'Tengo')
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
