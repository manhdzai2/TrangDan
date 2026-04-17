import RecruitmentLayout from '@/Layouts/RecruitmentLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, MapPin, Clock, Briefcase, 
    ChevronRight, Filter, Sparkles,
    Send, Users, Zap, CheckCircle2, ArrowRight,
    Banknote, Heart, GraduationCap, TrendingUp, Star
} from 'lucide-react';
import { JobCardSkeleton } from '@/Components/Skeleton';
import { useEffect } from 'react';
import { useTranslation } from '@/Hooks/useTranslation';


const PERK_DETAILS = {
    training: {
        title: "Đào tạo từ đầu",
        desc: "Chúng tôi xây dựng lộ trình đào tạo bài bản từ ngày đầu tiên. Bạn sẽ được hướng dẫn bởi các chuyên gia giàu kinh nghiệm, không áp lực về trình độ đầu vào.",
        color: "blue"
    },
    environment: {
        title: "Môi trường trẻ",
        desc: "Văn hóa làm việc năng động, không khoảng cách. Các hoạt động Teambuilding, phong trào nội bộ sôi nổi giúp bạn luôn tràn đầy năng lượng.",
        color: "amber"
    },
    growth: {
        title: "Lộ trình thăng tiến",
        desc: "Cơ hội thăng tiến rõ ràng sau mỗi 6-12 tháng. Almus Tech ưu tiên phát triển đội ngũ quản lý từ nguồn lực nội bộ.",
        color: "emerald"
    }
};

const InteractiveJobCard = ({ job, companyInfo, index, __ }) => {
    const [activePerk, setActivePerk] = useState(null);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ 
                duration: 0.6, 
                delay: index * 0.05,
                ease: [0.16, 1, 0.3, 1]
            }}
            className="group"
        >
            <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[48px] border border-slate-50 dark:border-white/5 shadow-sm hover:shadow-2xl hover:shadow-[#006D7E]/5 transition-all duration-700 flex flex-col md:flex-row md:items-center justify-between gap-8 group overflow-hidden relative">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#006D7E] -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                
                <div className="flex-1">
                    <Link href={`/jobs/${job.id}`} className="block mb-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="px-3 py-1 bg-[#EEF8F9] dark:bg-[#002B33] text-[#006D7E] rounded-full text-[9px] font-black uppercase tracking-widest border border-[#006D7E]/5">
                                {job.type}
                            </div>
                            {job.factory && (
                                <div className="px-3 py-1 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 rounded-full text-[9px] font-black uppercase tracking-widest border border-amber-200/50">
                                    {job.factory}
                                </div>
                            )}
                            {job.level && (
                                <div className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 rounded-full text-[9px] font-black uppercase tracking-widest border border-indigo-200/50">
                                    {job.level}
                                </div>
                            )}
                            <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">{__('Jobs Card Posted')}</div>
                        </div>
                        <h3 className="text-3xl font-black text-[#004D5C] dark:text-[#CCEBF0] italic tracking-tight group-hover:text-[#006D7E] transition-colors duration-500 mb-6">{job.title}</h3>
                        
                        <div className="flex flex-wrap gap-x-8 gap-y-4">
                            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold italic">
                                <MapPin className="h-4 w-4 text-[#006D7E]" /> {job.location}
                            </div>
                            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold italic">
                                <Clock className="h-4 w-4 text-[#006D7E]" /> {job.created_at_diff || __('Jobs Card Today')}
                            </div>
                            <div className="flex items-center gap-2 text-[#006D7E] dark:text-emerald-400 text-lg font-black italic">
                                <Banknote className="h-5 w-5 animate-pulse" /> {job.salary || companyInfo?.salary_range || "Thu nhập hấp dẫn"}
                            </div>
                        </div>
                    </Link>

                    {/* Quick Perks - Interactive */}
                    <div className="space-y-4 mb-8">
                        <div className="flex flex-wrap gap-3">
                            {[
                                { id: 'training', icon: <GraduationCap className="h-3 w-3" />, text: "Đào tạo từ đầu", color: "blue" },
                                { id: 'environment', icon: <Zap className="h-3 w-3" />, text: "Môi trường trẻ", color: "amber" },
                                { id: 'growth', icon: <TrendingUp className="h-3 w-3" />, text: "Lộ trình thăng tiến", color: "emerald" }
                            ].map((perk) => (
                                <button 
                                    key={perk.id}
                                    onClick={() => setActivePerk(activePerk === perk.id ? null : perk.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 border shadow-sm hover:scale-105 active:scale-95 ${
                                        activePerk === perk.id 
                                        ? `bg-${perk.color}-600 text-white border-${perk.color}-600 shadow-${perk.color}-500/20`
                                        : `bg-${perk.color}-50 text-${perk.color}-600 dark:bg-${perk.color}-950/30 dark:text-${perk.color}-400 border-current/10`
                                    }`}
                                >
                                    {perk.icon} {perk.text}
                                </button>
                            ))}
                        </div>

                        <AnimatePresence>
                            {activePerk && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className={`p-6 rounded-[32px] bg-${PERK_DETAILS[activePerk].color}-50/50 dark:bg-${PERK_DETAILS[activePerk].color}-950/20 border border-${PERK_DETAILS[activePerk].color}-100 dark:border-${PERK_DETAILS[activePerk].color}-900/50`}>
                                        <div className="flex gap-4">
                                            <div className={`h-10 w-10 rounded-2xl bg-${PERK_DETAILS[activePerk].color}-100 dark:bg-${PERK_DETAILS[activePerk].color}-900/50 flex items-center justify-center text-${PERK_DETAILS[activePerk].color}-600 dark:text-${PERK_DETAILS[activePerk].color}-400 shrink-0`}>
                                                <Sparkles className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <div className={`text-[10px] font-black text-${PERK_DETAILS[activePerk].color}-600 uppercase tracking-widest mb-1 italic`}>{PERK_DETAILS[activePerk].title}</div>
                                                <p className="text-sm font-bold text-[#004D5C]/80 dark:text-slate-300 italic leading-relaxed">
                                                    {PERK_DETAILS[activePerk].desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Why Almus Highlight */}
                    {!activePerk && (
                        <div className="bg-slate-50 dark:bg-slate-950/50 p-6 rounded-[32px] border border-slate-100 dark:border-white/5 relative group-hover:bg-[#EEF8F9] dark:group-hover:bg-[#002B33]/50 transition-colors duration-700">
                            <div className="flex items-start gap-4">
                                <Star className="h-5 w-5 text-amber-400 fill-amber-400 shrink-0 mt-1" />
                                <p className="text-sm font-bold text-[#004D5C]/70 dark:text-slate-400 italic leading-relaxed">
                                    {job.highlight || companyInfo?.general_job_description || "Tại Almus Tech, bạn sẽ được làm việc trong môi trường thân thiện, đào tạo bài bản và lộ trình phát triển rõ ràng."}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex flex-col items-center gap-4">
                    <Link href={`/jobs/${job.id}`}>
                        <motion.div 
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="h-20 w-20 rounded-full bg-[#EEF8F9] dark:bg-[#002B33] flex items-center justify-center text-[#006D7E] shadow-xl group-hover:bg-[#006D7E] group-hover:text-white transition-all duration-700"
                        >
                            <ArrowRight className="h-8 w-8 group-hover:translate-x-2 transition-transform duration-700" />
                        </motion.div>
                    </Link>
                    <div className="text-[10px] font-black text-[#006D7E] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-700">Ứng tuyển ngay</div>
                </div>
            </div>
        </motion.div>
    );
};

export default function Index({ vacancies, companyInfo }) {
    const { __ } = useTranslation();
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate initial loading for premium feel
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);
    
    const filteredJobs = vacancies.filter(job => 
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <RecruitmentLayout>
            <Head title={__('Jobs Head Title')} />
            
            <section className="pt-40 pb-20 bg-white dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#EEF8F9]/50 dark:from-[#002B33]/20 to-transparent -z-10"></div>
                <div className="max-w-7xl mx-auto px-12">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#EEF8F9] dark:bg-[#002B33] text-[#006D7E] rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-[#006D7E]/10">
                                <Sparkles className="h-3 w-3 animate-pulse" /> {__('Jobs Badge')}
                            </div>
                            <h1 className="text-7xl font-black text-[#004D5C] dark:text-[#CCEBF0] tracking-tighter italic leading-none">
                                {__('Jobs Hero Title 1')} <br /> <span className="text-[#006D7E]">{__('Jobs Hero Title 2')}</span>
                            </h1>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="mt-12 flex items-center gap-6"
                            >
                                <div className="h-1px w-20 bg-gradient-to-r from-[#006D7E] to-transparent"></div>
                                <p className="text-sm font-black text-[#004D5C] dark:text-slate-500 uppercase tracking-[0.3em] italic">
                                    {__('Start Your Journey')}
                                </p>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="lg:w-[500px] shrink-0"
                        >
                            <div className="bg-[#001D24] dark:bg-black p-10 rounded-[60px] shadow-2xl relative overflow-hidden group border border-white/5">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#006D7E]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-[#006D7E]/20 transition-all duration-700"></div>
                                <div className="relative z-10 space-y-8">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="h-8 w-8 bg-[#006D7E]/20 rounded-xl flex items-center justify-center text-[#CCEBF0]">
                                            <Sparkles className="h-4 w-4" />
                                        </div>
                                        <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">{__('Premium Recruitment')}</h2>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Salary */}
                                        <div className="flex items-start gap-4 group/row cursor-default">
                                            <div className="h-10 w-10 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 group-hover/row:scale-110 transition-transform">
                                                <Banknote className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black text-emerald-500/50 uppercase tracking-widest mb-1 italic">Thu nhập hấp dẫn</div>
                                                <p className="text-white text-base font-bold italic leading-tight">
                                                    {companyInfo?.salary_range || "7-20 triệu/tháng (tuỳ vị trí) + thưởng + phụ cấp"}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Job */}
                                        <div className="flex items-start gap-4 group/row cursor-default">
                                            <div className="h-10 w-10 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 group-hover/row:scale-110 transition-transform">
                                                <Briefcase className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black text-blue-500/50 uppercase tracking-widest mb-1 italic">Công việc chính</div>
                                                <p className="text-white text-base font-bold italic leading-tight">
                                                    {companyInfo?.general_job_description || "Tham gia sản xuất, lắp ráp phụ kiện điện tử hoặc làm việc tại văn phòng"}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Environment */}
                                        <div className="bg-white/5 p-6 rounded-[32px] border border-white/10 group-hover:bg-white/10 transition-colors">
                                            <p className="text-white/60 text-xs font-medium italic leading-relaxed">
                                                {companyInfo?.mission || "Tại Almus Tech, bạn sẽ được làm việc trong môi trường trẻ trung, thân thiện, được đào tạo từ đầu và có lộ trình phát triển rõ ràng."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-4xl"
                    >
                        <div className="relative group">
                            <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-400 h-6 w-6 group-focus-within:text-[#006D7E] transition-colors duration-500" />
                            <input 
                                type="text" 
                                placeholder={__('Jobs Search Placeholder')}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-[#f8fafc] dark:bg-slate-900 border-none rounded-[40px] pl-20 pr-12 py-8 text-lg font-bold text-[#004D5C] dark:text-white focus:ring-8 focus:ring-[#006D7E]/10 transition-all duration-500 shadow-inner italic"
                            />
                            <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-3">
                                <div className="h-3 w-3 rounded-full bg-[#006D7E] animate-ping"></div>
                                <span className="text-xs font-black text-[#006D7E] uppercase tracking-widest">
                                    {__('Jobs Search Result Count').replace('{count}', filteredJobs.length)}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="bg-white dark:bg-slate-950 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-12">
                    {/* Recruitment Process Section */}
                    <div className="mb-40 pt-10">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                            {[
                                {
                                    id: 1,
                                    title: __('Process Step 1 Title'),
                                    icon: <Send className="h-6 w-6" />,
                                    color: "bg-[#EEF8F9] dark:bg-[#002B33] text-[#006D7E]"
                                },
                                {
                                    id: 2,
                                    title: __('Process Step 2 Title'),
                                    icon: <Users className="h-6 w-6" />,
                                    color: "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400"
                                },
                                {
                                    id: 3,
                                    title: __('Process Step 3 Title'),
                                    icon: <Zap className="h-6 w-6" />,
                                    color: "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400"
                                },
                                {
                                    id: 4,
                                    title: __('Process Step 4 Title'),
                                    icon: <CheckCircle2 className="h-6 w-6" />,
                                    color: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400"
                                }
                            ].map((step, index) => (
                                <motion.div 
                                    key={step.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + (index * 0.1) }}
                                    className="flex-1 w-full relative"
                                >
                                    <div className="bg-white dark:bg-slate-900 border border-slate-50 dark:border-white/5 p-8 rounded-[40px] shadow-sm hover:shadow-xl transition-all duration-500 group">
                                        <div className={`h-14 w-14 ${step.color} rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                                            {step.icon}
                                        </div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">Step 0{step.id}</div>
                                        <h3 className="text-lg font-black text-[#004D5C] dark:text-[#CCEBF0] italic tracking-tight">{step.title}</h3>
                                    </div>
                                    {index < 3 && (
                                        <div className="hidden lg:block absolute top-1/2 -right-6 -translate-y-1/2 z-10">
                                            <ArrowRight className="h-10 w-10 text-slate-100 dark:text-slate-800" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Culture & Benefits Section */}
                    <div className="mb-40">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#EEF8F9] dark:bg-[#002B33] text-[#006D7E] rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-[#006D7E]/10">
                                    <Sparkles className="h-3 w-3" /> {__('Join Almus Tech')}
                                </div>
                                <h2 className="text-6xl font-black text-[#004D5C] dark:text-[#CCEBF0] tracking-tighter italic leading-none mb-10">
                                    Môi Trường & <br /> <span className="text-[#006D7E]">Cơ Hội Phát Triển</span>
                                </h2>
                                <div className="bg-[#EEF8F9]/50 dark:bg-slate-900/50 backdrop-blur-xl p-10 rounded-[48px] border border-white/5 shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#006D7E]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-[#006D7E]/20 transition-all duration-700"></div>
                                    <p className="text-lg font-bold text-[#004D5C] dark:text-slate-300 italic leading-relaxed relative z-10">
                                        {companyInfo?.mission || "Tại Almus Tech, chúng tôi không chỉ xây dựng sự nghiệp, chúng tôi kiến tạo môi trường nơi mỗi cá nhân được tỏa sáng và phát triển không giới hạn."}
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="space-y-6"
                            >
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 italic">Đãi ngộ & Quyền lợi</div>
                                {companyInfo?.benefits ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {companyInfo.benefits.split('\n').filter(line => line.trim()).map((benefit, i) => (
                                            <motion.div 
                                                key={i}
                                                whileHover={{ y: -5 }}
                                                className="bg-white dark:bg-slate-900/50 p-6 rounded-[32px] border border-slate-50 dark:border-white/5 flex items-start gap-4 shadow-sm hover:shadow-xl transition-all duration-500 group"
                                            >
                                                <div className="h-10 w-10 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                                    <CheckCircle2 className="h-5 w-5" />
                                                </div>
                                                <p className="text-sm font-black text-[#004D5C] dark:text-slate-300 italic leading-tight">
                                                    {benefit.trim().replace(/^[•\-\*]\s*/, '')}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-4 text-slate-400 font-medium italic">
                                        <Heart className="h-6 w-6 text-rose-500" />
                                        Hãy gia nhập để trải nghiệm văn hóa tuyệt vời của chúng tôi.
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>

                    <motion.div 
                        layout
                        className="grid grid-cols-1 gap-6"
                    >
                        {isLoading ? (
                            <>
                                <JobCardSkeleton />
                                <JobCardSkeleton />
                                <JobCardSkeleton />
                            </>
                        ) : (
                            <AnimatePresence mode='popLayout'>
                                {filteredJobs.map((job, index) => (
                                    <InteractiveJobCard 
                                        key={job.id} 
                                        job={job} 
                                        companyInfo={companyInfo} 
                                        index={index} 
                                        __={__} 
                                    />
                                ))}
                            </AnimatePresence>
                        )}

                        {!isLoading && filteredJobs.length === 0 && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="py-32 text-center"
                            >
                                <div className="text-6xl mb-8">🔍</div>
                                <h3 className="text-2xl font-black text-[#004D5C] dark:text-[#CCEBF0] italic mb-2 tracking-tighter">{__('Jobs No Found Title')}</h3>
                                <p className="text-slate-400 dark:text-slate-500 font-medium italic">{__('Jobs No Found Desc')}</p>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </section>

            <section className="py-40 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-white/5 relative transition-colors duration-500">
                 <div className="max-w-7xl mx-auto px-12">
                    <div className="bg-[#004D5C] rounded-[60px] p-20 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl font-black text-white italic tracking-tighter mb-4">{__('Jobs Talent Title')}</h2>
                            <p className="text-white/60 font-medium italic max-w-md leading-relaxed">{__('Jobs Talent Desc')}</p>
                        </div>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative z-10 px-12 py-5 bg-[#006D7E] text-white rounded-[24px] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-black/20 hover:bg-[#005a69] transition-all duration-500"
                        >
                            {__('Jobs Talent Button')}
                        </motion.button>
                    </div>
                 </div>
            </section>
        </RecruitmentLayout>
    );
}
