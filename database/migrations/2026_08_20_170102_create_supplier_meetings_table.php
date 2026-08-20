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
        Schema::create('supplier_meetings', function (Blueprint $table) {
            $table->id();
            $table->date('meeting_date');
            $table->string('meeting_time', 20);
            $table->foreignId('company_id')->nullable()->constrained('companies')->nullOnDelete();
            $table->string('company_name')->nullable();
            $table->string('plant', 50);
            $table->string('subject')->nullable();
            $table->text('attendees')->nullable();
            $table->longText('minutes');
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('supplier_meetings');
    }
};
