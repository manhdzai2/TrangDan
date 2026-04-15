import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { 
    Plus, Image, Edit2, Trash2, 
    CheckCircle2, AlertCircle, Save, X,
    Maximize2, Upload
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/Hooks/useTranslation';
import { useState } from 'react';

export default function QualityStandards({ standards }) {
    const { __ } = useTranslation();
    const [isAdding, setIsAdding] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const sortedStandards = {
        pass: standards.filter(s => s.type === 'pass'),
        fail: standards.filter(s => s.type === 'fail')
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
                {/* Pass Section */}
                <Section 
                    title={__('About QC Pass Label')} 
                    icon={<CheckCircle2 className="h-6 w-6 text-emerald-500" />} 
                    items={sortedStandards.pass}
                    onEdit={setEditingItem}
                    color="emerald"
                />

                {/* Fail Section */}
                <Section 
                    title={__('About QC Fail Label')} 
                    icon={<AlertCircle className="h-6 w-6 text-rose-500" />} 
                    items={sortedStandards.fail}
                    onEdit={setEditingItem}
                    color="rose"
                />
            </div>
        </AdminLayout>
    );
}

function Section({ title, icon, items, onEdit, color }) {
    const { __ } = useTranslation();
    return (
        <div className="space-y-6">
            <h2 className="flex items-center gap-4 text-xl font-black italic text-[#004D5C] dark:text-white tracking-tight uppercase">
                {icon} {title}
            </h2>
            <div className="space-y-4">
                {items.map((item, index) => (
                    <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-slate-900 p-6 rounded-[32px] shadow-sm border border-white/50 dark:border-white/5 flex gap-6 group hover:shadow-xl transition-all duration-500"
                    >
                        <div className="h-24 w-32 bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden shrink-0 relative group/img">
                            {item.image_path ? (
                                <img src={`/storage/${item.image_path}`} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                    <Image className="h-6 w-6" />
                                </div>
                            )}
                        </div>

                        <div className="flex-1">
                            <h3 className="font-black text-[#004D5C] dark:text-white mb-2 italic tracking-tight">{item.title}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium italic line-clamp-2 leading-relaxed">{item.description}</p>
                        </div>

                        <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => onEdit(item)} className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-[#006D7E] rounded-xl transition-all">
                                <Edit2 className="h-3 w-3" />
                            </button>
                            <button 
                                onClick={() => {
                                    if(confirm(__('Confirm Delete'))) {
                                        router.delete(route('admin.cms.defects.destroy', item.id));
                                    }
                                }}
                                className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-500 rounded-xl transition-all"
                            >
                                <Trash2 className="h-3 w-3" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function StandardForm({ item, onClose }) {
    const { __ } = useTranslation();
    const { data, setData, post, processing } = useForm({
        type: item?.type || 'pass',
        title: item?.title || '',
        description: item?.description || '',
        image: null,
        order: item?.order || 0,
        _method: item ? 'POST' : 'POST' // Controller handles update via POST for multipart
    });

    const submit = (e) => {
        e.preventDefault();
        const url = item ? route('admin.cms.defects.update', item.id) : route('admin.cms.defects.store');
        post(url, { onSuccess: onClose });
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#004D5C] dark:bg-slate-800 p-12 rounded-[50px] shadow-2xl mb-10 relative overflow-hidden text-white"
        >
            <form onSubmit={submit} className="relative z-10 space-y-8">
                <div className="flex justify-between items-start">
                    <h2 className="text-3xl font-black italic tracking-tighter">{item ? __('Edit Standard') : __('Add New Standard')}</h2>
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
                                        className={`flex-1 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all border ${data.type === type ? 'bg-white text-[#004D5C] border-white' : 'bg-transparent text-white/40 border-white/10'}`}
                                    >
                                        {type.toUpperCase()}
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
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-50 block ml-2">{__('Description')}</label>
                            <textarea 
                                rows={3}
                                value={data.description} 
                                onChange={e => setData('description', e.target.value)}
                                className="w-full bg-white/10 border-none rounded-[32px] p-8 text-white placeholder:text-white/30 font-black italic shadow-inner focus:ring-4 focus:ring-white/10 transition-all text-sm resize-none"
                                placeholder={__('Describe the criteria...')}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-50 block ml-2">{__('Example Image')}</label>
                        <div className="relative h-full">
                            <input 
                                type="file" 
                                className="hidden" 
                                id="defect-img" 
                                onChange={e => setData('image', e.target.files[0])}
                            />
                            <label 
                                htmlFor="defect-img"
                                className="h-full min-h-[300px] border-4 border-dashed border-white/10 rounded-[40px] flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-white/5 transition-all group overflow-hidden relative"
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
        </motion.div>
    );
}
