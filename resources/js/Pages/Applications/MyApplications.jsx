import RecruitmentLayout from '@/Layouts/RecruitmentLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Clock, CheckCircle, XCircle, AlertCircle, ArrowRight } from 'lucide-react';

export default function MyApplications({ applications }) {
    const mapStatusConfig = (status) => {
        switch(status) {
            case 'pending':  return { label: 'Chờ duyệt',  color: 'amber',   icon: <Clock className="h-4 w-4" /> };
            case 'reviewed': return { label: 'Đang xem xét', color: 'indigo', icon: <AlertCircle className="h-4 w-4" /> };
            case 'accepted': return { label: 'Đã tuyển',   color: 'emerald', icon: <CheckCircle className="h-4 w-4" /> };
            case 'rejected': return { label: 'Từ chối',    color: 'rose',    icon: <XCircle className="h-4 w-4" /> };
            default: return { label: status, color: 'slate', icon: null };
        }
    };

    const colorMap = {
        amber:   'bg-amber-50 text-amber-700 border-amber-200',
        indigo:  'bg-indigo-50 text-indigo-700 border-indigo-200',
        emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        rose:    'bg-rose-50 text-rose-700 border-rose-200',
        slate:   'bg-slate-50 text-slate-700 border-slate-200',
    };

    return (
        <RecruitmentLayout>
            <Head title="Hồ sơ đã nộp | Almus Tech" />

            <section className="pt-36 pb-28 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 min-h-screen">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#EEF8F9] dark:bg-[#002B33] text-[#006D7E] rounded-full text-[10px] font-black uppercase tracking-[0.25em] mb-6 border border-[#006D7E]/10">
                            <Briefcase className="h-3 w-3" /> HỒ SƠ CỦA TÔI
                        </div>
                        <h1 className="text-5xl font-black text-[#004D5C] dark:text-[#CCEBF0] tracking-tighter italic leading-none mb-4">
                            Hồ sơ đã nộp
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium italic">Theo dõi trạng thái các đơn ứng tuyển của bạn tại Almus Tech.</p>
                    </motion.div>

                    {applications.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white dark:bg-slate-900 rounded-[60px] p-20 text-center shadow-sm border border-slate-100 dark:border-white/5"
                        >
                            <div className="text-6xl mb-8">📋</div>
                            <h3 className="text-2xl font-black text-[#004D5C] dark:text-[#CCEBF0] italic mb-3 tracking-tighter">Chưa có hồ sơ nào</h3>
                            <p className="text-slate-500 dark:text-slate-400 font-medium italic mb-10">Hãy khám phá các cơ hội việc làm và nộp hồ sơ ngay hôm nay!</p>
                            <Link 
                                href="/jobs"
                                className="inline-flex items-center gap-2 px-10 py-4 bg-[#004D5C] text-white rounded-[24px] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#006D7E] transition-all shadow-xl"
                            >
                                Xem tin tuyển dụng <ArrowRight className="h-4 w-4" />
                            </Link>
                        </motion.div>
                    ) : (
                        <div className="space-y-6">
                            {applications.map((app, index) => {
                                const statusConfig = mapStatusConfig(app.status);
                                return (
                                    <motion.div
                                        key={app.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                                        className="bg-white dark:bg-slate-900 rounded-[48px] p-10 shadow-sm border border-slate-100 dark:border-white/5 hover:shadow-lg hover:border-[#006D7E]/20 transition-all duration-500 group"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div className="flex items-center gap-6">
                                                <div className="h-16 w-16 bg-[#EEF8F9] dark:bg-[#002B33] rounded-[24px] flex items-center justify-center text-[#006D7E] font-black text-2xl italic shadow-inner group-hover:bg-[#004D5C] group-hover:text-white transition-all duration-500">
                                                    {app.vacancy?.title?.charAt(0) || '?'}
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-black text-[#004D5C] dark:text-[#CCEBF0] italic tracking-tight mb-1.5 group-hover:text-[#006D7E] transition-colors">
                                                        {app.applied_position || app.vacancy?.title || 'N/A'}
                                                    </h3>
                                                    <div className="flex flex-wrap gap-4 text-[10px] text-slate-400 font-black uppercase tracking-wider">
                                                        <span className="flex items-center gap-1.5">
                                                            <Calendar className="h-3 w-3" />
                                                            Nộp: {new Date(app.created_at).toLocaleDateString('vi-VN')}
                                                        </span>
                                                        {app.start_date && (
                                                            <span className="flex items-center gap-1.5">
                                                                <Clock className="h-3 w-3" />
                                                                Đi làm: {new Date(app.start_date).toLocaleDateString('vi-VN')}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-sm ${colorMap[statusConfig.color]}`}>
                                                    {statusConfig.icon} {statusConfig.label}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Progress bar dựa theo trạng thái */}
                                        <div className="mt-8 pt-8 border-t border-slate-50 dark:border-white/5">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="text-[9px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">Tiến trình hồ sơ</div>
                                            </div>
                                            <div className="relative h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full rounded-full transition-all duration-700 ${
                                                        app.status === 'pending'  ? 'w-1/4 bg-amber-400' :
                                                        app.status === 'reviewed' ? 'w-2/4 bg-indigo-400' :
                                                        app.status === 'accepted' ? 'w-full bg-emerald-400' :
                                                        app.status === 'rejected' ? 'w-full bg-rose-400' : 'w-0'
                                                    }`}
                                                />
                                            </div>
                                            <div className="flex justify-between mt-2 text-[9px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">
                                                <span>Đã nộp</span>
                                                <span>Đang xem</span>
                                                <span>Kết quả</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </RecruitmentLayout>
    );
}
