<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('employee_vehicles', function (Blueprint $table) {
            $table->dropUnique(['marbete_number']);
        });
    }

    public function down(): void
    {
        Schema::table('employee_vehicles', function (Blueprint $table) {
            $table->unique('marbete_number');
        });
    }
};
