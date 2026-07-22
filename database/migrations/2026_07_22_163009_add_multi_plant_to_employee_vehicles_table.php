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
            $table->boolean('is_multi_plant')->default(false)->after('plant');
            $table->json('additional_plants')->nullable()->after('is_multi_plant');
        });
    }

    public function down(): void
    {
        Schema::table('employee_vehicles', function (Blueprint $table) {
            $table->dropColumn(['is_multi_plant', 'additional_plants']);
        });
    }
};
