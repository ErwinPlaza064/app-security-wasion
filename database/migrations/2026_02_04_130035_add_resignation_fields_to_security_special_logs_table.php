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
            $table->string('suspension_reason')->nullable()->after('position');
            $table->string('direct_supervisor')->nullable()->after('suspension_reason');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('security_special_logs', function (Blueprint $table) {
            $table->dropColumn(['suspension_reason', 'direct_supervisor']);
        });
    }
};
