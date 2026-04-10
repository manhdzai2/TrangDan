import React from 'react';
import RecruitmentLayout from '../Layouts/RecruitmentLayout';
import { Head } from '@inertiajs/react';

export default function Culture() {
    return (
        <RecruitmentLayout>
            <Head title="Văn hoá AMT - Nơi sự nghiệp bứt phá" />
            
            <section className="py-24 px-6 bg-amt-gradient text-center">
                <h1 className="hero-headline mb-6">Văn hoá tại AMT</h1>
                <p className="hero-sub max-w-2xl mx-auto">
                    Tại AMT, chúng tôi không chỉ xây dựng phần mềm, chúng tôi xây dựng một cộng đồng nơi mọi ý tưởng đều được tôn trọng và mọi tài năng đều được tỏa sáng.
                </p>
            </section>

            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="glass-effect p-10 transform hover:-translate-y-2 transition duration-500">
                        <div className="text-5xl mb-6">💡</div>
                        <h3 className="text-2xl font-bold mb-4">Sáng tạo không giới hạn</h3>
                        <p className="text-slate-500 leading-relaxed">Chúng tôi khuyến khích mọi nhân viên thử nghiệm những công nghệ mới nhất và đưa ra các giải pháp đột phá.</p>
                    </div>
                    <div className="glass-effect p-10 transform hover:-translate-y-2 transition duration-500">
                        <div className="text-5xl mb-6">🤝</div>
                        <h3 className="text-2xl font-bold mb-4">Gắn kết bền vững</h3>
                        <p className="text-slate-500 leading-relaxed">Tinh thần đồng đội là chìa khóa. Các hoạt động Teambuilding, Happy Hour diễn ra thường xuyên để gắn kết mọi thành viên.</p>
                    </div>
                    <div className="glass-effect p-10 transform hover:-translate-y-2 transition duration-500">
                        <div className="text-5xl mb-6">🌱</div>
                        <h3 className="text-2xl font-bold mb-4">Phát triển cá nhân</h3>
                        <p className="text-slate-500 leading-relaxed">Lộ trình đào tạo chuyên sâu cùng các khóa học nâng cao kỹ năng giúp bạn không ngừng thăng tiến trong sự nghiệp.</p>
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl font-extrabold leading-tight">Môi trường làm việc <br /><span className="text-[#06AED5]">Thông minh & Hiện đại</span></h2>
                        <p className="text-slate-500 text-lg leading-relaxed">
                            Văn phòng của AMT được thiết kế theo không gian mở, trang bị hiện đại với các khu vực giải trí, relax và thư viện sách đa dạng. Chúng tôi tin rằng một không gian thoải mái sẽ khơi nguồn cho những ý tưởng vĩ đại.
                        </p>
                        <ul className="space-y-4 font-bold text-slate-700">
                            <li className="flex items-center"><span className="text-[#06AED5] mr-4 text-xl">✓</span> Thiết bị làm việc cao cấp (Macbook/Dell XPS)</li>
                            <li className="flex items-center"><span className="text-[#06AED5] mr-4 text-xl">✓</span> Khu vực Pantry đầy đủ đồ ăn nhẹ, trà, cafe free</li>
                            <li className="flex items-center"><span className="text-[#06AED5] mr-4 text-xl">✓</span> Giờ làm việc linh hoạt, cân bằng Work-Life</li>
                        </ul>
                    </div>
                    <div className="glass-effect p-2 rotate-3 hover:rotate-0 transition-all duration-700 shadow-2xl">
                        <img 
                            src="/images/office_culture.png" 
                            alt="Office Culture" 
                            className="rounded-xl w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>
        </RecruitmentLayout>
    );
}
