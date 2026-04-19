import RecruitmentLayout from '@/Layouts/RecruitmentLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Clock, CheckCircle, XCircle, AlertCircle, ArrowRight, Eye, X, Mail, Phone, MapPin, User, FileText, Download } from 'lucide-react';
import { useTranslation } from '@/Hooks/useTranslation';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

export default function MyApplications({ applications }) {
    const { __ } = useTranslation();
    const [selectedApp, setSelectedApp] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const openDetails = (app) => {
        setSelectedApp(app);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setTimeout(() => setSelectedApp(null), 300);
    };

    const mapStatusConfig = (status) => {
        switch(status) {
            case 'pending':  return { label: __('Apps Status Pending'),  color: 'amber',   icon: <Clock className="h-4 w-4" /> };
            case 'reviewed': return { label: __('Apps Status Reviewed'), color: 'indigo', icon: <AlertCircle className="h-4 w-4" /> };
            case 'accepted': return { label: __('Apps Status Accepted'),   color: 'emerald', icon: <CheckCircle className="h-4 w-4" /> };
            case 'rejected': return { label: __('Apps Status Rejected'),    color: 'rose',    icon: <XCircle className="h-4 w-4" /> };
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
            <Head title={`${__('My Applications')} | Almus Tech`} />

            <section className="pt-36 pb-28 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 min-h-screen">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#EEF8F9] dark:bg-[#002B33] text-[#006D7E] rounded-full text-[10px] font-black uppercase tracking-[0.25em] mb-6 border border-[#006D7E]/10">
                            <Briefcase className="h-3 w-3" /> {__('Apps My Apps Badge')}
                        </div>
                        <h1 className="text-5xl font-black text-[#004D5C] dark:text-[#CCEBF0] tracking-tighter italic leading-none mb-4">
                            {__('Apps My Apps Title')}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium italic">{__('Apps My Apps Sub')}</p>
                    </motion.div>

                    {applications.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white dark:bg-slate-900 rounded-[60px] p-20 text-center shadow-sm border border-slate-100 dark:border-white/5"
                        >
                            <div className="text-6xl mb-8">📋</div>
                            <h3 className="text-2xl font-black text-[#004D5C] dark:text-[#CCEBF0] italic mb-3 tracking-tighter">{__('Apps Empty Title')}</h3>
                            <p className="text-slate-500 dark:text-slate-400 font-medium italic mb-10">{__('Apps Empty Desc')}</p>
                            <Link 
                                href="/jobs"
                                className="inline-flex items-center gap-2 px-10 py-4 bg-[#004D5C] text-white rounded-[24px] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#006D7E] transition-all shadow-xl"
                            >
                                {__('Apps Explore Button')} <ArrowRight className="h-4 w-4" />
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
                                                            {__('Apps Label Applied')}: {new Date(app.created_at).toLocaleDateString()}
                                                        </span>
                                                        {app.start_date && (
                                                            <span className="flex items-center gap-1.5">
                                                                <Clock className="h-3 w-3" />
                                                                {__('Apps Label Start')}: {new Date(app.start_date).toLocaleDateString()}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-sm ${colorMap[statusConfig.color]}`}>
                                                    {statusConfig.icon} {statusConfig.label}
                                                </span>
                                                <motion.button 
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => openDetails(app)}
                                                    className="p-3 text-slate-400 hover:text-[#006D7E] bg-slate-50 dark:bg-slate-800 rounded-2xl transition-all border border-slate-100 dark:border-white/5"
                                                    title={__('View Details')}
                                                >
                                                    <Eye className="h-5 w-5" />
                                                </motion.button>
                                            </div>
                                        </div>

                                        {/* Progress bar dựa theo trạng thái */}
                                        <div className="mt-8 pt-8 border-t border-slate-50 dark:border-white/5">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="text-[9px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">{__('Apps Progress')}</div>
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
                                                <span>{__('Apps Status Applied')}</span>
                                                <span>{__('Apps Status Reviewing')}</span>
                                                <span>{__('Apps Status Result')}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
            <AnimatePresence>
                {showModal && selectedApp && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-10">
                        {/* Overlay */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                            className="absolute inset-0 bg-[#001A1F]/90 backdrop-blur-xl"
                        />

                        {/* Modal Content */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 30, rotateX: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30, rotateX: 10 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-2xl bg-white dark:bg-[#001D21] rounded-[48px] overflow-hidden shadow-2xl border border-white/20 dark:border-white/5 max-h-[85vh] flex flex-col"
                        >
                            {/* Header */}
                            <div className="relative p-10 pb-6 flex justify-between items-start border-b border-slate-50 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EEF8F9] dark:bg-[#002B33] text-[#006D7E] rounded-full text-[9px] font-black uppercase tracking-widest mb-3">
                                        <Briefcase className="h-3 w-3" /> {selectedApp.vacancy?.title || 'ALMUS TECH Application'}
                                    </div>
                                    <h2 className="text-3xl font-black text-[#004D5C] dark:text-[#CCEBF0] tracking-tighter italic leading-none">
                                        {selectedApp.applied_position || selectedApp.vacancy?.title}
                                    </h2>
                                </div>
                                <button 
                                    onClick={closeModal}
                                    className="p-3 bg-white dark:bg-slate-900 text-slate-400 hover:text-rose-500 rounded-2xl transition-all shadow-sm border border-slate-100 dark:border-white/5"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            {/* Scrollable Body */}
                            <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
                                {/* Status Badge */}
                                <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-900/50 rounded-[32px] border border-slate-100 dark:border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shadow-inner ${colorMap[mapStatusConfig(selectedApp.status).color]}`}>
                                            {mapStatusConfig(selectedApp.status).icon}
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{__('Apps Detail Status')}</div>
                                            <div className="text-sm font-black text-[#004D5C] dark:text-[#CCEBF0] uppercase tracking-tighter italic">
                                                {mapStatusConfig(selectedApp.status).label}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{__('Apps Detail Date')}</div>
                                        <div className="text-sm font-black text-[#004D5C] dark:text-[#CCEBF0] italic tracking-tighter">
                                            {new Date(selectedApp.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>

                                {/* Information Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { label: __('Jobs Apply Label Email'), value: selectedApp.email, icon: <Mail /> },
                                        { label: __('Jobs Apply Label Phone'), value: selectedApp.phone, icon: <Phone /> },
                                        { label: __('Jobs Apply Label Address'), value: selectedApp.address, icon: <MapPin /> },
                                        { label: __('Jobs Apply Label Age'), value: selectedApp.age, icon: <User /> },
                                    ].map((info, idx) => (
                                        <div key={idx} className="p-5 bg-white dark:bg-[#002B33]/30 rounded-[28px] border border-slate-50 dark:border-white/5 flex items-center gap-4 shadow-sm">
                                            <div className="h-10 w-10 bg-[#EEF8F9] dark:bg-[#004D5C] rounded-xl flex items-center justify-center text-[#006D7E] dark:text-[#CCEBF0]">
                                                {cloneElement(info.icon, { className: "h-5 w-5" })}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{info.label.replace(' *', '')}</div>
                                                <div className="text-xs font-bold text-[#004D5C] dark:text-[#E6F4F6] truncate drop-shadow-sm">{info.value}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Cover Letter */}
                                {selectedApp.cover_letter && (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <FileText className="h-5 w-5 text-[#006D7E]" />
                                            <h3 className="text-sm font-black text-[#004D5C] dark:text-[#CCEBF0] uppercase tracking-widest italic">{__('Jobs Apply Label Cover Letter')}</h3>
                                        </div>
                                        <div 
                                            className="p-8 bg-slate-50 dark:bg-slate-900/50 rounded-[40px] text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic border border-slate-100 dark:border-white/5 prose dark:prose-invert max-w-none"
                                            dangerouslySetInnerHTML={{ __html: selectedApp.cover_letter }}
                                        />
                                    </div>
                                )}

                                {/* CV Section */}
                                {selectedApp.cv_path && (
                                    <div className="p-8 bg-emerald-50/50 dark:bg-emerald-500/5 rounded-[40px] border border-emerald-100 dark:border-emerald-500/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                                        <div className="flex items-center gap-5">
                                            <div className="h-14 w-14 bg-emerald-100 dark:bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-600">
                                                <Download className="h-7 w-7" />
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-black text-[#004D5C] dark:text-[#CCEBF0] tracking-tighter italic leading-none mb-1">{__('Jobs Apply Label CV')}</h4>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">application_cv_{selectedApp.id}.pdf</p>
                                            </div>
                                        </div>
                                        <a 
                                            href={`/storage/${selectedApp.cv_path}`}
                                            target="_blank"
                                            className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center gap-2 group"
                                        >
                                            {__('Apps Detail Download CV')}
                                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="p-8 bg-slate-50/50 dark:bg-white/5 border-t border-slate-50 dark:border-white/5 text-center">
                                <button 
                                    onClick={closeModal}
                                    className="px-10 py-3.5 bg-[#004D5C] text-white rounded-[20px] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#006D7E] transition-all shadow-xl"
                                >
                                    {__('Apps Close')}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </RecruitmentLayout>
    );
}

const cloneElement = (element, props) => {
    return { ...element, props: { ...element.props, ...props } };
};
