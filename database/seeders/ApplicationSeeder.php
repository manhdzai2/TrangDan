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
        // Don't truncate here if we call it from DatabaseSeeder which might have cleaned up
        
        $vacancies = Vacancy::all();
        if ($vacancies->isEmpty()) return;

        $sources = ['Facebook', 'Zalo', 'Người quen giới thiệu', 'Trực tiếp tại cổng', 'TopCV', 'TikTok', 'Trang tuyển dụng công ty'];
        $statuses = ['pending', 'reviewed', 'accepted', 'rejected'];

        foreach ($vacancies as $vacancy) {
            // Seed 15-25 applications per vacancy
            $count = rand(15, 25);
            for ($i = 0; $i < $count; $i++) {
                // Random date within the last 730 days (2 years)
                $createdAt = Carbon::now()->subDays(rand(0, 730));
                
                Application::create([
                    'vacancy_id' => $vacancy->id,
                    'name' => fake()->name(),
                    'email' => fake()->unique()->safeEmail(),
                    'source' => collect($sources)->random(),
                    'status' => collect($statuses)->random(),
                    'created_at' => $createdAt,
                    'updated_at' => $createdAt->copy()->addDays(rand(1, 14)),
                ]);
            }
        }
    }
}
