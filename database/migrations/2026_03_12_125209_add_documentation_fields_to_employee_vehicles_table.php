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
        Schema::table('employee_vehicles', function (Blueprint $table) {
            $table->boolean('has_driver_license')->default(false)->after('validity_status');
            $table->date('driver_license_expires_at')->nullable()->after('has_driver_license');
            $table->boolean('has_circulation_card')->default(false)->after('driver_license_expires_at');
            $table->boolean('has_insurance')->default(false)->after('has_circulation_card');
            $table->date('insurance_expires_at')->nullable()->after('has_insurance');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('employee_vehicles', function (Blueprint $table) {
            $table->dropColumn([
                'has_driver_license',
                'driver_license_expires_at',
                'has_circulation_card',
                'has_insurance',
                'insurance_expires_at',
            ]);
        });
    }
};
