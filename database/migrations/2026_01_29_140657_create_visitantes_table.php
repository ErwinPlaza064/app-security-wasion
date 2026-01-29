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
        Schema::create('visitantes', function (Blueprint $table) {
            $table->id();
            $table->date('fecha');
            $table->string('nombre_completo');
            $table->string('empresa');
            $table->string('marca')->nullable();
            $table->string('color')->nullable();
            $table->string('numero_serie')->nullable();
            $table->time('hora_entrada');
            $table->time('hora_salida')->nullable();
            $table->text('firma')->nullable(); // Assuming signature path or data
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visitantes');
    }
};
