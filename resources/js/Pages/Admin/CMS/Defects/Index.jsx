import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { 
    Plus, Image, Edit2, Trash2, 
    CheckCircle2, AlertCircle, Save, X,
    Maximize2, Upload, ChevronUp, ChevronDown,
    Inbox
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/Hooks/useTranslation';
import { useState } from 'react';

export default function QualityStandards({ standards }) {
    const { __ } = useTranslation();
    const [isAdding, setIsAdding] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const sortedStandards = {
        pass: standards.filter(s => s.type === 'pass').sort((a, b) => a.order - b.order),
        fail: standards.filter(s => s.type === 'fail').sort((a, b) => a.order - b.order)
    };

    const handleReorder = (id, direction, type) => {
        const typeItems = sortedStandards[type];
        const itemIndex = typeItems.findIndex(s => s.id === id);
        if ((direction === 'up' && itemIndex === 0) || (direction === 'down' && itemIndex === typeItems.length - 1)) return;

        const newItems = [...typeItems];
        const targetIndex = direction === 'up' ? itemIndex - 1 : itemIndex + 1;
        [newItems[itemIndex], newItems[targetIndex]] = [newItems[targetIndex], newItems[itemIndex]];

        router.post(route('admin.cms.defects.reorder'), {
            ids: newItems.map(s => s.id)
        }, { preserveScroll: true });
    };

    return (
        <AdminLayout>
            <Head title={__('Admin CMS Defects')} />
            
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-black text-[#004D5C] dark:text-white tracking-tighter mb-2 italic uppercase">
                        {__('Admin CMS Defects')}
                    </h1>
                    <p className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest text-[10px]">
                        {__('Manage Quality Standards (Pass/Fail criteria)')}
                    </p>
                </div>
                <motion.button 
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsAdding(true)}
                    className="bg-[#004D5C] dark:bg-[#CCEBF0] text-white dark:text-slate-900 px-8 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl flex items-center gap-3 transition-colors"
                >
                    <Plus className="h-4 w-4" /> {__('Add Standard')}
                </motion.button>
            </div>

            <AnimatePresence>
                {(isAdding || editingItem) && (
                    <StandardForm 
                        item={editingItem} 
                        onClose={() => {
                            setIsAdding(false);
                            setEditingItem(null);
                        }} 
                    />
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <Section 
                    title={__('QC Pass Standards')} 
                    icon={<CheckCircle2 className="h-6 w-6 text-emerald-500" />} 
                    items={sortedStandards.pass}
                    onEdit={setEditingItem}
                    onReorder={(id, dir) => handleReorder(id, dir, 'pass')}
                    theme="emerald"
                />

                <Section 
                    title={__('QC Fail Standards')} 
                    icon={<AlertCircle className="h-6 w-6 text-rose-500" />} 
                    items={sortedStandards.fail}
                    onEdit={setEditingItem}
                    onReorder={(id, dir) => handleReorder(id, dir, 'fail')}
                    theme="rose"
                />
            </div>
        </AdminLayout>
    );
}

function Section({ title, icon, items, onEdit, onReorder, theme }) {
    const { __ } = useTranslation();
    const themeClasses = {
        emerald: 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30',
        rose: 'bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-900/30'
    };

    return (
        <div className="space-y-6">
            <h2 className="flex items-center gap-4 text-xl font-black italic text-[#004D5C] dark:text-white tracking-tight uppercase">
                {icon} {title}
            </h2>
            <div className="space-y-4">
                {items.length === 0 ? (
                    <div className="bg-white dark:bg-slate-900 p-12 rounded-[32px] border border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center">
                        <Inbox className="h-8 w-8 text-slate-200 mb-4" />
                        <p className="text-slate-400 text-xs font-black italic uppercase tracking-widest">{__('No data available')}</p>
                    </div>
                ) : (
                    items.map((item, index) => (
                        <motion.div 
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-slate-900 p-6 rounded-[32px] shadow-sm border border-white/50 dark:border-white/5 flex gap-6 group hover:shadow-xl transition-all duration-500"
                        >
                            <div className="flex flex-col gap-1 items-center justify-center shrink-0">
                                <button 
                                    onClick={() => onReorder(item.id, 'up')}
                                    disabled={index === 0}
                                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-200 hover:text-[#006D7E] disabled:opacity-0 transition-all"
                                >
                                    <ChevronUp className="h-4 w-4" />
                                </button>
                                <button 
                                    onClick={() => onReorder(item.id, 'down')}
                                    disabled={index === items.length - 1}
                                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-200 hover:text-[#006D7E] disabled:opacity-0 transition-all"
                                >
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="h-24 w-32 bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden shrink-0 relative border border-slate-200/50 dark:border-slate-700/50">
                                {item.image_path ? (
                                    <img src={`/storage/${item.image_path}`} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <Image className="h-6 w-6" />
                                    </div>
                                )}
                                <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[8px] font-black uppercase border ${themeClasses[theme]}`}>
                                    {item.type}
                                </div>
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="font-black text-[#004D5C] dark:text-white mb-2 italic tracking-tight truncate">{item.title}</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium italic line-clamp-2 leading-relaxed">{item.description}</p>
                            </div>

                            <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => onEdit(item)} className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-[#006D7E] rounded-xl transition-all shadow-sm">
                                    <Edit2 className="h-3 w-3" />
                                </button>
                                <button 
                                    onClick={() => {
                                        if(confirm(__('Confirm Delete'))) {
                                            router.delete(route('admin.cms.defects.destroy', item.id));
                                        }
                                    }}
                                    className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-500 rounded-xl transition-all shadow-sm"
                                >
                                    <Trash2 className="h-3 w-3" />
                                </button>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}

function StandardForm({ item, onClose }) {
    const { __ } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        type: item?.type || 'pass',
        title: item?.title || '',
        description: item?.description || '',
        image: null,
        order: item?.order || 0,
        _method: item ? 'POST' : 'POST'
    });

    const submit = (e) => {
        e.preventDefault();
        const url = item ? route('admin.cms.defects.update', item.id) : route('admin.cms.defects.store');
        post(url, { 
            onSuccess: onClose,
            forceFormData: true 
        });
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#004D5C] dark:bg-slate-800 p-12 rounded-[50px] shadow-2xl mb-10 relative overflow-hidden text-white border border-white/10"
        >
            <form onSubmit={submit} className="relative z-10 space-y-8">
                <div className="flex justify-between items-start">
                    <h2 className="text-3xl font-black italic tracking-tighter uppercase">{item ? __('Edit Standard') : __('Add New Standard')}</h2>
                    <button type="button" onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X /></button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-50 block ml-2">{__('Type')}</label>
                            <div className="flex gap-4">
                                {['pass', 'fail'].map(type => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setData('type', type)}
                                        className={`flex-1 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all border ${data.type === type ? 
                                            (type === 'pass' ? 'bg-emerald-500 text-white border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-rose-500 text-white border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.3)]') 
                                            : 'bg-white/5 text-white/40 border-white/10'}`}
                                    >
                                        {type === 'pass' ? __('PASS') : __('FAIL / NG')}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-50 block ml-2">{__('Title')}</label>
                            <input 
                                value={data.title} 
                                onChange={e => setData('title', e.target.value)}
                                className="w-full bg-white/10 border-none rounded-2xl p-6 text-white placeholder:text-white/30 font-black italic shadow-inner focus:ring-4 focus:ring-white/10 transition-all text-sm"
                                placeholder={__('Enter title...')}
                                required
                            />
                            {errors.title && <div className="text-rose-400 text-[10px] font-black italic ml-2">{errors.title}</div>}
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-50 block ml-2">{__('Description')}</label>
                            <textarea 
                                rows={3}
                                value={data.description} 
                                onChange={e => setData('description', e.target.value)}
                                className="w-full bg-white/10 border-none rounded-[32px] p-8 text-white placeholder:text-white/30 font-black italic shadow-inner focus:ring-4 focus:ring-white/10 transition-all text-sm resize-none"
                                placeholder={__('Describe the criteria...')}
                                required
                            />
                            {errors.description && <div className="text-rose-400 text-[10px] font-black italic ml-2">{errors.description}</div>}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-50 block ml-2">{__('Example Image')}</label>
                        <div className="relative h-full">
                            <input 
                                type="file" 
                                className="hidden" 
                                id="defect-img" 
                                accept="image/*"
                                onChange={e => setData('image', e.target.files[0])}
                            />
                            <label 
                                htmlFor="defect-img"
                                className="h-full min-h-[300px] border-4 border-dashed border-white/10 rounded-[40px] flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-white/5 transition-all group overflow-hidden relative shadow-inner"
                            >
                                {data.image ? (
                                    <div className="absolute inset-0">
                                        <img src={URL.createObjectURL(data.image)} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Upload className="h-10 w-10 text-white" />
                                        </div>
                                    </div>
                                ) : item?.image_path ? (
                                    <div className="absolute inset-0">
                                        <img src={`/storage/${item.image_path}`} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Upload className="h-10 w-10 text-white" />
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="p-6 bg-white/5 rounded-3xl text-white/30 group-hover:text-white group-hover:bg-white/10 transition-all">
                                            <Image className="h-12 w-12" />
                                        </div>
                                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">{__('Click to upload')}</div>
                                    </>
                                )}
                            </label>
                            {errors.image && <div className="text-rose-400 text-[10px] font-black italic mt-4 text-center">{errors.image}</div>}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <motion.button 
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={processing}
                        className="bg-white dark:bg-[#CCEBF0] text-[#004D5C] dark:text-slate-900 px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl flex items-center gap-3 transition-colors disabled:opacity-50"
                    >
                        {processing ? <div className="h-4 w-4 border-2 border-[#004D5C]/30 border-t-[#004D5C] rounded-full animate-spin"></div> : <Save className="h-4 w-4" />}
                        {__('Save Standard')}
                    </motion.button>
                </div>
            </form>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        </motion.div>
    );
}
