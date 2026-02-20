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
        Schema::table('security_special_logs', function (Blueprint $table) {
            $table->string('type')->change(); // Transform to string first to allow any value if enum is restricted
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('security_special_logs', function (Blueprint $table) {
            // Reverting to the original enum is complex in some DBs, 
            // but keeping it as string is safer for now.
        });
    }
};
