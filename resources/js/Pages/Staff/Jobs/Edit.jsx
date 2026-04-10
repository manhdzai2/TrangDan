import StaffLayout from '@/Layouts/StaffLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { 
    ArrowLeft, Save, Check, AlertCircle, 
    Briefcase, MapPin, DollarSign, Calendar,
    FileText, HelpCircle, Eye, EyeOff
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Edit({ job }) {
    const { data, setData, put, processing, errors } = useForm({
        title: job.title || '',
        description: job.description || '',
        location: job.location || '',
        salary: job.salary || '',
        type: job.type || 'Full-time',
        deadline: job.deadline ? job.deadline.split('T')[0] : '',
        is_active: job.is_active,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('staff.jobs.update', job.id));
    };

    return (
        <StaffLayout>
            <Head title={`Chỉnh sửa: ${job.title}`} />

            <div className="max-w-4xl mx-auto">
                <div className="mb-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
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
                            <h1 className="text-3xl font-black text-[#1E293B] tracking-tight mb-1 italic truncate max-w-md">Sửa: {job.title}</h1>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Cập nhật thông tin bài đăng của bạn</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                        <button 
                            type="button"
                            onClick={() => setData('is_active', true)}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${data.is_active ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Công khai
                        </button>
                        <button 
                            type="button"
                            onClick={() => setData('is_active', false)}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${!data.is_active ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Tạm ẩn
                        </button>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-8 pb-20">
                    {/* Main Info */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-10 rounded-[45px] shadow-sm border border-slate-100"
                    >
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
                                    className="w-full bg-slate-50 border-none rounded-[24px] px-8 py-5 text-sm font-black text-[#1E293B] focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-inner italic" 
                                />
                                {errors.title && <p className="text-rose-500 text-[10px] font-bold mt-1 px-3">{errors.title}</p>}
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
                                            className="w-full bg-slate-50 border-none rounded-[24px] pl-14 pr-8 py-5 text-sm font-black text-[#1E293B] focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-inner italic" 
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
                                            className="w-full bg-slate-50 border-none rounded-[24px] pl-14 pr-8 py-5 text-sm font-black text-[#1E293B] focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-inner italic" 
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
                            Mô tả chi tiết
                        </h3>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Nội dung bài đăng</label>
                            <textarea 
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows="10"
                                className="w-full bg-slate-50 border-none rounded-[32px] px-8 py-7 text-sm font-black text-[#1E293B] focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-inner resize-none italic leading-relaxed"
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
                            Hủy bỏ
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
                            LƯU THAY ĐỔI
                        </motion.button>
                    </motion.div>
                </form>
            </div>
        </StaffLayout>
    );
}
