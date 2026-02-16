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
        // En PostgreSQL, cambiar de enum a string no siempre elimina la restricción CHECK.
        // La eliminamos manualmente para permitir nuevos tipos.
        if (config('database.default') === 'pgsql') {
            DB::statement('ALTER TABLE access_logs DROP CONSTRAINT IF EXISTS access_logs_type_check');
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No es necesario restaurarla en este punto, ya que el tipo ahora es string.
    }
};
