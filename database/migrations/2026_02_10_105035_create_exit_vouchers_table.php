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
        Schema::create('exit_vouchers', function (Blueprint $table) {
            $table->id();
            $table->string('folio')->unique();
            $table->string('recipient_name'); // A nombre de
            $table->string('reference_number')->nullable();
            $table->boolean('is_fixed_asset')->default(false);
            $table->date('voucher_date');

            // Concepto
            $table->enum('concept', ['loan', 'sample', 'repair', 'others'])->default('others');
            $table->string('other_concept_details')->nullable();

            // Fechas
            $table->date('exit_date');
            $table->date('return_date')->nullable(); // N/A en la imagen

            // Usuarios y Firmas (Relaciones)
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Solicitante (usuario logueado)

            // Estados de aprobación
            $table->timestamp('approved_by_head_at')->nullable();
            $table->timestamp('approved_by_area_at')->nullable();
            $table->timestamp('approved_by_finance_at')->nullable();
            $table->timestamp('approved_by_general_at')->nullable();
            $table->timestamp('received_by_security_at')->nullable(); // Seguridad Patrimonial

            $table->enum('status', ['pending', 'approved', 'rejected', 'completed'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exit_vouchers');
    }
};
