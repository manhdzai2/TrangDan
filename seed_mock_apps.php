<?php

use App\Models\Application;
use Illuminate\Support\Facades\DB;

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';

$kernel = $app->make(\Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$candidates = [
    [
        'vacancy_id' => 2, // Senior Frontend
        'name' => 'Alex Nguyen',
        'email' => 'alex.nguyen@example.com',
        'phone' => '0912345678',
        'address' => 'District 1, HCMC',
        'age' => 28,
        'source' => 'LinkedIn',
        'cv_path' => 'cvs/alex_frontend.pdf', // Mock path
        'cover_letter' => "Tôi là Alex Nguyen, một Senior Frontend Developer với hơn 6 năm kinh nghiệm thực chiến. Kỹ năng cốt lõi của tôi bao gồm React, Next.js 14, và Framer Motion. Tôi đã từng dẫn dắt đội ngũ xây dựng các dashboard tài chính phức tạp với giao diện Glassmorphism và tối ưu hóa hiệu năng render lên đến 40%. Tôi rất ấn tượng với định hướng công nghệ tại Almus Tech và tin rằng mình là một mảnh ghép hoàn hảo cho vị trí này.",
        'status' => 'pending'
    ],
    [
        'vacancy_id' => 7, // DevOps
        'name' => 'Sarah Chen',
        'email' => 'sarah.chen@tech.com',
        'phone' => '0987654321',
        'address' => 'Cau Giay, Hanoi',
        'age' => 30,
        'source' => 'TopCV',
        'cv_path' => 'cvs/sarah_devops.pdf',
        'cover_letter' => "Tôi là Sarah Chen, chuyên gia Cloud/DevOps với 5 năm kinh nghiệm quản lý hạ tầng AWS. Tôi thông thạo Kubernetes, Docker và Terraform. Tôi đã thiết lấp các đường ống CI/CD tự động giúp giảm thời gian triển khai từ 2 giờ xuống còn 10 phút. Tôi cam kết mang lại sự ổn định và khả năng mở rộng tối đa cho hệ thống của Almus Tech.",
        'status' => 'pending'
    ],
    [
        'vacancy_id' => 9, // QA
        'name' => 'David Miller',
        'email' => 'david.m@quality.io',
        'phone' => '0933445566',
        'address' => 'Da Nang City',
        'age' => 27,
        'source' => 'Direct',
        'cv_path' => 'cvs/david_qa.pdf',
        'cover_letter' => "Với 4 năm chuyên sâu về QA Automation, tôi - David Miller - tự tin có thể nâng cao chất lượng sản phẩm của bạn. Tôi sử dụng thành thạo Playwright và Selenium để xây dựng các bộ test E2E toàn diện. Tôi có kinh nghiệm tích hợp kiểm thử tự động vào quy trình Jenkins và chuyên sâu về kiểm thử API Backend.",
        'status' => 'pending'
    ]
];

foreach ($candidates as $c) {
    DB::table('applications')->insert(array_merge($c, [
        'created_at' => now(),
        'updated_at' => now(),
        'is_read' => 0
    ]));
    echo "Inserted: " . $c['name'] . "\n";
}
