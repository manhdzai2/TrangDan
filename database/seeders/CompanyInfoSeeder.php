<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompanyInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\CompanyInfo::updateOrCreate(
            ['name' => 'Công ty TNHH Almus Tech'],
            [
                'history' => 'Công ty TNHH Almus Tech là doanh nghiệp có vốn đầu tư nước ngoài, chuyên sản xuất linh kiện điện tử. Được thành lập nhằm đáp ứng nhu cầu ngày càng cao của thị trường công nghệ, đặc biệt là trong lĩnh vực sản xuất tai nghe và phụ kiện điện thoại.',
                'mission' => 'Xây dựng môi trường làm việc chuyên nghiệp, thu hút và phát triển nguồn nhân lực chất lượng cao, mang lại giá trị bền vững cho khách hàng và đối tác.',
                'vision' => 'Trở thành doanh nghiệp hàng đầu trong lĩnh vực sản xuất linh kiện điện tử tại Việt Nam và khu vực.',
                'address' => 'Lô G3, Khu công nghiệp Quế Võ, P. Nam Sơn, TP. Bắc Ninh, Tỉnh Bắc Ninh',
                'email' => 'contact@almustech.com',
                'phone' => '0222 123 456',
                'general_job_description' => 'Tham gia sản xuất, lắp ráp linh kiện điện tử cao cấp (Buds, Watch, Cradle)...',
                'salary_range' => '7 - 12 triệu/tháng',
                'logo' => null,
                'images' => []
            ]
        );
    }
}
