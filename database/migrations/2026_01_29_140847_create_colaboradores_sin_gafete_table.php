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
        Schema::create('colaboradores_sin_gafete', function (Blueprint $table) {
            $table->id();
            $table->date('fecha');
            $table->string('no_nomina');
            $table->string('nombre');
            $table->string('empresa');
            $table->string('area');
            $table->text('motivo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('colaboradores_sin_gafete');
    }
};
