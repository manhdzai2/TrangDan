<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Vacancy;
use App\Models\Application;
use Illuminate\Support\Carbon;

class ApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Application::truncate();
        
        $vacancies = Vacancy::all();
        if ($vacancies->isEmpty()) return;

        $sources = ['LinkedIn', 'Facebook', 'Referral', 'Direct', 'Indeed', 'Google Jobs'];
        $statuses = ['pending', 'reviewed', 'accepted', 'rejected'];

        foreach ($vacancies as $vacancy) {
            // Seed 20-30 applications per vacancy
            $count = rand(25, 35);
            for ($i = 0; $i < $count; $i++) {
                Application::create([
                    'vacancy_id' => $vacancy->id,
                    'name' => fake()->name(),
                    'email' => fake()->unique()->safeEmail(),
                    'source' => collect($sources)->random(),
                    'status' => collect($statuses)->random(),
                    'created_at' => Carbon::now()->subDays(rand(0, 30)),
                ]);
            }
        }
    }
}
