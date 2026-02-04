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
        Schema::table('access_logs', function (Blueprint $table) {
            $table->string('visiting_person')->nullable()->after('type');
            $table->string('work_area')->nullable()->after('visiting_person');
            $table->string('vehicle_brand')->nullable()->after('item_serial');
            $table->string('vehicle_plate')->nullable()->after('vehicle_brand');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('access_logs', function (Blueprint $table) {
            $table->dropColumn(['visiting_person', 'work_area', 'vehicle_brand', 'vehicle_plate']);
        });
    }
};
