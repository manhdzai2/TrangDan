import React from 'react';
import RecruitmentLayout from '../Layouts/RecruitmentLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Target, 
    Rocket, 
    Heart, 
    Shield, 
    Zap, 
    Users, 
    Award,
    Globe,
    ArrowRight,
    MapPin,
    Building
} from 'lucide-react';

const Card = ({ title, description, icon, delay = 0 }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -8, scale: 1.02 }}
        className="glass-effect p-10 flex flex-col items-center text-center group cursor-default relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[40px] shadow-xl hover:shadow-2xl"
    >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#006D7E]/20 to-transparent group-hover:via-[#006D7E]/50 transition-all duration-700"></div>
        <div className="h-20 w-20 bg-[#EEF8F9] dark:bg-[#002B33] rounded-[32px] flex items-center justify-center text-[#006D7E] dark:text-[#CCEBF0] mb-8 group-hover:bg-[#006D7E] group-hover:text-white transition-all duration-700 shadow-inner">
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

export default function About() {
    const { company } = usePage().props;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <RecruitmentLayout>
            <Head title="Giới thiệu về Almus Tech" />

            {/* Hero Section */}
            <section className="min-h-[80vh] relative flex items-center pt-32 pb-20 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500">
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 0.05 }} transition={{ duration: 2 }}
                        className="absolute top-0 right-0 w-1/2 h-full bg-[#006D7E] blur-[160px] rounded-full translate-x-1/2"
                    ></motion.div>
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 0.03 }} transition={{ duration: 2, delay: 0.5 }}
                        className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[#004D5C] blur-[120px] rounded-full -translate-x-1/2"
                    ></motion.div>
                </div>

                <div className="max-w-7xl mx-auto px-12 w-full relative z-10">
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center max-w-4xl mx-auto"
                    >
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-6 py-2.5 bg-[#EEF8F9] dark:bg-[#002B33] text-[#006D7E] rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10 border border-[#006D7E]/10">
                            <Building className="h-4 w-4" /> Câu Chuyện Của Chúng Tôi
                        </motion.div>
                        
                        <motion.h1 variants={itemVariants} className="text-7xl lg:text-8xl font-black text-[#004D5C] dark:text-[#CCEBF0] tracking-tighter italic leading-[1] mb-10">
                            Kiến Tạo <br /> <span className="text-[#006D7E]">Giá Trị</span> Thực
                        </motion.h1>

                        <motion.p variants={itemVariants} className="text-xl text-slate-500 dark:text-slate-400 font-medium italic mb-16 leading-relaxed max-w-3xl mx-auto">
                            Được thành lập với khát vọng bứt phá mọi giới hạn công nghệ, Almus Tech không ngừng nỗ lực để trở thành ngọn cờ đầu trong việc cung cấp các giải pháp phần mềm và AI tiên tiến vươn tầm quốc tế.
                        </motion.p>

                        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-slate-100 dark:border-white/5">
                            {[
                                { number: '2020', label: 'Năm Thành Lập' },
                                { number: '200+', label: 'Nhân Sự Toàn Cầu' },
                                { number: '150+', label: 'Dự Án Hoàn Thành' },
                                { number: '15+', label: 'Quốc Gia Trải Dài' }
                            ].map((stat, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-4xl font-black text-[#006D7E] italic mb-2">{stat.number}</div>
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-32 bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-white/5 relative overflow-hidden transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-12 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                        {/* Mission */}
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-white dark:bg-slate-800 p-16 rounded-[60px] shadow-2xl relative overflow-hidden group"
                        >
                            <div className="absolute -right-10 -top-10 w-48 h-48 bg-[#006D7E]/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-700"></div>
                            <div className="h-20 w-20 bg-[#EEF8F9] dark:bg-[#002B33] rounded-3xl flex items-center justify-center text-[#006D7E] mb-8 shadow-inner">
                                <Target className="h-10 w-10" />
                            </div>
                            <h3 className="text-4xl font-black text-[#004D5C] dark:text-[#CCEBF0] italic tracking-tighter mb-6">Sứ Mệnh</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-lg italic leading-relaxed font-medium">
                                Sứ mệnh của chúng tôi là <strong className="text-[#006D7E]">trao quyền cho các doanh nghiệp</strong> và cộng đồng bằng cách mang đến những giải pháp công nghệ có tính ứng dụng cao, hiệu quả, an toàn và sáng tạo, từ đó tối ưu hóa nguồn lực và hiện thực hóa mục tiêu phát triển bền vững.
                            </p>
                        </motion.div>

                        {/* Vision */}
                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-[#004D5C] p-16 rounded-[60px] shadow-2xl relative overflow-hidden group text-white"
                        >
                            <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-700"></div>
                            <div className="h-20 w-20 bg-white/10 rounded-3xl flex items-center justify-center text-white mb-8 shadow-inner backdrop-blur-sm">
                                <Globe className="h-10 w-10" />
                            </div>
                            <h3 className="text-4xl font-black italic tracking-tighter mb-6">Tầm Nhìn 2030</h3>
                            <p className="text-white/70 text-lg italic leading-relaxed font-medium">
                                Trở thành tập đoàn công nghệ <strong className="text-white">hàng đầu tại Đông Nam Á</strong> trong lĩnh vực AI & Blockchain, được biết đến không chỉ nhờ năng lực chuyên môn mà còn bởi môi trường làm việc lý tưởng nới thu hút và bồi dưỡng nhân tài xuất chúng.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-40 bg-white dark:bg-slate-950 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-12">
                    <SectionHeader 
                        subtitle="GIÁ TRỊ CỐT LÕI"
                        title="Nền Tảng Của Sự Thành Công"
                        description="Văn hóa của Almus Tech được xây dựng dựa trên 4 trụ cột vững chắc, định hướng mọi quyết định và hành động của cả tập thể."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <Card 
                            icon={<Zap className="h-8 w-8" />}
                            title="Tốc Độ"
                            description="Nhanh chóng thích ứng với sự thay đổi, linh hoạt trong mọi chiến lược để luôn dẫn đầu xu hướng công nghệ."
                            delay={0.1}
                        />
                        <Card 
                            icon={<Award className="h-8 w-8" />}
                            title="Xuất Sắc"
                            description="Không bao giờ thỏa hiệp với sự tầm thường. Mọi sản phẩm đều phải đặt tiêu chuẩn chất lượng cao nhất."
                            delay={0.2}
                        />
                        <Card 
                            icon={<Users className="h-8 w-8" />}
                            title="Đồng Lòng"
                            description="Đề cao sức mạnh tập thể. Một nhóm nhỏ với sự đồng thuận tuyệt đối có thể dời non lấp biển."
                            delay={0.3}
                        />
                        <Card 
                            icon={<Heart className="h-8 w-8" />}
                            title="Tận Tâm"
                            description="Làm việc bằng cả trái tim vì khách hàng, trân trọng sự tín nhiệm và luôn tạo giá trị vượt mong đợi."
                            delay={0.4}
                        />
                    </div>
                </div>
            </section>

            {/* CTA Join Us */}
            <section className="py-32 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-white/5 relative overflow-hidden transition-colors duration-500">
                <div className="max-w-5xl mx-auto px-12 text-center relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-[#006D7E] p-24 rounded-[80px] shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-60"></div>
                        
                        <div className="relative z-10">
                            <h2 className="text-5xl lg:text-7xl font-black text-white italic tracking-tighter mb-8 leading-tight">
                                Ghi Dấu Ấn <br /> Sự Nghiệp Của Bạn
                            </h2>
                            <p className="text-white/80 text-xl font-medium italic mb-12 max-w-2xl mx-auto">
                                Sẵn sàng gia nhập một tập thể tràn đầy năng lượng và khát vọng? Khám phá những cơ hội không giới hạn tại Almus Tech ngay hôm nay.
                            </p>
                            
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                                <Link 
                                    href="/jobs" 
                                    className="px-14 py-6 bg-white text-[#006D7E] rounded-[32px] text-[12px] font-black uppercase tracking-[0.2em] shadow-xl hover:shadow-2xl flex items-center gap-4 transition-all duration-500"
                                >
                                    Tham gia cùng chúng tôi <ArrowRight className="h-5 w-5" />
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </RecruitmentLayout>
    );
}
