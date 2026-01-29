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
        Schema::create('incidencias_conductuales', function (Blueprint $table) {
            $table->id();
            $table->text('que');
            $table->string('quien');
            $table->string('area');
            $table->string('donde');
            $table->dateTime('cuando');
            $table->text('como');
            $table->string('elabora');
            $table->string('recibe_laborales');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incidencias_conductuales');
    }
};
