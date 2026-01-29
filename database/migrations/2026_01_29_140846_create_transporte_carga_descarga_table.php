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
        Schema::create('transporte_carga_descarga', function (Blueprint $table) {
            $table->id();
            $table->date('fecha');
            $table->string('nombre_completo');
            $table->string('empresa');
            $table->text('carga')->nullable();
            $table->text('descarga')->nullable();
            $table->time('hora_llegada');
            $table->string('placas_tracto')->nullable();
            $table->string('placas_caja')->nullable();
            $table->string('destino')->nullable();
            $table->text('firma')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transporte_carga_descarga');
    }
};
