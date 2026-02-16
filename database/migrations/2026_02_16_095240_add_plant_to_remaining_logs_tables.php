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
        Schema::table('vehicle_logs', function (Blueprint $table) {
            $table->string('plant')->nullable()->after('operation');
        });

        Schema::table('incidents', function (Blueprint $table) {
            $table->string('plant')->nullable()->after('involved_person');
        });

        Schema::table('security_special_logs', function (Blueprint $table) {
            $table->string('plant')->nullable()->after('position');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vehicle_logs', function (Blueprint $table) {
            $table->dropColumn('plant');
        });

        Schema::table('incidents', function (Blueprint $table) {
            $table->dropColumn('plant');
        });

        Schema::table('security_special_logs', function (Blueprint $table) {
            $table->dropColumn('plant');
        });
    }
};
