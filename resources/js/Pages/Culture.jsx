import React from 'react';
import RecruitmentLayout from '../Layouts/RecruitmentLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Sun, Coffee, Zap, Target } from 'lucide-react';

export default function Culture() {
    return (
        <RecruitmentLayout>
            <Head title="Văn hoá Almus Tech - Nơi sự nghiệp bứt phá" />
            
            <section className="pt-40 pb-32 bg-white dark:bg-slate-950 transition-colors duration-500 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#006D7E]/5 blur-[120px] rounded-full translate-x-1/2 -z-10"></div>
                
                <div className="max-w-7xl mx-auto px-12">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#EEF8F9] dark:bg-[#002B33] text-[#006D7E] rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-[#006D7E]/10"
                    >
                        <Heart className="h-3 w-3 fill-current" /> CON NGƯỜI LÀ TRỌNG TÂM
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-7xl font-black text-[#004D5C] dark:text-[#CCEBF0] tracking-tighter italic leading-none mb-10"
                    >
                        Văn Hoá Tại <br /> <span className="text-[#006D7E]">Almus Tech</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-slate-500 dark:text-slate-400 text-lg font-medium italic max-w-2xl mx-auto leading-relaxed"
                    >
                        Tại Almus Tech, chúng tôi không chỉ xây dựng phần mềm, chúng tôi xây dựng một cộng đồng nơi mọi ý tưởng đều được tôn trọng và mọi tài năng đều được tỏa sáng.
                    </motion.p>
                </div>
            </section>

            <section className="py-32 px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -10 }}
                        className="bg-white dark:bg-slate-900 p-12 rounded-[60px] shadow-sm border border-slate-50 dark:border-white/5 transition-all duration-500"
                    >
                        <div className="h-16 w-16 bg-[#EEF8F9] dark:bg-[#002B33] rounded-3xl flex items-center justify-center text-[#006D7E] mb-8 shadow-inner">
                            <Sparkles className="h-8 w-8" />
                        </div>
                        <h3 className="text-2xl font-black text-[#004D5C] dark:text-[#CCEBF0] italic tracking-tight mb-4">Sáng tạo không giới hạn</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium italic leading-relaxed">Chúng tôi khuyến khích mọi nhân viên thử nghiệm những công nghệ mới nhất và đưa ra các giải pháp đột phá.</p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        whileHover={{ y: -10 }}
                        className="bg-white dark:bg-slate-900 p-12 rounded-[60px] shadow-sm border border-slate-50 dark:border-white/5 transition-all duration-500"
                    >
                        <div className="h-16 w-16 bg-indigo-50 dark:bg-indigo-950/30 rounded-3xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-8 shadow-inner">
                            <Sun className="h-8 w-8" />
                        </div>
                        <h3 className="text-2xl font-black text-[#004D5C] dark:text-[#CCEBF0] italic tracking-tight mb-4">Gắn kết bền vững</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium italic leading-relaxed">Tinh thần đồng đội là chìa khóa. Các hoạt động Teambuilding, Happy Hour diễn ra thường xuyên để gắn kết mọi thành viên.</p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ y: -10 }}
                        className="bg-white dark:bg-slate-900 p-12 rounded-[60px] shadow-sm border border-slate-50 dark:border-white/5 transition-all duration-500"
                    >
                        <div className="h-16 w-16 bg-emerald-50 dark:bg-emerald-950/30 rounded-3xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-8 shadow-inner">
                            <Zap className="h-8 w-8" />
                        </div>
                        <h3 className="text-2xl font-black text-[#004D5C] dark:text-[#CCEBF0] italic tracking-tight mb-4">Phát triển cá nhân</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium italic leading-relaxed">Lộ trình đào tạo chuyên sâu cùng các khóa học nâng cao kỹ năng giúp bạn không ngừng thăng tiến trong sự nghiệp.</p>
                    </motion.div>
                </div>
            </section>

            <section className="py-40 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-white/5 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-12"
                    >
                        <h2 className="text-6xl font-black text-[#004D5C] dark:text-[#CCEBF0] italic tracking-tighter leading-none">
                            Môi trường <br /> Thông minh & <span className="text-[#006D7E]">Hiện đại</span>
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium italic leading-relaxed">
                            Văn phòng Almus Tech được thiết kế theo không gian mở, trang bị hiện đại với các khu vực giải trí, relax và thư viện sách đa dạng. Chúng tôi tin rằng một không gian thoải mái sẽ khơi nguồn cho những ý tưởng vĩ đại.
                        </p>
                        <div className="grid grid-cols-1 gap-6">
                            {[
                                "Thiết bị làm việc cao cấp (Macbook/Dell XPS)",
                                "Khu vực Pantry đầy đủ đồ ăn nhẹ, trà, cafe free",
                                "Giờ làm việc linh hoạt, cân bằng Work-Life"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 group">
                                    <div className="h-8 w-8 bg-[#EEF8F9] dark:bg-[#002B33] rounded-xl flex items-center justify-center text-[#006D7E] group-hover:scale-110 transition duration-300">
                                        <Target className="h-4 w-4" />
                                    </div>
                                    <span className="font-black italic text-[#004D5C] dark:text-[#CCEBF0] text-sm tracking-tight">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 30, rotate: 3 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                        viewport={{ once: true }}
                        className="relative aspect-square"
                    >
                        <div className="absolute inset-0 bg-[#006D7E] rounded-[80px] blur-3xl opacity-10"></div>
                        <div className="relative h-full w-full bg-white dark:bg-slate-900 p-4 rounded-[80px] shadow-2xl overflow-hidden group">
                            <div className="absolute inset-0 bg-[#EEF8F9] dark:bg-[#002B33] flex items-center justify-center opacity-20 group-hover:opacity-40 transition duration-700">
                                <Coffee className="h-32 w-32 text-[#006D7E]" />
                            </div>
                            <img 
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
                                alt="Almus Tech Culture" 
                                className="w-full h-full object-cover rounded-[64px] relative z-10 hidden"
                            />
                            {/* Dự phòng khi không có ảnh */}
                            <div className="w-full h-full flex flex-col items-center justify-center text-center p-12 relative z-10 border-4 border-dashed border-[#006D7E]/10 rounded-[64px]">
                                <Users className="h-20 w-20 text-[#006D7E] mb-8" />
                                <h4 className="text-xl font-black text-[#004D5C] dark:text-[#CCEBF0] italic mb-4">Almus Tech Family</h4>
                                <p className="text-slate-400 text-sm font-medium italic leading-relaxed">Vì mục tiêu bảo vệ dữ liệu, chúng tôi khuyến khích bạn tải ảnh thực tế lên hệ thống quản trị.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </RecruitmentLayout>
    );
}
