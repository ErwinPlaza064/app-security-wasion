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
        Schema::create('contratistas', function (Blueprint $table) {
            $table->id();
            $table->date('fecha');
            $table->string('nombre_completo');
            $table->string('empresa');
            $table->string('persona_que_visita');
            $table->string('area_trabajo');
            $table->time('hora_entrada');
            $table->time('hora_salida')->nullable();
            $table->string('numero_gafete')->nullable();
            $table->string('marca_vehiculo')->nullable();
            $table->string('placas')->nullable();
            $table->text('firma')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contratistas');
    }
};
