<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Vacancy;
use App\Models\Application;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Disable foreign key checks for truncation
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Application::truncate();
        Vacancy::truncate();
        // User::truncate(); // We keep users to avoid losing login
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Admin user
        User::updateOrCreate(
            ['email' => 'admin@amt.com'],
            [
                'name' => 'AMT Admin',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );

        // Staff user
        User::updateOrCreate(
            ['email' => 'staff@amt.com'],
            [
                'name' => 'HR Staff',
                'password' => Hash::make('password'),
                'role' => 'staff',
            ]
        );

        // Run Vacancy Seeder
        $this->call(VacancySeeder::class);

        // Run Application Seeder
        $this->call(ApplicationSeeder::class);

        // Run Company Info Seeder
        $this->call(CompanyInfoSeeder::class);
    }
}
