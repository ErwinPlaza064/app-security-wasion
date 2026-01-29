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
        Schema::create('incidencias_personal_externo', function (Blueprint $table) {
            $table->id();
            $table->string('no');
            $table->date('fecha');
            $table->string('tipo');
            $table->string('proveedor');
            $table->text('descripcion');
            $table->string('anfitrion');
            $table->text('correctiva')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incidencias_personal_externo');
    }
};
