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
        // No-op: status design changed from approved/rejected to open/closed
    }

    public function down(): void
    {
        //
    }
};
