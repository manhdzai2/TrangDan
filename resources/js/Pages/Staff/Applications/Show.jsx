import StaffLayout from '@/Layouts/StaffLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { 
    ArrowLeft, Mail, Phone, Calendar, 
    FileText, CheckCircle2, XCircle, Clock,
    Download, ExternalLink, User, Briefcase, Eye
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Show({ application }) {
    const { data, put, processing } = useForm({
        status: application.status
    });

    const updateStatus = (newStatus) => {
        put(route('staff.applications.updateStatus', { 
            application: application.id, 
            status: newStatus 
        }), { preserveScroll: true });
    };

    const statusConfig = {
        pending: { label: 'Chờ duyệt', color: 'bg-amber-500', bg: 'bg-amber-50', text: 'text-amber-600', icon: Clock },
        reviewed: { label: 'Đã xem', color: 'bg-blue-500', bg: 'bg-blue-50', text: 'text-blue-600', icon: Eye },
        accepted: { label: 'Tiếp nhận', color: 'bg-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-600', icon: CheckCircle2 },
        rejected: { label: 'Từ chối', color: 'bg-rose-500', bg: 'bg-rose-50', text: 'text-rose-600', icon: XCircle },
    };

    const currentStatus = statusConfig[application.status];

    return (
        <StaffLayout>
            <Head title={`Ứng viên: ${application.candidate.name}`} />

            <div className="max-w-5xl mx-auto pb-20">
                <div className="mb-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('staff.applications.index')}>
                            <motion.button 
                                whileHover={{ scale: 1.1, x: -5 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-3.5 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-400 hover:text-indigo-600 transition-all"
                            >
                                <ArrowLeft className="h-6 w-6" />
                            </motion.button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-black text-[#1E293B] tracking-tight mb-1 italic">Chi tiết ứng viên</h1>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Đánh giá hồ sơ và cập nhật trạng thái</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {Object.entries(statusConfig).map(([key, config]) => (
                            <motion.button
                                key={key}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => updateStatus(key)}
                                disabled={processing}
                                className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                                    application.status === key 
                                    ? `${config.bg} ${config.text} border-${key === 'pending' ? 'amber' : key === 'reviewed' ? 'blue' : key === 'accepted' ? 'emerald' : 'rose'}-200 shadow-sm ring-2 ring-${key === 'pending' ? 'amber' : key === 'reviewed' ? 'blue' : key === 'accepted' ? 'emerald' : 'rose'}-500/20` 
                                    : 'bg-white text-slate-400 border-slate-100 hover:bg-slate-50'
                                }`}
                            >
                                {config.label}
                            </motion.button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left: Candidate Info */}
                    <div className="lg:col-span-2 space-y-10">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white p-10 rounded-[50px] shadow-sm border border-slate-100 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                                <User className="h-48 w-48 text-indigo-900" />
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                                <div className="h-32 w-32 bg-indigo-50 rounded-[40px] flex items-center justify-center font-black text-4xl text-indigo-600 shadow-sm border border-indigo-100">
                                    {application.candidate.name.charAt(0)}
                                </div>
                                <div className="text-center md:text-left">
                                    <h2 className="text-4xl font-black text-[#1E293B] italic tracking-tight mb-4">{application.candidate.name}</h2>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-xs font-bold text-slate-600">
                                            <Mail className="h-4 w-4 text-indigo-500" /> {application.candidate.email}
                                        </div>
                                        {application.candidate.phone && (
                                            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-xs font-bold text-slate-600">
                                                <Phone className="h-4 w-4 text-emerald-500" /> {application.candidate.phone}
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-xs font-bold text-slate-600">
                                            <Calendar className="h-4 w-4 text-amber-500" /> {new Date(application.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-12 border-t border-slate-50 grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <Briefcase className="h-3.5 w-3.5" /> Vị trí ứng tuyển
                                    </h4>
                                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100/50">
                                        <div className="font-black text-slate-800 text-lg italic mb-2">{application.vacancy.title}</div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{application.vacancy.type} • {application.vacancy.location}</div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <FileText className="h-3.5 w-3.5" /> Trạng thái hiện tại
                                    </h4>
                                    <div className={`${currentStatus.bg} p-6 rounded-3xl border border-current opacity-20`}></div>
                                    <div className={`-mt-20 p-6 flex flex-col items-center justify-center relative z-10 ${currentStatus.text}`}>
                                        <currentStatus.icon className="h-8 w-8 mb-2" />
                                        <span className="font-black italic text-xl">{currentStatus.label}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-10 rounded-[50px] shadow-sm border border-slate-100"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-black text-[#1E293B] italic flex items-center gap-3">
                                    <FileText className="h-6 w-6 text-indigo-600" /> Hồ sơ năng lực (CV)
                                </h3>
                                <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:scale-105 transition-all">
                                    <Download className="h-4 w-4" /> Tải CV
                                </button>
                            </div>

                            <div className="bg-slate-50 rounded-[40px] p-20 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
                                <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-indigo-100 shadow-xl border border-slate-100">
                                    <FileText className="h-10 w-10 text-slate-300" />
                                </div>
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px] mb-8">CV_NguyenVanA_SeniorReact.pdf</p>
                                <button className="text-indigo-600 font-black text-xs flex items-center gap-2 hover:gap-3 transition-all">
                                    XEM TRỰC TIẾP <ExternalLink className="h-4 w-4" />
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Actions & Notes */}
                    <div className="space-y-10">
                        <div className="bg-[#1E293B] p-10 rounded-[50px] shadow-2xl text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
                            
                            <h4 className="text-xl font-black italic mb-8 relative z-10 tracking-tight">Ghi chú tuyển dụng</h4>
                            
                            <textarea 
                                placeholder="Ghi lại nhận xét về ứng viên này..."
                                className="w-full bg-white/5 border border-white/10 rounded-[30px] p-6 text-xs font-medium placeholder:text-white/20 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all resize-none italic h-48"
                            ></textarea>
                            
                            <button className="w-full mt-6 py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border border-white/5 relative z-10">
                                Lưu ghi chú
                            </button>
                        </div>

                        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                            <h4 className="text-slate-800 font-black italic text-lg mb-6 flex items-center gap-3">
                                <Clock className="h-5 w-5 text-indigo-500" /> Lịch sử hoạt động
                            </h4>
                            <div className="space-y-6">
                                {[
                                    { t: 'Trạng thái: Đã xem', d: 'Hôm nay, 09:30', s: 'bg-blue-500' },
                                    { t: 'Nộp hồ sơ thành công', d: '24/03/2026, 14:15', s: 'bg-emerald-500' },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 relative">
                                        {i < 1 && <div className="absolute left-[7px] top-6 w-0.5 h-10 bg-slate-100"></div>}
                                        <div className={`h-4 w-4 rounded-full border-4 border-white shadow-sm mt-1 z-10 ${item.s}`}></div>
                                        <div>
                                            <div className="text-xs font-black text-slate-700">{item.t}</div>
                                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{item.d}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StaffLayout>
    );
}
