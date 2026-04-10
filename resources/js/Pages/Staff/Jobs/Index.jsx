import StaffLayout from '@/Layouts/StaffLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    Plus, Search, Filter, Eye, Edit, Trash2, 
    MoreVertical, Briefcase, MapPin, DollarSign,
    Calendar, CheckCircle2, XCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Index({ vacancies, filters }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Bạn có chắc chắn muốn xóa bài đăng này?')) {
            destroy(route('staff.jobs.destroy', id), { preserveScroll: true });
        }
    };

    return (
        <StaffLayout>
            <Head title="Việc làm của tôi" />

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black text-[#1E293B] tracking-tight mb-2 italic first-letter:uppercase">Việc làm của tôi</h1>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Quản lý và cập nhật các vị trí bạn đang tuyển dụng</p>
                </div>
                <Link href={route('staff.jobs.create')}>
                    <motion.button 
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#6366F1] text-white font-black py-4 px-10 rounded-2xl flex items-center gap-3 shadow-2xl shadow-indigo-200 transition-all group"
                    >
                        <Plus className="h-6 w-6 group-hover:rotate-90 transition-transform duration-500" /> 
                        ĐĂNG TIN MỚI
                    </motion.button>
                </Link>
            </div>

            <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden mb-12">
                <div className="p-8 border-b border-slate-50 flex flex-wrap gap-4 bg-slate-50/30">
                    <div className="relative flex-1 min-w-[300px]">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                        <input 
                            type="text" 
                            defaultValue={filters.search}
                            placeholder="Tìm kiếm vị trí..." 
                            className="w-full bg-white border-slate-200 rounded-2xl pl-16 pr-6 py-4 text-sm font-medium focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm placeholder:text-slate-300" 
                        />
                    </div>
                    <div className="flex gap-4">
                        <select className="bg-white border-slate-200 rounded-2xl px-6 py-4 text-xs font-bold text-slate-500 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm cursor-pointer">
                            <option value="">Tất cả trạng thái</option>
                            <option value="active">Đang hoạt động</option>
                            <option value="inactive">Tạm dừng</option>
                        </select>
                        <button className="p-5 bg-white rounded-2xl text-slate-400 hover:text-indigo-600 transition-all shadow-sm border border-slate-100">
                            <Filter className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto overflow-y-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
                                <th className="px-10 py-6">Vị trí</th>
                                <th className="px-10 py-6">Thông tin</th>
                                <th className="px-10 py-6 text-center">Ứng viên</th>
                                <th className="px-10 py-6 text-center">Trạng thái</th>
                                <th className="px-10 py-6 text-right pr-12">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {(vacancies.data || []).map((job, index) => (
                                <motion.tr 
                                    key={job.id} 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 * index }}
                                    className="hover:bg-slate-50/80 transition duration-500 group"
                                >
                                    <td className="px-10 py-8">
                                        <div className="font-black text-[#1E293B] italic text-2xl mb-2 transition-colors group-hover:text-indigo-600">{job.title}</div>
                                        <div className="flex items-center gap-4 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                                            <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> {job.location}</span>
                                            <span className="h-1 w-1 bg-slate-200 rounded-full"></span>
                                            <span className="flex items-center gap-1.5"><Briefcase className="h-3 w-3" /> {job.type}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                                <DollarSign className="h-4 w-4 text-emerald-500" /> {job.salary || 'Thỏa thuận'}
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                                <Calendar className="h-3.5 w-3.5" /> Hết hạn: {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Không có'}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-center">
                                        <div className="inline-flex flex-col items-center">
                                            <div className="text-3xl font-black text-slate-800 italic leading-none">{job.applications_count}</div>
                                            <span className="text-[9px] text-slate-300 font-black uppercase tracking-widest mt-2">Hồ sơ</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-center">
                                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm border transition-all ${
                                            job.is_active 
                                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:bg-emerald-100' 
                                            : 'bg-rose-50 text-rose-600 border-rose-100 group-hover:bg-rose-100'
                                        }`}>
                                            <span className={`h-2 w-2 rounded-full ${job.is_active ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                                            {job.is_active ? 'Công khai' : 'Tạm dừng'}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8 text-right pr-12">
                                        <div className="flex justify-end gap-3 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700">
                                            <Link 
                                                href={route('staff.jobs.edit', job.id)}
                                                className="p-3.5 text-slate-400 hover:text-amber-500 bg-white border border-slate-100 rounded-2xl shadow-sm transition-all"
                                            >
                                                <Edit className="h-5 w-5" />
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(job.id)}
                                                className="p-3.5 text-slate-400 hover:text-rose-500 bg-white border border-slate-100 rounded-2xl shadow-sm transition-all"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                            {(vacancies.data || []).length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-24 text-center">
                                        <div className="h-20 w-20 bg-slate-50 rounded-[30px] flex items-center justify-center mx-auto mb-6 border border-slate-100 shadow-inner">
                                            <Briefcase className="h-10 w-10 text-slate-200" />
                                        </div>
                                        <h4 className="text-xl font-black text-slate-400 mb-2 italic tracking-tight">Bạn chưa đăng tin tuyển dụng nào</h4>
                                        <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em] mb-8 max-w-xs mx-auto">Bắt đầu thu hút nhân tài bằng cách tạo bài đăng đầu tiên của bạn.</p>
                                        <Link href={route('staff.jobs.create')}>
                                            <button className="px-8 py-4 bg-indigo-600 text-white font-black text-[11px] rounded-2xl shadow-xl shadow-indigo-100 uppercase tracking-widest hover:scale-105 transition-transform">
                                                Tạo Job Đầu Tiên
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </StaffLayout>
    );
}
