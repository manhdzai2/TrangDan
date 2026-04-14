<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Thêm trường cá nhân vào applications
        Schema::table('applications', function (Blueprint $table) {
            $table->string('phone')->nullable()->after('email');
            $table->string('address')->nullable()->after('phone');
            $table->unsignedTinyInteger('age')->nullable()->after('address');
            $table->string('applied_position')->nullable()->after('age');
            $table->date('start_date')->nullable()->after('applied_position');
        });

        // Thêm trường quy trình tuyển dụng vào vacancies
        Schema::table('vacancies', function (Blueprint $table) {
            $table->text('recruitment_process')->nullable()->after('description');
            $table->text('requirements')->nullable()->after('recruitment_process');
            $table->text('benefits')->nullable()->after('requirements');
        });
    }

    public function down(): void
    {
        Schema::table('applications', function (Blueprint $table) {
            $table->dropColumn(['phone', 'address', 'age', 'applied_position', 'start_date']);
        });

        Schema::table('vacancies', function (Blueprint $table) {
            $table->dropColumn(['recruitment_process', 'requirements', 'benefits']);
        });
    }
};
