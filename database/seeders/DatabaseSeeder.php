<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Vacancy;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
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

        // Sample Vacancies
        Vacancy::create([
            'title' => 'Senior Frontend Developer (React/Next.js)',
            'description' => '<p>Chúng tôi đang tìm kiếm một Senior Frontend Developer có kinh nghiệm lập trình React. Dự án sử dụng phong cách Glassmorphism và yêu cầu sự chỉnh chu về UI/UX.</p><ul><li>Kinh nghiệm ít nhất 3 năm với React.</li><li>Thành thạo TailwindCSS.</li><li>Có kinh nghiệm với Inertia.js là một lợi thế.</li></ul>',
            'location' => 'Hà Nội / Remote',
            'salary' => '25M - 45M',
            'type' => 'Full-time',
            'is_active' => true,
        ]);

        Vacancy::create([
            'title' => 'Backend Developer (Laravel/PHP)',
            'description' => '<p>Tham gia xây dựng hệ thống lõi cho cổng thông tin AMT. Yêu cầu kiến thức vững về PHP và Laravel 11+.</p><ul><li>Hiểu biết sâu về Eloquent, Service Pattern.</li><li>Kinh nghiệm làm việc với MySQL, Redis.</li></ul>',
            'location' => 'TP. Hồ Chí Minh',
            'salary' => '20M - 40M',
            'type' => 'Full-time',
            'is_active' => true,
        ]);

        Vacancy::create([
            'title' => 'UI/UX Designer',
            'description' => '<p>Thiết kế các giao diện đẳng cấp, hiện đại đi đầu xu hướng. Phối hợp chặt chẽ với team dev để hiện thực hóa các ý tưởng.</p>',
            'location' => 'Hà Nội',
            'salary' => 'Thỏa thuận',
            'type' => 'Remote',
            'is_active' => true,
        ]);
    }
}
