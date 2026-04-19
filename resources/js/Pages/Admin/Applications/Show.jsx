import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { 
    ChevronLeft, Mail, Phone, MapPin, 
    Calendar, Briefcase, FileText, CheckCircle, XCircle, User, Download, Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/Hooks/useTranslation';

export default function Show({ application }) {
    const { __ } = useTranslation();

    const mapStatusClass = (status) => {
        switch(status) {
            case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'reviewed': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
            case 'accepted': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'rejected': return 'bg-rose-50 text-rose-600 border-rose-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    const mapStatusText = (status) => {
        switch(status) {
            case 'pending': return __('Admin Status Pending');
            case 'reviewed': return __('Admin Status Reviewed');
            case 'accepted': return __('Admin Status Accepted');
            case 'rejected': return __('Admin Status Rejected');
            default: return status;
        }
    };

    const updateStatus = (status) => {
        if (confirm(__('Admin Confirm Action'))) {
            router.put(route('admin.applications.updateStatus', application.id), { status });
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <AdminLayout>
            <Head title={`${__('Admin App Detail Title')}: ${application.name}`} />

            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-10"
            >
                <Link 
                    href={route('admin.applications.index')}
                    className="group inline-flex items-center gap-3 text-slate-400 hover:text-[#006D7E] font-black text-[10px] uppercase tracking-[0.2em] transition-all"
                >
                    <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 group-hover:bg-[#006D7E] group-hover:text-white transition-all">
                        <ChevronLeft className="h-5 w-5" />
                    </div>
                    {__('Admin Back To List')}
                </Link>
            </motion.div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 lg:grid-cols-3 gap-10"
            >
                {/* Left Column: Profile info */}
                <div className="lg:col-span-2 space-y-10">
                    <motion.div 
                        variants={itemVariants}
                        className="bg-white p-12 rounded-[50px] shadow-sm border border-white/50 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#EEF8F9] rounded-full translate-x-1/2 -translate-y-1/2 opacity-20 blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
                        
                        <div className="absolute top-10 right-10 z-10">
                            <motion.span 
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm border ${mapStatusClass(application.status)}`}
                            >
                                {mapStatusText(application.status)}
                            </motion.span>
                        </div>

                        <div className="flex items-start gap-10 mb-12 relative z-10">
                            <motion.div 
                                whileHover={{ rotate: 5, scale: 1.05 }}
                                className="h-28 w-28 bg-[#004D5C] text-white rounded-[40px] flex items-center justify-center text-5xl font-black italic shadow-2xl shadow-[#004d5c]/20"
                            >
                                {application.name.charAt(0)}
                            </motion.div>
                            <div>
                                <h1 className="text-5xl font-black text-[#004D5C] tracking-tighter italic mb-4 leading-none">{application.name}</h1>
                                <div className="flex flex-wrap gap-6 text-slate-400 font-black uppercase tracking-widest text-[10px]">
                                    <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-[#006D7E]" /> {application.email}</div>
                                    {application.phone && (
                                        <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-[#006D7E]" /> {application.phone}</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Grid thông tin cá nhân đầy đủ */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10 border-y border-slate-50 relative z-10">
                            <InfoCard icon={<Briefcase className="h-4 w-4" />} label={__('Admin Table Position')} value={application.applied_position || application.vacancy?.title} />
                            <InfoCard icon={<User className="h-4 w-4" />} label={__('Admin Age')} value={application.age ? `${application.age}` : 'N/A'} />
                            <InfoCard icon={<MapPin className="h-4 w-4" />} label={__('Admin Address')} value={application.address || 'N/A'} />
                            <InfoCard icon={<Calendar className="h-4 w-4" />} label={__('Admin Date Submitted')} value={new Date(application.created_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })} />
                            <InfoCard icon={<Clock className="h-4 w-4" />} label={__('Admin Start Date')} value={application.start_date ? new Date(application.start_date).toLocaleDateString() : 'N/A'} />
                            <InfoCard icon={<FileText className="h-4 w-4" />} label={__('Admin Table App Source')} value={application.source || __('Admin Source Direct')} />
                        </div>

                        <div className="mt-12 relative z-10">
                            <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                                <FileText className="h-4 w-4 text-[#006D7E]" /> {__('Admin Intro Content')}
                            </div>
                            <div className="bg-[#F3F7F8] p-10 rounded-[40px] text-[#004D5C] leading-relaxed font-medium italic shadow-inner border border-white/50 text-sm">
                                {application.cover_letter || __('Admin No Cover Letter')}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Actions & Meta */}
                <div className="space-y-10">
                    <motion.div 
                        variants={itemVariants}
                        className="bg-[#004D5C] p-12 rounded-[50px] shadow-2xl relative overflow-hidden group"
                    >
                        <motion.div 
                            animate={{ 
                                scale: [1, 1.2, 1],
                                rotate: [0, 90, 0]
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"
                        ></motion.div>
                        
                        <h3 className="text-white font-black text-2xl italic mb-8 tracking-tighter relative z-10">{__('Admin Selection Decision')}</h3>
                        <div className="space-y-6 relative z-10">
                            <motion.button 
                                whileHover={{ scale: 1.02, y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => updateStatus('accepted')}
                                className="w-full bg-emerald-500 text-white font-black py-6 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-emerald-900/40 uppercase text-[11px] tracking-[0.2em]"
                            >
                                <CheckCircle className="h-6 w-6" /> {__('Admin Accept Candidate')}
                            </motion.button>
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => updateStatus('rejected')}
                                className="w-full bg-white/10 text-white hover:bg-rose-500 font-black py-6 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 border border-white/10 uppercase text-[11px] tracking-[0.2em]"
                            >
                                <XCircle className="h-6 w-6" /> {__('Admin Reject Candidate')}
                            </motion.button>
                        </div>
                        <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.3em] text-center mt-10 relative z-10 leading-relaxed italic">
                            {__('Admin Status Update Warning')}
                        </p>
                    </motion.div>

                    <motion.div 
                        variants={itemVariants}
                        className="bg-white p-10 rounded-[50px] shadow-sm border border-white/50 group"
                    >
                        <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                            <User className="h-4 w-4 text-[#006D7E]" /> {__('Admin Additional Info')}
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{__('Admin System ID')}</div>
                                <div className="font-mono text-[11px] font-black text-slate-300">#ALMUS-APP-{application.id.toString().padStart(4, '0')}</div>
                            </div>
                            {application.cv_path && (
                                <motion.a 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href={`/storage/${application.cv_path}`}
                                    target="_blank"
                                    className="flex items-center justify-between p-6 bg-[#EEF8F9] rounded-[32px] border border-[#006D7E]/10 group/cv"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-[#006D7E] shadow-sm group-hover/cv:bg-[#004D5C] group-hover/cv:text-white transition-all">
                                            <Download className="h-5 w-5" />
                                        </div>
                                        <span className="text-[10px] font-black text-[#004D5C] uppercase tracking-widest">{__('Admin CV PDF')}</span>
                                    </div>
                                </motion.a>
                            )}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </AdminLayout>
    );
}

function InfoCard({ icon, label, value }) {
    return (
        <div className="bg-[#F3F7F8] px-6 py-5 rounded-[24px] shadow-inner">
            <div className="flex items-center gap-2 text-[9px] font-black text-[#006D7E] uppercase tracking-[0.25em] mb-2">
                {icon} {label}
            </div>
            <div className="text-lg font-black text-[#004D5C] italic tracking-tight leading-tight">{value}</div>
        </div>
    );
}
