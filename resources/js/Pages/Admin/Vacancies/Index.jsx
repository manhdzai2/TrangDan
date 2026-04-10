import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { Plus, Search, Filter, Eye, Edit, Trash2, X, Check } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Index({ vacancies }) {
    const [showModal, setShowModal] = useState(false);
    const [editingJob, setEditingJob] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, reset, errors } = useForm({
        title: '',
        description: '',
        location: '',
        salary: '',
        type: 'Full-time',
        is_active: true,
    });

    const openCreateModal = () => {
        setEditingJob(null);
        reset();
        setShowModal(true);
    };

    const openEditModal = (job) => {
        setEditingJob(job);
        setData({
            title: job.title,
            description: job.description || '',
            location: job.location || '',
            salary: job.salary || '',
            type: job.type || 'Full-time',
            is_active: !!job.is_active,
        });
        setShowModal(true);
    };

    const submit = (e) => {
        e.preventDefault();
        if (editingJob) {
            put(route('admin.vacancies.update', editingJob.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.vacancies.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingJob(null);
        reset();
    };

    const handleDelete = (id) => {
        if (confirm('Bạn có chắc chắn muốn xóa tin tuyển dụng này?')) {
            destroy(route('admin.vacancies.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Quản lý Tin tuyển dụng" />
            
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center mb-10"
            >
                <div>
                    <h1 className="text-4xl font-black text-[#004D5C] tracking-tighter mb-2 italic">Tin tuyển dụng</h1>
                    <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Quản lý và cập nhật danh sách vị trí đang tuyển</p>
                </div>
                <motion.button 
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={openCreateModal}
                    className="bg-[#006D7E] text-white font-black py-4 px-8 rounded-2xl flex items-center gap-2 shadow-2xl shadow-[#006d7e]/20 transition-all group"
                >
                    <Plus className="h-6 w-6 group-hover:rotate-90 transition-transform duration-500" /> ĐĂNG TIN MỚI
                </motion.button>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-[40px] shadow-sm border border-white/50 overflow-hidden mb-12"
            >
                <div className="p-8 border-b border-slate-50 flex gap-6 bg-slate-50/20">
                    <div className="relative flex-1">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                        <input 
                            type="text" 
                            placeholder="Tìm kiếm vị trí, kỹ năng..." 
                            className="w-full bg-white border-none rounded-2xl pl-16 pr-6 py-4 text-[11px] font-black uppercase tracking-wider focus:ring-2 focus:ring-[#006D7E] transition-all shadow-sm text-[#004D5C] placeholder:text-slate-300" 
                        />
                    </div>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-5 bg-white rounded-2xl text-slate-400 hover:text-[#004D5C] transition-all shadow-sm border border-slate-100"
                    >
                        <Filter className="h-6 w-6" />
                    </motion.button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 text-slate-300 text-[10px] font-black uppercase tracking-[0.3em]">
                                <th className="px-10 py-6">Công việc</th>
                                <th className="px-10 py-6">Loại hình</th>
                                <th className="px-10 py-6">Mức lương</th>
                                <th className="px-10 py-6 text-center">Ứng viên</th>
                                <th className="px-10 py-6 text-center">Trạng thái</th>
                                <th className="px-10 py-6 text-right pr-12">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {vacancies.map((job, index) => (
                                <motion.tr 
                                    key={job.id} 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    className="hover:bg-[#F3F7F8]/80 transition duration-500 group cursor-default"
                                >
                                    <td className="px-10 py-7">
                                        <div className="font-black text-[#004D5C] tracking-tight italic text-xl mb-1.5 transition-colors group-hover:text-[#006D7E]">{job.title}</div>
                                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                                            <span className="bg-[#EEF8F9] text-[#006D7E] px-3 py-1 rounded-lg text-[9px] shadow-sm border border-[#006D7E]/5">JOB-{100 + job.id}</span>
                                            <span className="text-slate-200">/</span>
                                            <span>{job.location}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-7">
                                        <div className="px-4 py-2 bg-indigo-50/50 text-indigo-600 rounded-xl text-[9px] font-black uppercase tracking-widest border border-indigo-100 shadow-sm inline-block">
                                            {job.type}
                                        </div>
                                    </td>
                                    <td className="px-10 py-7 text-sm font-black text-[#006D7E] italic tracking-tight">{job.salary}</td>
                                    <td className="px-10 py-7 text-center">
                                        <div className="inline-flex flex-col">
                                            <span className="text-2xl font-black text-[#004D5C] leading-none italic">{job.applications_count}</span>
                                            <span className="text-[9px] text-slate-300 font-black uppercase tracking-widest mt-1.5 leading-none">Hồ sơ</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-7 text-center">
                                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm ${job.is_active ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                                            <span className={`h-2 w-2 rounded-full ${job.is_active ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                                            {job.is_active ? 'Hoạt động' : 'Tạm dừng'}
                                        </span>
                                    </td>
                                    <td className="px-10 py-7 text-right pr-12">
                                        <div className="flex justify-end gap-3 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                                            <motion.button 
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => openEditModal(job)}
                                                className="p-3 text-slate-300 hover:text-amber-500 hover:bg-amber-50 rounded-2xl transition-all shadow-sm bg-white border border-slate-50"
                                            >
                                                <Edit className="h-5 w-5" />
                                            </motion.button>
                                            <motion.button 
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => handleDelete(job.id)}
                                                className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all shadow-sm bg-white border border-slate-50"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </motion.button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Modal Create/Edit */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-0">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[#004D5C]/60 backdrop-blur-md" 
                            onClick={closeModal}
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-white rounded-[40px] w-full max-w-2xl relative z-10 shadow-2xl overflow-hidden"
                        >
                            <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                                <div>
                                    <h3 className="text-3xl font-black text-[#004D5C] tracking-tight italic">
                                        {editingJob ? 'Cập nhật Tin tuyển dụng' : 'Đăng Tin tuyển dụng Mới'}
                                    </h3>
                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2 leading-none">Cung cấp thông tin chi tiết cho vị trí này</p>
                                </div>
                                <motion.button 
                                    whileHover={{ rotate: 90, scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={closeModal} 
                                    className="p-4 bg-white rounded-2xl text-slate-300 hover:text-rose-500 transition shadow-sm border border-slate-50"
                                >
                                    <X className="h-6 w-6" />
                                </motion.button>
                            </div>
                            <form onSubmit={submit} className="p-10 overflow-y-auto max-h-[70vh] custom-scrollbar">
                                <div className="space-y-10">
                                    <div>
                                        <label className="text-[10px] font-black text-[#004D5C] uppercase tracking-[0.2em] block mb-4">Tên vị trí tuyển dụng</label>
                                        <input 
                                            type="text" 
                                            value={data.title}
                                            onChange={e => setData('title', e.target.value)}
                                            placeholder="Ví dụ: Senior React Developer" 
                                            className="w-full bg-[#F3F7F8] border-none rounded-[24px] px-8 py-5 text-sm font-black text-[#004D5C] focus:ring-4 focus:ring-[#006D7E]/10 transition-all shadow-inner placeholder:text-slate-300 italic" 
                                        />
                                        {errors.title && <div className="text-rose-500 text-[9px] font-black mt-3 uppercase tracking-widest italic">{errors.title}</div>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div>
                                            <label className="text-[10px] font-black text-[#004D5C] uppercase tracking-[0.2em] block mb-4">Địa điểm làm việc</label>
                                            <input 
                                                type="text" 
                                                value={data.location}
                                                onChange={e => setData('location', e.target.value)}
                                                placeholder="Ví dụ: Hà Nội / Remote" 
                                                className="w-full bg-[#F3F7F8] border-none rounded-[24px] px-8 py-5 text-sm font-black text-[#004D5C] focus:ring-4 focus:ring-[#006D7E]/10 transition-all shadow-inner placeholder:text-slate-300 italic" 
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black text-[#004D5C] uppercase tracking-[0.2em] block mb-4">Mức lương dự kiến</label>
                                            <input 
                                                type="text" 
                                                value={data.salary}
                                                onChange={e => setData('salary', e.target.value)}
                                                placeholder="Ví dụ: 20M - 40M" 
                                                className="w-full bg-[#F3F7F8] border-none rounded-[24px] px-8 py-5 text-sm font-black text-[#004D5C] focus:ring-4 focus:ring-[#006D7E]/10 transition-all shadow-inner placeholder:text-slate-300 italic" 
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div>
                                            <label className="text-[10px] font-black text-[#004D5C] uppercase tracking-[0.2em] block mb-4">Loại hình công việc</label>
                                            <select 
                                                value={data.type}
                                                onChange={e => setData('type', e.target.value)}
                                                className="w-full bg-[#F3F7F8] border-none rounded-[24px] px-8 py-5 text-sm font-black text-[#004D5C] focus:ring-4 focus:ring-[#006D7E]/10 transition-all shadow-inner cursor-pointer"
                                            >
                                                <option value="Full-time">Full-time</option>
                                                <option value="Part-time">Part-time</option>
                                                <option value="Remote">Remote</option>
                                                <option value="Contract">Contract</option>
                                            </select>
                                        </div>
                                        <div className="flex items-end">
                                            <label className="flex items-center gap-4 cursor-pointer group bg-[#F3F7F8] px-8 py-5 rounded-[24px] w-full border border-transparent hover:border-[#006D7E]/10 transition-all">
                                                <div className="flex-1 text-[10px] font-black text-[#004D5C] uppercase tracking-[0.2em] italic">Trạng thái tuyển dụng</div>
                                                <div className="relative">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={data.is_active}
                                                        onChange={e => setData('is_active', e.target.checked)}
                                                        className="sr-only peer" 
                                                    />
                                                    <div className="w-14 h-7 bg-slate-200 rounded-full peer peer-checked:bg-[#006D7E] transition-all duration-500 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-500 peer-checked:after:translate-x-7 shadow-sm"></div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-[10px] font-black text-[#004D5C] uppercase tracking-[0.2em] block mb-4">Mô tả & Yêu cầu</label>
                                        <textarea 
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                            rows="6"
                                            placeholder="Nhập mô tả chi tiết, yêu cầu và quyền lợi dành cho ứng viên..." 
                                            className="w-full bg-[#F3F7F8] border-none rounded-[32px] px-8 py-6 text-sm font-black text-[#004D5C] focus:ring-4 focus:ring-[#006D7E]/10 transition-all shadow-inner resize-none placeholder:text-slate-300 italic"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="mt-16 flex gap-6">
                                    <button 
                                        type="button"
                                        onClick={closeModal}
                                        className="flex-1 py-5 text-slate-400 font-black text-[11px] uppercase tracking-[0.2em] hover:text-[#004D5C] transition-colors italic"
                                    >
                                        HỦY BỎ
                                    </button>
                                    <motion.button 
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={processing}
                                        className="flex-[2] bg-[#004D5C] text-white font-black py-5 rounded-2xl shadow-2xl shadow-[#004D5C]/30 hover:bg-[#003a45] transition-all flex items-center justify-center gap-3 disabled:opacity-50 uppercase text-[11px] tracking-[0.2em]"
                                    >
                                        {processing ? (
                                            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <Check className="h-6 w-6" />
                                        )}
                                        {editingJob ? 'CẬP NHẬT NGAY' : 'XÁC NHẬN ĐĂNG TIN'}
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </AdminLayout>
    );
}
