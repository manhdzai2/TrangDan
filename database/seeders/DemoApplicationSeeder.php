<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Application;
use App\Models\Vacancy;
use Faker\Factory as Faker;

class DemoApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('vi_VN');
        
        $vacancies = Vacancy::all();
        if ($vacancies->isEmpty()) {
            $this->command->info('No vacancies found. Please seed vacancies first.');
            return;
        }

        $names = [
            'Nguyễn Văn An', 'Trần Thị Bảo Ngọc', 'Lê Hoàng Trung', 'Phạm Minh Tuấn', 'Hoàng Thị Lan',
            'Bùi Văn Đức', 'Đặng Thu Giang', 'Trương Quyết Thắng', 'Đỗ Hải Yến', 'Võ Quang Huy',
            'Đinh Bích Hà', 'Ngô Quốc Khánh', 'Lý Thu Thảo', 'Vũ Hồng Quân', 'Hồ Tấn Minh',
            'Đoàn Bảo Châu', 'Lương Minh Cường', 'Mai Ngọc Quỳnh', 'Trịnh Bá Long', 'Đào Duy Từ'
        ];

        $provinces = ['Hà Nội', 'Bắc Ninh', 'Hưng Yên', 'Hải Dương', 'Vĩnh Phúc', 'Hải Phòng', 'Thái Nguyên'];

        $statuses = ['new', 'reviewing', 'interviewed', 'offered', 'hired', 'rejected'];

        $aiFeedbacks = [
            'Ứng viên có kỹ năng phù hợp với yêu cầu. Kinh nghiệm đáp ứng 80%.',
            'Phù hợp với môi trường sản xuất. Đã từng làm việc tại nhà máy tương tự.',
            'Kỹ năng tốt nhưng chưa có nhiều kinh nghiệm thực tế. Có thể đào tạo thêm.',
            'Xuất sắc, kỹ năng và kinh nghiệm khớp 95% với mô tả công việc.',
            'Cần cải thiện kỹ năng giao tiếp nhưng tay nghề kỹ thuật cao.',
            'Ứng viên có tiềm năng, phù hợp với vị trí QC/QA.'
        ];

        foreach ($names as $name) {
            $vacancy = $vacancies->random();
            $firstName = explode(' ', $name)[count(explode(' ', $name)) - 1];
            $lastName = explode(' ', $name)[0];
            $username = strtolower($this->removeAccents($firstName . '.' . $lastName . rand(10, 99)));
            
            Application::create([
                'vacancy_id' => $vacancy->id,
                'user_id' => null, // Guest application
                'name' => $name,
                'email' => $username . '@gmail.com',
                'phone' => $faker->regexify('0[35789][0-9]{8}'),
                'address' => $provinces[array_rand($provinces)],
                'age' => rand(20, 35),
                'applied_position' => $vacancy->title,
                'start_date' => now()->addDays(rand(5, 30))->format('Y-m-d'),
                'cover_letter' => 'Tôi rất mong muốn được làm việc tại Almus Tech. Tôi có kinh nghiệm liên quan và sẵn sàng đi làm ngay.',
                'ai_analysis' => $aiFeedbacks[array_rand($aiFeedbacks)],
                'source' => ['website', 'facebook', 'linkedin', 'referral'][array_rand(['website', 'facebook', 'linkedin', 'referral'])],
                'cv_path' => null, // Optional
                'status' => $statuses[array_rand($statuses)],
                'is_read' => (bool)rand(0, 1),
                'created_at' => now()->subDays(rand(1, 30))->subHours(rand(1, 24)),
                'updated_at' => now()->subDays(rand(0, 5))
            ]);
        }

        $this->command->info('20 Demo Applications seeded successfully.');
    }

    private function removeAccents($str)
    {
        $str = preg_replace("/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/", "a", $str);
        $str = preg_replace("/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/", "e", $str);
        $str = preg_replace("/(ì|í|ị|ỉ|ĩ)/", "i", $str);
        $str = preg_replace("/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/", "o", $str);
        $str = preg_replace("/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/", "u", $str);
        $str = preg_replace("/(ỳ|ý|ỵ|ỷ|ỹ)/", "y", $str);
        $str = preg_replace("/(đ)/", "d", $str);
        $str = preg_replace("/(À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)/", "A", $str);
        $str = preg_replace("/(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)/", "E", $str);
        $str = preg_replace("/(Ì|Í|Ị|Ỉ|Ĩ)/", "I", $str);
        $str = preg_replace("/(Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)/", "O", $str);
        $str = preg_replace("/(Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)/", "U", $str);
        $str = preg_replace("/(Ỳ|Ý|Ỵ|Ỷ|Ỹ)/", "Y", $str);
        $str = preg_replace("/(Đ)/", "D", $str);
        return $str;
    }
}
