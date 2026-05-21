<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Rename all legacy exit_vouchers status values to 'open' or 'closed'.
     *
     * Legacy values:
     *   pending   → open   (was waiting, still active)
     *   approved  → closed (was resolved as approved)
     *   rejected  → closed (was resolved as rejected)
     *   completed → closed (was completed/delivered)
     */
    public function up(): void
    {
        // First drop the old CHECK constraint if it exists (for PostgreSQL)
        DB::statement('ALTER TABLE exit_vouchers DROP CONSTRAINT IF EXISTS exit_vouchers_status_check');

        // Active / unresolved → open
        DB::table('exit_vouchers')
            ->where('status', 'pending')
            ->update(['status' => 'open']);

        // Resolved in any way → closed
        DB::table('exit_vouchers')
            ->whereIn('status', ['approved', 'rejected', 'completed'])
            ->update(['status' => 'closed']);

        // Modify the column type to string (varchar) to prevent constraint issues
        Schema::table('exit_vouchers', function (Blueprint $table) {
            $table->string('status')->default('open')->change();
        });
    }

    public function down(): void
    {
        Schema::table('exit_vouchers', function (Blueprint $table) {
            $table->enum('status', ['pending', 'approved', 'rejected', 'completed'])->default('pending')->change();
        });
    }
};
