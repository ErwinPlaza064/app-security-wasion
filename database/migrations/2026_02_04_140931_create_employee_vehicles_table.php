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
        Schema::create('employee_vehicles', function (Blueprint $table) {
            $table->id();
            $table->string('marbete_number')->unique();
            $table->string('employee_name');
            $table->string('area');
            $table->string('vehicle_brand');
            $table->string('vehicle_model'); // Submarca
            $table->string('vehicle_plates');
            $table->text('documentation_status')->nullable();
            $table->string('plant')->nullable();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Quien lo registró
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_vehicles');
    }
};
