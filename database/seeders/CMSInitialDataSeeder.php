<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\OQCStep;
use App\Models\QualityStandard;

class CMSInitialDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // OQC Steps
        $oqcSteps = [
            [
                'title' => 'Vật tư đầu vào',
                'description' => 'Kiểm tra và xác định chất lượng vật tư từ nhà cung cấp trước khi đưa vào sản xuất.',
                'icon' => 'PackageSearch',
                'order' => 1
            ],
            [
                'title' => 'Kiểm soát quá trình (IPQC)',
                'description' => 'Giám sát liên tục các thông số kỹ thuật và máy móc để đảm bảo tính ổn định.',
                'icon' => 'Settings2',
                'order' => 2
            ],
            [
                'title' => 'Kiểm tra thành phẩm (FQC)',
                'description' => 'Thực hiện kiểm tra ngẫu nhiên hoặc 100% sản phẩm sau khi hoàn thiện.',
                'icon' => 'ShieldCheck',
                'order' => 3
            ],
            [
                'title' => 'Kiểm soát xuất xưởng (OQC)',
                'description' => 'Đánh giá cuối cùng về đóng gói, nhãn mác và số lượng trước khi vận chuyển.',
                'icon' => 'Truck',
                'order' => 4
            ],
            [
                'title' => 'Cải tiến liên tục',
                'description' => 'Phân tích dữ liệu lỗi để tối ưu quy trình và nâng cao tỷ lệ sản phẩm đạt chuẩn.',
                'icon' => 'Zap',
                'order' => 5
            ],
        ];

        foreach ($oqcSteps as $step) {
            OQCStep::create($step);
        }

        // Quality Standards
        $standards = [
            [
                'type' => 'pass',
                'title' => 'Độ phẳng bề mặt',
                'description' => 'Bề mặt sản phẩm không có vết lõm hoặc lồi vượt quá 0.05mm.',
                'order' => 1
            ],
            [
                'type' => 'pass',
                'title' => 'Độ bóng đồng nhất',
                'description' => 'Phản chiếu ánh sáng đều khắp bề mặt, không có hiện tượng loang màu.',
                'order' => 2
            ],
            [
                'type' => 'fail',
                'title' => 'Dính bụi sơn',
                'description' => 'Xuất hiện các hạt nhỏ li ti trên bề mặt do môi trường phòng sơn không sạch.',
                'order' => 1
            ],
            [
                'type' => 'fail',
                'title' => 'Trầy xước cơ học',
                'description' => 'Các vết xước do va chạm trong quá trình vận chuyển hoặc lắp máy.',
                'order' => 2
            ],
        ];

        foreach ($standards as $standard) {
            QualityStandard::create($standard);
        }
    }
}
