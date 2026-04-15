import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { 
    Plus, Search, Edit2, Trash2, 
    GripVertical, Target, Sparkles,
    Save, X, Shield, Zap, Wrench, 
    Activity, CheckCircle, Layers, 
    Settings, ClipboardCheck,
    ChevronUp, ChevronDown, Inbox
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/Hooks/useTranslation';
import { useState } from 'react';

// Map of available icons for selection
const ICON_MAP = {
    Target, Search, Shield, Zap, Wrench, 
    Activity, CheckCircle, Layers, 
    Settings, ClipboardCheck
};

export default function OQCManagement({ steps }) {
    const { __ } = useTranslation();
    const [isAdding, setIsAdding] = useState(false);
    const [editingStep, setEditingStep] = useState(null);

    const handleReorder = (id, direction) => {
        const itemIndex = steps.findIndex(s => s.id === id);
        if ((direction === 'up' && itemIndex === 0) || (direction === 'down' && itemIndex === steps.length - 1)) return;

        const newSteps = [...steps];
        const targetIndex = direction === 'up' ? itemIndex - 1 : itemIndex + 1;
        [newSteps[itemIndex], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[itemIndex]];

        router.post(route('admin.cms.oqc.reorder'), {
            ids: newSteps.map(s => s.id)
        }, { preserveScroll: true });
    };

    return (
        <AdminLayout>
            <Head title={__('Admin CMS OQC')} />
            
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-black text-[#004D5C] dark:text-white tracking-tighter mb-2 italic uppercase">
                        {__('Admin CMS OQC')}
                    </h1>
                    <p className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest text-[10px]">
                        {__('Manage Quality Control Process Steps')}
                    </p>
                </div>
                <motion.button 
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsAdding(true)}
                    className="bg-[#004D5C] dark:bg-[#CCEBF0] text-white dark:text-slate-900 px-8 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl flex items-center gap-3 transition-colors"
                >
                    <Plus className="h-4 w-4" /> {__('Add Step')}
                </motion.button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <AnimatePresence>
                    {(isAdding || editingStep) && (
                        <StepForm 
                            step={editingStep} 
                            onClose={() => {
                                setIsAdding(false);
                                setEditingStep(null);
                            }} 
                        />
                    )}
                </AnimatePresence>

                <div className="space-y-4">
                    {steps.length === 0 ? (
                        <div className="bg-white dark:bg-slate-900 p-20 rounded-[40px] border border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center">
                            <div className="h-20 w-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-slate-300 mb-6">
                                <Inbox className="h-10 w-10" />
                            </div>
                            <h3 className="text-xl font-black text-[#004D5C] dark:text-white italic mb-2 uppercase">{__('No steps defined')}</h3>
                            <p className="text-slate-400 dark:text-slate-500 text-sm font-medium italic">{__('Click Add Step to start building your OQC process.')}</p>
                        </div>
                    ) : (
                        steps.map((step, index) => {
                            const IconComponent = ICON_MAP[step.icon] || Target;
                            return (
                                <motion.div 
                                    key={step.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white dark:bg-slate-900 p-8 rounded-[40px] shadow-sm border border-white/50 dark:border-white/5 flex items-center gap-8 group hover:shadow-xl transition-all duration-500"
                                >
                                    <div className="flex flex-col gap-1 items-center">
                                        <button 
                                            onClick={() => handleReorder(step.id, 'up')}
                                            disabled={index === 0}
                                            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-300 hover:text-[#006D7E] disabled:opacity-0 transition-all"
                                        >
                                            <ChevronUp className="h-4 w-4" />
                                        </button>
                                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-300">
                                            <GripVertical className="h-4 w-4" />
                                        </div>
                                        <button 
                                            onClick={() => handleReorder(step.id, 'down')}
                                            disabled={index === steps.length - 1}
                                            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-300 hover:text-[#006D7E] disabled:opacity-0 transition-all"
                                        >
                                            <ChevronDown className="h-4 w-4" />
                                        </button>
                                    </div>
                                    
                                    <div className="h-16 w-16 bg-[#EEF8F9] dark:bg-slate-800 rounded-2xl flex items-center justify-center text-[#006D7E] dark:text-[#CCEBF0] shrink-0 shadow-inner group-hover:bg-[#004D5C] group-hover:text-white transition-all duration-500">
                                        <IconComponent className="h-8 w-8" />
                                    </div>

                                    <div className="flex-1">
                                        <div className="text-[10px] font-black text-[#006D7E] uppercase tracking-widest mb-1 opacity-50">STEP 0{index + 1}</div>
                                        <h3 className="text-xl font-black text-[#004D5C] dark:text-white italic tracking-tight mb-1">{step.title}</h3>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium italic line-clamp-1">{step.description}</p>
                                    </div>

                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => setEditingStep(step)}
                                            className="p-4 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-[#006D7E] rounded-2xl transition-all"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                        <button 
                                            onClick={() => {
                                                if(confirm(__('Confirm Delete'))) {
                                                    router.delete(route('admin.cms.oqc.destroy', step.id));
                                                }
                                            }}
                                            className="p-4 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-500 rounded-2xl transition-all"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

function StepForm({ step, onClose }) {
    const { __ } = useTranslation();
    const { data, setData, post, put, processing } = useForm({
        title: step?.title || '',
        description: step?.description || '',
        icon: step?.icon || 'Target',
        order: step?.order || 0
    });

    const submit = (e) => {
        e.preventDefault();
        if (step) {
            put(route('admin.cms.oqc.update', step.id), { onSuccess: onClose });
        } else {
            post(route('admin.cms.oqc.store'), { onSuccess: onClose });
        }
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
                    <h2 className="text-3xl font-black italic tracking-tighter uppercase">{step ? __('Edit Step') : __('Add New Step')}</h2>
                    <button type="button" onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X /></button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-50 block ml-2">{__('Step Title')}</label>
                        <input 
                            value={data.title} 
                            onChange={e => setData('title', e.target.value)}
                            className="w-full bg-white/10 border-none rounded-2xl p-6 text-white placeholder:text-white/30 font-black italic shadow-inner focus:ring-4 focus:ring-white/10 transition-all text-sm"
                            placeholder={__('Enter title...')}
                            required
                        />
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-50 block ml-2">{__('Select Icon')}</label>
                        <div className="grid grid-cols-5 gap-3">
                            {Object.entries(ICON_MAP).map(([name, Icon]) => (
                                <button
                                    key={name}
                                    type="button"
                                    onClick={() => setData('icon', name)}
                                    className={`p-4 rounded-xl flex items-center justify-center transition-all ${data.icon === name ? 'bg-[#CCEBF0] text-[#004D5C] shadow-lg' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                                    title={name}
                                >
                                    <Icon className="h-5 w-5" />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="md:col-span-2 space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-50 block ml-2">{__('Description')}</label>
                        <textarea 
                            rows={4}
                            value={data.description} 
                            onChange={e => setData('description', e.target.value)}
                            className="w-full bg-white/10 border-none rounded-[32px] p-8 text-white placeholder:text-white/30 font-black italic shadow-inner focus:ring-4 focus:ring-white/10 transition-all text-sm resize-none"
                            placeholder={__('Describe the OQC step...')}
                            required
                        />
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
                        {__('Save Changes')}
                    </motion.button>
                </div>
            </form>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        </motion.div>
    );
}

