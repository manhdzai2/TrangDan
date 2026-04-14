import RecruitmentLayout from '@/Layouts/RecruitmentLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, MapPin, Clock, Briefcase, 
    ChevronRight, Filter, Sparkles 
} from 'lucide-react';

export default function Index({ vacancies }) {
    const [search, setSearch] = useState('');
    
    const filteredJobs = vacancies.filter(job => 
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <RecruitmentLayout>
            <Head title="Cơ hội nghề nghiệp | AMT SOLUTIONS" />
            
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
                                <Sparkles className="h-3 w-3 animate-pulse" /> KHÁM PHÁ CƠ HỘI
                            </div>
                            <h1 className="text-7xl font-black text-[#004D5C] dark:text-[#CCEBF0] tracking-tighter italic leading-none">
                                Tìm Kiếm <br /> <span className="text-[#006D7E]">Vị Trí Của Bạn</span>
                            </h1>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex-1 max-w-xl"
                        >
                            <div className="relative group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5 group-focus-within:text-[#006D7E] transition-colors duration-500" />
                                <input 
                                    type="text" 
                                    placeholder="Tên công việc, địa điểm..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full bg-[#f8fafc] dark:bg-slate-900 border-none rounded-[32px] pl-16 pr-8 py-6 text-sm font-bold text-[#004D5C] dark:text-white focus:ring-4 focus:ring-[#006D7E]/10 transition-all duration-500 shadow-inner italic"
                                />
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                     <div className="h-2 w-2 rounded-full bg-[#006D7E] animate-ping"></div>
                                     <span className="text-[10px] font-black text-[#006D7E] uppercase tracking-widest">{filteredJobs.length} vị trí</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div 
                        layout
                        className="grid grid-cols-1 gap-6"
                    >
                        <AnimatePresence mode='popLayout'>
                            {filteredJobs.map((job, index) => (
                                <motion.div
                                    key={job.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ 
                                        duration: 0.6, 
                                        delay: index * 0.05,
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                >
                                    <Link 
                                        href={`/jobs/${job.id}`}
                                        className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[48px] border border-slate-50 dark:border-white/5 shadow-sm hover:shadow-2xl hover:shadow-[#006D7E]/5 transition-all duration-700 flex flex-col md:flex-row md:items-center justify-between gap-8 group overflow-hidden relative"
                                    >
                                        <div className="absolute top-0 left-0 w-2 h-full bg-[#006D7E] -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="px-3 py-1 bg-[#EEF8F9] dark:bg-[#002B33] text-[#006D7E] rounded-full text-[9px] font-black uppercase tracking-widest border border-[#006D7E]/5">
                                                    {job.type}
                                                </div>
                                                <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">POSTED RECENTLY</div>
                                            </div>
                                            <h3 className="text-3xl font-black text-[#004D5C] dark:text-[#CCEBF0] italic tracking-tight group-hover:text-[#006D7E] transition-colors duration-500 mb-6">{job.title}</h3>
                                            <div className="flex flex-wrap gap-8">
                                                <div className="flex items-center gap-2 text-slate-400 text-xs font-medium italic">
                                                    <MapPin className="h-4 w-4 text-[#006D7E]" /> {job.location}
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-400 text-xs font-medium italic">
                                                    <Clock className="h-4 w-4 text-[#006D7E]" /> {job.created_at_diff || 'Hôm nay'}
                                                </div>
                                                <div className="flex items-center gap-2 text-[#006D7E] text-sm font-black italic">
                                                    <Briefcase className="h-4 w-4" /> {job.salary}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-10">
                                            <div className="hidden lg:block text-right">
                                                <div className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest mb-1 italic">Yêu cầu</div>
                                                <div className="text-sm font-black text-[#004D5C] dark:text-[#CCEBF0] italic">Senior Experience</div>
                                            </div>
                                            <motion.div 
                                                whileHover={{ x: 5 }}
                                                className="h-20 w-20 rounded-full border border-slate-100 dark:border-white/5 flex items-center justify-center group-hover:bg-[#006D7E] group-hover:border-[#006D7E] transition-all duration-700 shadow-sm"
                                            >
                                                <ChevronRight className="h-8 w-8 text-slate-400 dark:text-slate-600 group-hover:text-white transition-all duration-500" />
                                            </motion.div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {filteredJobs.length === 0 && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="py-32 text-center"
                            >
                                <div className="text-6xl mb-8">🔍</div>
                                <h3 className="text-2xl font-black text-[#004D5C] dark:text-[#CCEBF0] italic mb-2 tracking-tighter">Không tìm thấy vị trí phù hợp</h3>
                                <p className="text-slate-400 dark:text-slate-500 font-medium italic">Hãy thử tìm kiếm với từ khóa khác hoặc quay lại sau.</p>
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
                            <h2 className="text-4xl font-black text-white italic tracking-tighter mb-4">Bạn chưa tìm thấy vị trí mong muốn?</h2>
                            <p className="text-white/60 font-medium italic max-w-md leading-relaxed">Gửi hồ sơ tự do cho chúng tôi. Chúng tôi luôn chào đón những tâm hồn sáng tạo và đam mê công nghệ.</p>
                        </div>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative z-10 px-12 py-5 bg-[#006D7E] text-white rounded-[24px] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-black/20 hover:bg-[#005a69] transition-all duration-500"
                        >
                            Gửi hồ sơ tự do
                        </motion.button>
                    </div>
                 </div>
            </section>
        </RecruitmentLayout>
    );
}
