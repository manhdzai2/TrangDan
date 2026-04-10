import StaffLayout from '@/Layouts/StaffLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { 
    ArrowLeft, Save, Check, AlertCircle, 
    Briefcase, MapPin, DollarSign, Calendar,
    FileText, HelpCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        location: '',
        salary: '',
        type: 'Full-time',
        deadline: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('staff.jobs.store'));
    };

    return (
        <StaffLayout>
            <Head title="Đăng tin tuyển dụng mới" />

            <div className="max-w-4xl mx-auto">
                <div className="mb-10 flex items-center gap-4">
                    <Link href={route('staff.jobs.index')}>
                        <motion.button 
                            whileHover={{ scale: 1.1, x: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3.5 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-400 hover:text-indigo-600 transition-all"
                        >
                            <ArrowLeft className="h-6 w-6" />
                        </motion.button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-[#1E293B] tracking-tight mb-1 italic">Đăng Tin Tuyển Dụng</h1>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Tiếp cận hàng nghìn ứng viên tiềm năng</p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-8 pb-20">
                    {/* Main Info */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-10 rounded-[45px] shadow-sm border border-slate-100 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 text-slate-50 opacity-10 pointer-events-none">
                            <Briefcase className="h-24 w-24" />
                        </div>
                        
                        <h3 className="text-lg font-black text-[#1E293B] italic mb-10 flex items-center gap-3">
                            <span className="h-8 w-8 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xs shadow-sm">01</span>
                            Thông tin cơ bản
                        </h3>

                        <div className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Tên vị trí tuyển dụng</label>
                                <input 
                                    type="text" 
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    placeholder="Ví dụ: Senior React Developer" 
                                    className="w-full bg-slate-50 border-none rounded-[24px] px-8 py-5 text-sm font-black text-[#1E293B] focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-inner placeholder:text-slate-300 italic" 
                                />
                                {errors.title && <p className="text-rose-500 text-[10px] font-bold mt-1 px-3 uppercase tracking-widest italic">{errors.title}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Địa điểm</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                        <input 
                                            type="text" 
                                            value={data.location}
                                            onChange={e => setData('location', e.target.value)}
                                            placeholder="Hà Nội / Remote" 
                                            className="w-full bg-slate-50 border-none rounded-[24px] pl-14 pr-8 py-5 text-sm font-black text-[#1E293B] focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-inner placeholder:text-slate-300 italic" 
                                        />
                                    </div>
                                    {errors.location && <p className="text-rose-500 text-[10px] font-bold mt-1 px-3">{errors.location}</p>}
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Mức lương</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                        <input 
                                            type="text" 
                                            value={data.salary}
                                            onChange={e => setData('salary', e.target.value)}
                                            placeholder="Thỏa thuận / 1000$ - 2000$" 
                                            className="w-full bg-slate-50 border-none rounded-[24px] pl-14 pr-8 py-5 text-sm font-black text-[#1E293B] focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-inner placeholder:text-slate-300 italic" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Details */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-10 rounded-[45px] shadow-sm border border-slate-100"
                    >
                        <h3 className="text-lg font-black text-[#1E293B] italic mb-10 flex items-center gap-3">
                            <span className="h-8 w-8 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xs shadow-sm">02</span>
                            Hình thức & Thời hạn
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Loại hình</label>
                                <select 
                                    value={data.type}
                                    onChange={e => setData('type', e.target.value)}
                                    className="w-full bg-slate-50 border-none rounded-[24px] px-8 py-5 text-sm font-black text-[#1E293B] focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-inner cursor-pointer italic"
                                >
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Intern">Intern</option>
                                </select>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Hạn nộp hồ sơ</label>
                                <div className="relative">
                                    <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input 
                                        type="date" 
                                        value={data.deadline}
                                        onChange={e => setData('deadline', e.target.value)}
                                        className="w-full bg-slate-50 border-none rounded-[24px] pl-14 pr-8 py-5 text-sm font-black text-[#1E293B] focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-inner italic" 
                                    />
                                </div>
                                {errors.deadline && <p className="text-rose-500 text-[10px] font-bold mt-1 px-3">{errors.deadline}</p>}
                            </div>
                        </div>
                    </motion.div>

                    {/* Description */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-10 rounded-[45px] shadow-sm border border-slate-100"
                    >
                        <h3 className="text-lg font-black text-[#1E293B] italic mb-10 flex items-center gap-3">
                            <span className="h-8 w-8 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xs shadow-sm">03</span>
                            Mô tả công việc & Yêu cầu
                        </h3>

                        <div className="space-y-3">
                            <div className="flex justify-between px-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Chi tiết tin tuyển dụng</label>
                                <span className="text-[9px] font-bold text-slate-300 flex items-center gap-1"><HelpCircle className="h-3 w-3" /> Hỗ trợ Markdown</span>
                            </div>
                            <textarea 
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows="10"
                                placeholder="Nhập yêu cầu, quyền lợi và mô tả chi tiết công việc..." 
                                className="w-full bg-slate-50 border-none rounded-[32px] px-8 py-7 text-sm font-black text-[#1E293B] focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-inner resize-none placeholder:text-slate-300 italic leading-relaxed"
                            ></textarea>
                            {errors.description && <p className="text-rose-500 text-[10px] font-bold mt-1 px-3">{errors.description}</p>}
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center justify-end gap-6"
                    >
                        <Link href={route('staff.jobs.index')} className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-rose-500 transition-colors">
                            Hủy bỏ & Quay lại
                        </Link>
                        <motion.button 
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={processing}
                            type="submit"
                            className="bg-[#6366F1] text-white font-black py-5 px-12 rounded-2xl flex items-center gap-3 shadow-2xl shadow-indigo-100 transition-all uppercase tracking-widest text-[11px]"
                        >
                            {processing ? (
                                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <Save className="h-5 w-5" />
                            )}
                            XÁC NHẬN ĐĂNG TIN
                        </motion.button>
                    </motion.div>
                </form>
            </div>
        </StaffLayout>
    );
}
