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
        Schema::create('access_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('external_person_id')->nullable()->constrained('external_people')->onDelete('set null');
            $table->enum('type', ['visitor', 'supplier', 'contractor', 'laptop_only', 'employee_laptop']);
            $table->dateTime('entry_at');
            $table->dateTime('exit_at')->nullable();
            $table->string('item_brand')->nullable();
            $table->string('item_color')->nullable();
            $table->string('item_serial')->nullable();
            $table->text('notes')->nullable();
            $table->text('signature')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('access_logs');
    }
};
