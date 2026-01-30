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
        Schema::create('incidents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Who reports
            $table->string('category'); // e.g., Conductual, Daño, etc.
            $table->text('description');
            $table->string('location');
            $table->dateTime('happened_at');
            $table->string('involved_person')->nullable();
            $table->enum('status', ['open', 'in_investigation', 'closed'])->default('open');
            $table->text('resolution_notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incidents');
    }
};
