<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Vacancy;

class VacancySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Application::query()->delete();
        Vacancy::query()->delete();

        $vacancies = [
            [
                'title' => 'Senior Frontend Developer (React/Next.js)',
                'description' => '<p>Chúng tôi đang tìm kiếm một Senior Frontend Developer có kinh nghiệm lập trình React. Dự án sử dụng phong cách Glassmorphism và yêu cầu sự chỉnh chu về UI/UX.</p>',
                'location' => 'Hà Nội / Remote',
                'salary' => '25M - 45M',
                'type' => 'Full-time',
                'is_active' => true,
            ],
            [
                'title' => 'Backend Developer (Laravel/PHP)',
                'description' => '<p>Tham gia xây dựng hệ thống lõi cho cổng thông tin AMT. Yêu cầu kiến thức vững về PHP và Laravel 11+.</p>',
                'location' => 'TP. Hồ Chí Minh',
                'salary' => '20M - 40M',
                'type' => 'Full-time',
                'is_active' => true,
            ],
            [
                'title' => 'UI/UX Designer (High-end UI)',
                'description' => '<p>Thiết kế các giao diện đẳng cấp, hiện đại đi đầu xu hướng. Phối hợp chặt chẽ với team dev để hiện thực hóa các ý tưởng.</p>',
                'location' => 'Hà Nội',
                'salary' => '15M - 30M',
                'type' => 'Remote',
                'is_active' => true,
            ],
            [
                'title' => 'Senior Product Manager',
                'description' => '<p>Định hướng sản phẩm và quản lý vòng đời phát triển sản phẩm từ ý tưởng đến khi ra mắt. Yêu cầu kinh nghiệm quản lý dự án Agile/Scrum.</p>',
                'location' => 'Hà Nội',
                'salary' => '40M - 60M',
                'type' => 'Full-time',
                'is_active' => true,
            ],
            [
                'title' => 'Digital Marketing Specialist',
                'description' => '<p>Lập kế hoạch và triển khai các chiến dịch Marketing trên các kênh Digital (Google, Facebook, LinkedIn). Tối ưu hóa chuyển đổi và đo lường hiệu quả.</p>',
                'location' => 'TP. Hồ Chí Minh / Remote',
                'salary' => '12M - 25M',
                'type' => 'Full-time',
                'is_active' => true,
            ],
            [
                'title' => 'Sales Executive (Enterprise)',
                'description' => '<p>Tìm kiếm và khai thác các khách hàng doanh nghiệp lớn. Xây dựng mối quan hệ và tư vấn các giải pháp công nghệ của AMT.</p>',
                'location' => 'Toàn quốc',
                'salary' => '10M + Commision',
                'type' => 'Remote',
                'is_active' => true,
            ],
            [
                'title' => 'DevOps Engineer (AWS/Docker)',
                'description' => '<p>Quản lý hạ tầng cloud, triển khai CI/CD và đảm bảo tính ổn định, bảo mật cho hệ thống. Yêu cầu kinh nghiệm với AWS, Kubernetes, Docker.</p>',
                'location' => 'Hà Nội',
                'salary' => '30M - 50M',
                'type' => 'Full-time',
                'is_active' => true,
            ],
            [
                'title' => 'HR Business Partner',
                'description' => '<p>Tư vấn và thực thi các chiến lược nhân sự cho các phòng ban. Quản lý quan hệ lao động và phát triển văn hóa doanh nghiệp.</p>',
                'location' => 'Hà Nội',
                'salary' => '18M - 28M',
                'type' => 'Full-time',
                'is_active' => true,
            ],
            [
                'title' => 'QA Automation Engineer',
                'description' => '<p>Xây dựng kịch bản và thực hiện kiểm thử tự động cho hệ thống. Đảm bảo chất lượng phần mềm trước khi release.</p>',
                'location' => 'TP. Hồ Chí Minh',
                'salary' => '20M - 35M',
                'type' => 'Full-time',
                'is_active' => true,
            ],
            [
                'title' => 'Customer Success Lead',
                'description' => '<p>Đảm bảo khách hàng hài lòng và sử dụng sản phẩm hiệu quả. Giải quyết các thắc mắc và hỗ trợ khách hàng trong quá trình vận hành.</p>',
                'location' => 'Remote',
                'salary' => '15M - 25M',
                'type' => 'Part-time',
                'is_active' => true,
            ],
        ];

        foreach ($vacancies as $v) {
            Vacancy::create($v);
        }
    }
}
