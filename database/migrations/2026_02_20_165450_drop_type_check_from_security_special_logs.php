<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (config('database.default') === 'pgsql') {
            \Illuminate\Support\Facades\DB::statement('ALTER TABLE security_special_logs DROP CONSTRAINT IF EXISTS security_special_logs_type_check');
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No revert needed as we want to keep it as string
    }
};
