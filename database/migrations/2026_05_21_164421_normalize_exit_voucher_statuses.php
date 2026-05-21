<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Normalize exit_vouchers status to only allow 'approved' and 'rejected'.
     * - 'pending'   → 'approved' (was awaiting resolution, treat as approved)
     * - 'completed' → 'approved' (was closed/delivered, treat as approved)
     */
    public function up(): void
    {
        DB::table('exit_vouchers')
            ->whereIn('status', ['pending', 'completed'])
            ->update(['status' => 'approved']);
    }

    public function down(): void
    {
        //
    }
};
