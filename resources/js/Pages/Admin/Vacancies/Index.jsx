import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { Plus, Search, Filter, Eye, Edit, Trash2, X, Check, Sparkles, LayoutGrid } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/Hooks/useTranslation';

export default function Index({ vacancies }) {
    const { __ } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const [editingJob, setEditingJob] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, reset, errors } = useForm({
        title: '',
        description: '',
        recruitment_process: '',
        requirements: '',
        benefits: '',
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
            recruitment_process: job.recruitment_process || '',
            requirements: job.requirements || '',
            benefits: job.benefits || '',
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
        if (confirm(__('Admin Vacancy Delete Confirm'))) {
            destroy(route('admin.vacancies.destroy', id));
        }
    };

    const handleGenerateAI = async () => {
        if (!data.title) {
            alert(__('Admin Vacancy AI Error Title'));
            return;
        }

        try {
            const response = await fetch(route('admin.vacancies.generate-jd'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                body: JSON.stringify({ title: data.title }),
            });

            const result = await response.json();
            if (result.jd) {
                // Split the JD by section if possible, or just dump into description
                setData('description', result.jd);
            }
        } catch (error) {
            console.error('Error generating JD:', error);
        }
    };

    return (
        <AdminLayout>
            <Head title={__('Admin Vacancy Title')} />
            
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center mb-10"
            >
                <div>
                    <h1 className="text-4xl font-black text-[#004D5C] dark:text-white tracking-tighter mb-2 italic">{__('Admin Vacancy Header')}</h1>
                    <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">{__('Admin Vacancy Subtitle')}</p>
                </div>
                <motion.button 
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={openCreateModal}
                    className="bg-[#006D7E] text-white font-black py-4 px-8 rounded-2xl flex items-center gap-2 shadow-2xl shadow-[#006d7e]/20 transition-all group"
                >
                    <Plus className="h-6 w-6 group-hover:rotate-90 transition-transform duration-500" /> {__('Admin Vacancy Add New')}
                </motion.button>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-slate-900 rounded-[40px] shadow-sm border border-white/50 dark:border-white/5 overflow-hidden mb-12"
            >
                <div className="p-8 border-b border-slate-50 dark:border-white/5 flex gap-6 bg-slate-50/20 dark:bg-transparent">
                    <div className="relative flex-1">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                        <input 
                            type="text" 
                            placeholder={__('Admin Vacancy Search Placeholder')} 
                            className="w-full bg-white dark:bg-slate-800 border-none rounded-2xl pl-16 pr-6 py-4 text-[11px] font-black uppercase tracking-wider focus:ring-2 focus:ring-[#006D7E] transition-all shadow-sm text-[#004D5C] dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600" 
                        />
                    </div>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-5 bg-white dark:bg-slate-800 rounded-2xl text-slate-400 hover:text-[#004D5C] dark:hover:text-white transition-all shadow-sm border border-slate-100 dark:border-white/5"
                    >
                        <Filter className="h-6 w-6" />
                    </motion.button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-white/5 text-slate-300 dark:text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
                                <th className="px-10 py-6">{__('Admin Table Job')}</th>
                                <th className="px-10 py-6">{__('Admin Table Type')}</th>
                                <th className="px-10 py-6">{__('Admin Table Salary')}</th>
                                <th className="px-10 py-6 text-center">{__('Admin Table Candidates')}</th>
                                <th className="px-10 py-6 text-center">{__('Admin Table Status')}</th>
                                <th className="px-10 py-6 text-right pr-12">{__('Admin Table Action')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {vacancies.map((job, index) => (
                                <motion.tr 
                                    key={job.id} 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    className="hover:bg-[#F3F7F8]/80 dark:hover:bg-white/5 transition duration-500 group cursor-default"
                                >
                                    <td className="px-10 py-7 bg-white dark:bg-slate-900 group-hover:bg-transparent transition-colors">
                                        <div className="font-black text-[#004D5C] dark:text-white tracking-tight italic text-xl mb-1.5 transition-colors group-hover:text-[#006D7E]">{job.title}</div>
                                        <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest">
                                            <span className="bg-[#EEF8F9] dark:bg-[#002B33] text-[#006D7E] dark:text-[#CCEBF0] px-3 py-1 rounded-lg text-[9px] shadow-sm border border-[#006D7E]/5">{job.type}</span>
                                            <span className="text-slate-200 dark:text-slate-800">/</span>
                                            <span>{job.location}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-7 bg-white dark:bg-slate-900 group-hover:bg-transparent transition-colors">
                                        <div className="px-4 py-2 bg-indigo-50/50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl text-[9px] font-black uppercase tracking-widest border border-indigo-100 dark:border-indigo-800/30 shadow-sm inline-block">
                                            {job.type}
                                        </div>
                                    </td>
                                    <td className="px-10 py-7 text-sm font-black text-[#006D7E] dark:text-[#CCEBF0] italic tracking-tight bg-white dark:bg-slate-900 group-hover:bg-transparent transition-colors">{job.salary}</td>
                                    <td className="px-10 py-7 text-center bg-white dark:bg-slate-900 group-hover:bg-transparent transition-colors">
                                        <div className="inline-flex flex-col">
                                            <span className="text-2xl font-black text-[#004D5C] dark:text-white leading-none italic">{job.applications_count}</span>
                                            <span className="text-[9px] text-slate-300 dark:text-slate-600 font-black uppercase tracking-widest mt-1.5 leading-none">{__('Admin Apps Label')}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-7 text-center bg-white dark:bg-slate-900 group-hover:bg-transparent transition-colors">
                                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm ${job.is_active ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800' : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-800'}`}>
                                            <span className={`h-2 w-2 rounded-full ${job.is_active ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                                            {job.is_active ? __('Admin Status Active') : __('Admin Status Paused')}
                                        </span>
                                    </td>
                                    <td className="px-10 py-7 text-right pr-12 bg-white dark:bg-slate-900 group-hover:bg-transparent transition-colors">
                                        <div className="flex justify-end gap-3 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                                            <motion.button 
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => openEditModal(job)}
                                                className="p-3 text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-2xl transition-all shadow-sm bg-white dark:bg-slate-800 border border-slate-50 dark:border-white/5"
                                            >
                                                <Edit className="h-5 w-5" />
                                            </motion.button>
                                            <motion.button 
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => handleDelete(job.id)}
                                                className="p-3 text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-2xl transition-all shadow-sm bg-white dark:bg-slate-800 border border-slate-50 dark:border-white/5"
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
                            className="bg-white dark:bg-slate-900 rounded-[40px] w-full max-w-2xl relative z-10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="p-10 border-b border-slate-50 dark:border-white/5 flex justify-between items-center bg-slate-50/30 dark:bg-transparent">
                                <div>
                                    <h3 className="text-3xl font-black text-[#004D5C] dark:text-white tracking-tight italic">
                                        {editingJob ? __('Admin Vacancy Update Title') : __('Admin Vacancy Create Title')}
                                    </h3>
                                    <div className="flex items-center gap-4 mt-2">
                                        <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest leading-none">{__('Admin Vacancy Detail Note')}</p>
                                        <motion.button
                                            type="button"
                                            onClick={handleGenerateAI}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex items-center gap-2 bg-[#EEF8F9] text-[#006D7E] px-3 py-1.5 rounded-lg border border-[#006D7E]/10 hover:bg-[#006D7E] hover:text-white transition-all text-[9px] font-black uppercase tracking-widest shadow-sm"
                                        >
                                            <Sparkles className="w-3 h-3" /> {__('Admin Vacancy AI Generate')}
                                        </motion.button>
                                    </div>
                                </div>
                                <motion.button 
                                    whileHover={{ rotate: 90, scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={closeModal} 
                                    className="p-4 bg-white dark:bg-slate-800 rounded-2xl text-slate-300 hover:text-rose-500 transition shadow-sm border border-slate-50 dark:border-white/5"
                                >
                                    <X className="h-6 w-6" />
                                </motion.button>
                            </div>
                            <form onSubmit={submit} className="p-10 overflow-y-auto flex-1 custom-scrollbar">
                                <div className="space-y-8">
                                    <div>
                                        <label className="text-[10px] font-black text-[#004D5C] dark:text-[#CCEBF0] uppercase tracking-[0.2em] block mb-4">{__('Admin Vacancy Job Title')}</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={data.title}
                                            onChange={e => setData('title', e.target.value)}
                                            placeholder="Ví dụ: Senior React Developer" 
                                            className="w-full bg-[#F3F7F8] dark:bg-slate-800 border-none rounded-[24px] px-8 py-5 text-sm font-black text-[#004D5C] dark:text-white focus:ring-4 focus:ring-[#006D7E]/10 transition-all shadow-inner placeholder:text-slate-300 dark:placeholder:text-slate-600 italic" 
                                        />
                                        {errors.title && <div className="text-rose-500 text-[9px] font-black mt-3 uppercase tracking-widest italic">{errors.title}</div>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="text-[10px] font-black text-[#004D5C] dark:text-[#CCEBF0] uppercase tracking-[0.2em] block mb-4">{__('Admin Vacancy Location')}</label>
                                            <input 
                                                type="text" 
                                                required
                                                value={data.location}
                                                onChange={e => setData('location', e.target.value)}
                                                placeholder="Ví dụ: Hà Nội / Remote" 
                                                className="w-full bg-[#F3F7F8] dark:bg-slate-800 border-none rounded-[24px] px-8 py-5 text-sm font-black text-[#004D5C] dark:text-white focus:ring-4 focus:ring-[#006D7E]/10 transition-all shadow-inner placeholder:text-slate-300 dark:placeholder:text-slate-600 italic" 
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black text-[#004D5C] uppercase tracking-[0.2em] block mb-4">{__('Admin Vacancy Expect Salary')}</label>
                                            <input 
                                                type="text" 
                                                value={data.salary}
                                                onChange={e => setData('salary', e.target.value)}
                                                placeholder="Ví dụ: 20M - 40M" 
                                                className="w-full bg-[#F3F7F8] border-none rounded-[24px] px-8 py-5 text-sm font-black text-[#004D5C] focus:ring-4 focus:ring-[#006D7E]/10 transition-all shadow-inner placeholder:text-slate-300 italic" 
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="text-[10px] font-black text-[#004D5C] uppercase tracking-[0.2em] block mb-4">{__('Admin Vacancy Job Type')}</label>
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
                                                <div className="flex-1 text-[10px] font-black text-[#004D5C] uppercase tracking-[0.2em] italic">{__('Admin Vacancy Recruit Status')}</div>
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
                                        <label className="text-[10px] font-black text-[#004D5C] uppercase tracking-[0.2em] block mb-4">{__('Admin Vacancy Job Desc')}</label>
                                        <textarea 
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                            rows="4"
                                            placeholder="Nhập mô tả chi tiết về công việc..." 
                                            className="w-full bg-[#F3F7F8] border-none rounded-[32px] px-8 py-6 text-sm font-black text-[#004D5C] focus:ring-4 focus:ring-[#006D7E]/10 transition-all shadow-inner resize-none placeholder:text-slate-300 italic"
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label className="text-[10px] font-black text-[#004D5C] uppercase tracking-[0.2em] block mb-4">{__('Admin Vacancy Requirements')}</label>
                                        <textarea 
                                            value={data.requirements}
                                            onChange={e => setData('requirements', e.target.value)}
                                            rows="4"
                                            placeholder="Kinh nghiệm, kỹ năng yêu cầu..." 
                                            className="w-full bg-[#F3F7F8] border-none rounded-[32px] px-8 py-6 text-sm font-black text-[#004D5C] focus:ring-4 focus:ring-[#006D7E]/10 transition-all shadow-inner resize-none placeholder:text-slate-300 italic"
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label className="text-[10px] font-black text-[#004D5C] uppercase tracking-[0.2em] block mb-4">{__('Admin Vacancy Benefits')}</label>
                                        <textarea 
                                            value={data.benefits}
                                            onChange={e => setData('benefits', e.target.value)}
                                            rows="4"
                                            placeholder="Lương thưởng, bảo hiểm, các phúc lợi khác..." 
                                            className="w-full bg-[#F3F7F8] border-none rounded-[32px] px-8 py-6 text-sm font-black text-[#004D5C] focus:ring-4 focus:ring-[#006D7E]/10 transition-all shadow-inner resize-none placeholder:text-slate-300 italic"
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label className="text-[10px] font-black text-[#004D5C] uppercase tracking-[0.2em] block mb-4">{__('Admin Vacancy Process')}</label>
                                        <textarea 
                                            value={data.recruitment_process}
                                            onChange={e => setData('recruitment_process', e.target.value)}
                                            rows="5"
                                            placeholder="Ví dụ: Bước 1: Nộp hồ sơ → Bước 2: Phỏng vấn sơ bộ online → Bước 3: Phỏng vấn trực tiếp → Bước 4: Nhận việc" 
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
                                        {__('Admin Cancel Uppercase')}
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
                                        {editingJob ? __('Admin Vacancy Update Button') : __('Admin Vacancy Confirm Button')}
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
