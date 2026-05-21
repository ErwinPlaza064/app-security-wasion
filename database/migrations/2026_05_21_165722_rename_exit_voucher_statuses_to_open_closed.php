<?php

use Illuminate\Database\Migrations\Migration;
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
        // Active / unresolved → open
        DB::table('exit_vouchers')
            ->where('status', 'pending')
            ->update(['status' => 'open']);

        // Resolved in any way → closed
        DB::table('exit_vouchers')
            ->whereIn('status', ['approved', 'rejected', 'completed'])
            ->update(['status' => 'closed']);
    }

    public function down(): void
    {
        //
    }
};
