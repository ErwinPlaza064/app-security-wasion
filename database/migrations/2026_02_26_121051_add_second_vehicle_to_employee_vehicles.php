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
            $table->string('vehicle_brand_2')->nullable()->after('vehicle_plates');
            $table->string('vehicle_model_2')->nullable()->after('vehicle_brand_2');
            $table->string('vehicle_plates_2')->nullable()->after('vehicle_model_2');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('employee_vehicles', function (Blueprint $table) {
            $table->dropColumn(['vehicle_brand_2', 'vehicle_model_2', 'vehicle_plates_2']);
        });
    }
};
