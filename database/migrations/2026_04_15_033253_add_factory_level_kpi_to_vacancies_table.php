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
        Schema::table('vacancies', function (Blueprint $table) {
            $table->string('factory')->nullable(); // Cradle, Buds, Watch
            $table->string('level')->nullable();   // Engineer, Worker, QC
            $table->string('kpi_target')->nullable(); // e.g. Upper 50 sp/h
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vacancies', function (Blueprint $table) {
            $table->dropColumn(['factory', 'level', 'kpi_target']);
        });
    }
};
