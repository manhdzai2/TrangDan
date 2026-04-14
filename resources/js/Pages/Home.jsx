import React from 'react';
import RecruitmentLayout from '../Layouts/RecruitmentLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    ArrowRight, Star, Cpu, Users, 
    TrendingUp, Globe, Shield, Zap, 
    Sparkles, Heart, Rocket, Target
} from 'lucide-react';

const Card = ({ title, description, icon, delay = 0 }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -8, scale: 1.02 }}
        className="glass-effect p-10 flex flex-col items-center text-center group cursor-default relative overflow-hidden"
    >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#006D7E]/20 to-transparent group-hover:via-[#006D7E]/50 transition-all duration-700"></div>
        <div className="h-20 w-20 bg-[#EEF8F9] rounded-[32px] flex items-center justify-center text-[#006D7E] mb-8 group-hover:bg-[#006D7E] group-hover:text-white transition-all duration-700 shadow-inner">
            {icon}
        </div>
        <h3 className="text-xl font-black text-[#004D5C] dark:text-[#CCEBF0] italic mb-4 tracking-tight group-hover:text-[#006D7E] transition-colors duration-300">{title}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium italic leading-relaxed">{description}</p>
    </motion.div>
);

const SectionHeader = ({ subtitle, title, description }) => (
    <div className="text-center mb-24">
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-black text-[#006D7E] tracking-[0.4em] uppercase mb-6"
        >
            {subtitle}
        </motion.div>
        <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl font-black text-[#004D5C] dark:text-[#CCEBF0] tracking-tighter italic mb-8 leading-none"
        >
            {title}
        </motion.h2>
        <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-slate-500 dark:text-slate-400 text-lg font-medium italic max-w-2xl mx-auto leading-relaxed"
        >
            {description}
        </motion.p>
    </div>
);

export default function Home() {
    const { company } = usePage().props;
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <RecruitmentLayout>
            <Head title="Gia nhập Almus Tech | Tương lai Công nghệ" />

            {/* Hero Section */}
            <section className="min-h-screen relative flex items-center pt-20 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500">
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.05 }}
                        transition={{ duration: 2 }}
                        className="absolute top-0 right-0 w-1/2 h-full bg-[#006D7E] blur-[160px] rounded-full translate-x-1/2"
                    ></motion.div>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.03 }}
                        transition={{ duration: 2, delay: 0.5 }}
                        className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[#004D5C] blur-[120px] rounded-full -translate-x-1/2"
                    ></motion.div>
                </div>

                <div className="max-w-7xl mx-auto px-12 w-full relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-6 py-2.5 bg-[#EEF8F9] dark:bg-[#002B33] text-[#006D7E] rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10 border border-[#006D7E]/10 animate-pulse">
                                <Sparkles className="h-4 w-4" /> Tuyển dụng tài năng 2026
                            </motion.div>
                            
                            <motion.h1 variants={itemVariants} className="text-8xl font-black text-[#004D5C] dark:text-[#CCEBF0] tracking-tighter italic leading-[0.85] mb-10">
                                Đột Phá <br /> <span className="text-[#006D7E]">Giới Hạn</span> <br /> Công Nghệ
                            </motion.h1>

                            <motion.p variants={itemVariants} className="text-xl text-slate-500 dark:text-slate-400 font-medium italic mb-12 max-w-lg leading-relaxed">
                                {company?.mission || 'Gia nhập đội ngũ Almus Tech để cùng nhau kiến tạo những giải pháp thay đổi thế giới bằng trí tuệ và sự sáng tạo không ngừng.'}
                            </motion.p>

                            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link 
                                        href="/jobs" 
                                        className="px-12 py-5 bg-[#004D5C] text-white rounded-[24px] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-[#004D5C]/30 flex items-center justify-center gap-3 hover:bg-[#003540] transition-all duration-500"
                                    >
                                        Xem vị trí đang tuyển <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link 
                                        href="/process" 
                                        className="px-12 py-5 bg-white dark:bg-slate-900 text-[#004D5C] dark:text-[#CCEBF0] border border-slate-100 dark:border-white/5 rounded-[24px] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:shadow-2xl transition-all duration-500 flex items-center justify-center gap-3"
                                    >
                                        Quy trình tuyển dụng
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        <div className="relative">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                                className="grid grid-cols-2 gap-8"
                            >
                                <div className="space-y-8">
                                    <motion.div 
                                        whileHover={{ y: -10 }}
                                        className="bg-white dark:bg-slate-900 p-10 rounded-[60px] shadow-2xl border border-white/50 dark:border-white/5 relative overflow-hidden group"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#EEF8F9] dark:bg-[#002B33] rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition duration-700"></div>
                                        <div className="h-16 w-16 bg-[#EEF8F9] dark:bg-[#002B33] rounded-3xl flex items-center justify-center text-[#006D7E] mb-8 shadow-inner">
                                            <Cpu className="h-8 w-8" />
                                        </div>
                                        <div className="text-5xl font-black text-[#004D5C] dark:text-[#CCEBF0] italic mb-3 tracking-tighter">200+</div>
                                        <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">Kỹ sư AI & Cloud</p>
                                    </motion.div>
                                    <motion.div 
                                        whileHover={{ y: -10 }}
                                        className="bg-[#004D5C] p-10 rounded-[60px] shadow-2xl text-white relative overflow-hidden group"
                                    >
                                        <div className="absolute -right-4 -bottom-4 h-24 w-24 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition duration-700"></div>
                                        <div className="text-5xl font-black mb-4 italic">15+</div>
                                        <p className="text-white/60 text-[10px] font-black uppercase tracking-widest">Dự án toàn cầu</p>
                                    </motion.div>
                                </div>
                                <div className="space-y-8 pt-16">
                                    <motion.div 
                                        whileHover={{ y: -10 }}
                                        className="bg-[#006D7E] p-10 rounded-[60px] shadow-2xl text-white relative overflow-hidden group"
                                    >
                                        <div className="text-5xl font-black mb-4 italic">500+</div>
                                        <p className="text-white/60 text-[10px] font-black uppercase tracking-widest">Thành viên tài năng</p>
                                    </motion.div>
                                    <motion.div 
                                        whileHover={{ y: -10 }}
                                        className="bg-white dark:bg-slate-900 p-10 rounded-[60px] shadow-2xl border border-white/50 dark:border-white/5 relative overflow-hidden group"
                                    >
                                        <div className="h-16 w-16 bg-amber-50 dark:bg-amber-900/20 rounded-3xl flex items-center justify-center text-amber-500 mb-8 shadow-inner">
                                            <Star className="h-8 w-8 fill-current" />
                                        </div>
                                        <div className="text-3xl font-black text-[#004D5C] dark:text-[#CCEBF0] italic mb-2 tracking-tighter">Top 100</div>
                                        <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest leading-tight">Nơi làm việc tốt nhất</p>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Work with Us */}
            <section className="py-40 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-white/5 relative overflow-hidden transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-12">
                    <SectionHeader 
                        subtitle="LỢI ÍCH TẠI ALMUS TECH"
                        title="Tư duy Đột phá • Môi trường Nhân bản"
                        description="Chúng tôi không chỉ xây dựng phần mềm, chúng tôi nuôi dưỡng đam mê và tạo điều kiện tối đa để mọi cá nhân tỏa sáng."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        <Card 
                            icon={<Zap className="h-8 w-8" />}
                            title="Tốc độ & Hiệu suất"
                            description="Làm việc trong môi trường agile, quy trình tinh gọn giúp tối ưu hóa khả năng sáng tạo."
                            delay={0.1}
                        />
                        <Card 
                            icon={<Shield className="h-8 w-8" />}
                            title="Bền vững & An toàn"
                            description="Chế độ phúc lợi toàn diện, bảo hiểm cao cấp và môi trường làm việc ổn định."
                            delay={0.2}
                        />
                        <Card 
                            icon={<Heart className="h-8 w-8" />}
                            title="Kết nối & Chia sẻ"
                            description="Văn hóa phẳng, sếp là đồng nghiệp, mọi ý kiến đều được lắng nghe và trân trọng."
                            delay={0.3}
                        />
                        <Card 
                            icon={<Globe className="h-8 w-8" />}
                            title="Tầm vóc Quốc tế"
                            description="Cơ hội làm việc với các chuyên gia hàng đầu và tham gia vào các dự án quy mô toàn cầu."
                            delay={0.4}
                        />
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-40 bg-white dark:bg-slate-950 transition-colors duration-500 relative">
                <div className="max-w-7xl mx-auto px-12">
                    <div className="bg-[#004D5C] rounded-[80px] p-24 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#006D7E]/20 to-transparent blur-3xl opacity-50 group-hover:scale-110 transition duration-1000"></div>
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                            <div>
                                <motion.div 
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="text-[10px] font-black text-white/40 tracking-[0.4em] uppercase mb-8"
                                >
                                    SỨ MỆNH CỦA CHÚNG TÔI
                                </motion.div>
                                <motion.h2 
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="text-6xl font-black text-white italic tracking-tighter mb-10 leading-tight"
                                >
                                    Định Hình <br /> Tương Lai Số
                                </motion.h2>
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    className="text-white/60 text-lg font-medium italic mb-12 leading-relaxed"
                                >
                                    {company?.history || 'Tại Almus Tech, mỗi dòng code bạn viết không chỉ là sản phẩm kỹ thuật, mà là viên gạch xây dựng nên một thế giới thông minh hơn, tiện lợi hơn.'}
                                </motion.p>
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="flex gap-8"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 bg-white/5 rounded-2xl flex items-center justify-center text-white"><Target className="h-6 w-6" /></div>
                                        <div className="text-white font-black italic tracking-tight">Mục tiêu rõ ràng</div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 bg-white/5 rounded-2xl flex items-center justify-center text-white"><Rocket className="h-6 w-6" /></div>
                                        <div className="text-white font-black italic tracking-tight">Phát triển thần tốc</div>
                                    </div>
                                </motion.div>
                            </div>
                            <motion.div 
                                initial={{ opacity: 0, rotate: 5, scale: 0.9 }}
                                whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5 }}
                                className="relative aspect-square flex items-center justify-center"
                            >
                                <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full"></div>
                                <Sparkles className="h-48 w-48 text-[#006D7E] animate-bounce duration-[3000ms]" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </RecruitmentLayout>
    );
}
