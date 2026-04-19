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
                'title' => 'Sản xuất và lắp ráp (Production & Assembly)',
                'description' => '<p>Tham gia trực tiếp vào dây chuyền sản xuất và lắp ráp các linh kiện điện tử, đảm bảo đúng quy trình và tiêu chuẩn kỹ thuật.</p>',
                'location' => 'Nhà máy Sản xuất',
                'salary' => '8M - 12M',
                'type' => 'Full-time',
                'is_active' => true,
            ],
            [
                'title' => 'Vận hành máy (Machine Operator)',
                'description' => '<p>Điều khiển và giám sát hoạt động của các hệ thống máy móc sản xuất, xử lý các sự cố cơ bản kịp thời.</p>',
                'location' => 'Nhà máy Sản xuất',
                'salary' => '8M - 11M',
                'type' => 'Full-time',
                'is_active' => true,
            ],
            [
                'title' => 'Kiểm tra Chất lượng (Quality Control - QC)',
                'description' => '<p>Kiểm tra chất lượng nguyên vật liệu đầu vào, giám sát quy trình và đánh giá chất lượng sản phẩm đầu ra theo tiêu chuẩn ISO.</p>',
                'location' => 'Nhà máy Sản xuất',
                'salary' => '9M - 12M',
                'type' => 'Full-time',
                'is_active' => true,
            ],
            [
                'title' => 'Kỹ thuật Hỗ trợ (Technical Support)',
                'description' => '<p>Hỗ trợ giải quyết các vấn đề kỹ thuật liên quan đến quy trình sản xuất, đề xuất giải pháp cải tiến hiệu suất công việc.</p>',
                'location' => 'Nhà máy Sản xuất',
                'salary' => '10M - 12M',
                'type' => 'Full-time',
                'is_active' => true,
            ],
            [
                'title' => 'Bảo trì (Maintenance Worker)',
                'description' => '<p>Bảo dưỡng và sửa chữa máy móc định kỳ, ngăn ngừa hỏng hóc và đảm bảo dây chuyền vận hành 24/7 không bị gián đoạn.</p>',
                'location' => 'Nhà máy Sản xuất',
                'salary' => '9M - 11M',
                'type' => 'Full-time',
                'is_active' => true,
            ],
            [
                'title' => 'Kho & Logistics (Warehouse)',
                'description' => '<p>Quản lý xuất nhập tồn kho, sắp xếp hàng hóa khoa học và phối hợp với các bộ phận vận tải để đảm bảo tiến độ giao hàng.</p>',
                'location' => 'Kho bãi',
                'salary' => '8M - 12M',
                'type' => 'Full-time',
                'is_active' => true,
            ],
            [
                'title' => 'Hoàn thiện & Đóng gói (Packaging)',
                'description' => '<p>Thực hiện các công đoạn hoàn thiện sản phẩm cuối cùng, đóng gói dán nhãn theo đúng quy cách để chuẩn bị lưu kho/xuất hàng.</p>',
                'location' => 'Nhà máy Sản xuất',
                'salary' => '7M - 11M',
                'type' => 'Full-time',
                'is_active' => true,
            ],
        ];

        foreach ($vacancies as $v) {
            Vacancy::create($v);
        }
    }
}
