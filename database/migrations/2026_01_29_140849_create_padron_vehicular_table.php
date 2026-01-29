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
        Schema::create('padron_vehicular', function (Blueprint $table) {
            $table->id();
            $table->string('no_marbete');
            $table->string('nombre_colaborador');
            $table->string('area');
            $table->string('marca');
            $table->string('submarca');
            $table->string('placas');
            $table->text('documentacion')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('padron_vehicular');
    }
};
