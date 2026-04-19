import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { 
    Settings, Shield, Bell, User, 
    Globe, Save, Mail, Building, Sparkles, Check,
    Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/Hooks/useTranslation';

export default function SettingsPage({ settings }) {
    const { __ } = useTranslation();
    const { data, setData, post, processing, wasSuccessful } = useForm({
        company_name: settings?.company_name || 'ALMUS TECH',
        admin_email: settings?.admin_email || 'admin@almustech.com',
        notifications: settings?.notifications ?? true,
        two_factor: settings?.two_factor ?? true,
        maintenance_mode: settings?.maintenance_mode ?? false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout>
            <Head title={__('Settings Page Title')} />
            
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center mb-10"
            >
                <div>
                    <h1 className="text-4xl font-black text-[#004D5C] dark:text-white tracking-tighter mb-2 italic uppercase transition-colors">{__('Admin Settings Title')}</h1>
                    <p className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest text-[10px]">{__('Admin Settings Note')}</p>
                </div>
                <AnimatePresence>
                    {wasSuccessful && (
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] border border-emerald-100 dark:border-emerald-800/30 flex items-center gap-2 shadow-lg transition-colors"
                        >
                            <Sparkles className="h-4 w-4" /> {__('Admin Save Success')}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10">
                    {/* General Settings */}
                    <Section title={__('Admin Biz Info')} icon={<Building className="h-4 w-4 text-[#006D7E] dark:text-[#CCEBF0]" />}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                            <InputField 
                                label={__('Admin Company Name')} 
                                value={data.company_name} 
                                onChange={e => setData('company_name', e.target.value)}
                            />
                            <InputField 
                                label={__('Admin Email')} 
                                type="email"
                                value={data.admin_email} 
                                onChange={e => setData('admin_email', e.target.value)}
                            />
                        </div>
                    </Section>

                    {/* Notification Settings */}
                    <Section title={__('Admin Notif Security')} icon={<Bell className="h-4 w-4 text-[#006D7E] dark:text-[#CCEBF0]" />}>
                        <div className="space-y-4 relative z-10">
                            <ToggleItem 
                                icon={<Mail className="h-6 w-6" />}
                                title={__('Admin Email Notif')}
                                description={__('Admin Email Notif Desc')}
                                enabled={data.notifications}
                                setEnabled={v => setData('notifications', v)}
                            />
                            <div className="h-px bg-slate-50 dark:bg-white/5 w-full ml-20 transition-colors"></div>
                            <ToggleItem 
                                icon={<Shield className="h-6 w-6" />}
                                title={__('Admin 2FA')}
                                description={__('Admin 2FA Desc')}
                                enabled={data.two_factor}
                                setEnabled={v => setData('two_factor', v)}
                            />
                        </div>
                    </Section>

                    {/* System Maintenance & Backup */}
                    <Section title={__('Admin System Backup')} icon={<Database className="h-4 w-4 text-[#006D7E] dark:text-[#CCEBF0]" />}>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-10 bg-[#F3F7F8] dark:bg-slate-800/50 p-10 rounded-[40px] border-2 border-white dark:border-slate-800 shadow-inner relative overflow-hidden group transition-colors">
                            <div className="flex-1 relative z-10">
                                <h4 className="text-xl font-black text-[#004D5C] dark:text-white italic tracking-tight mb-2 uppercase transition-colors">{__('Admin DB Backup')}</h4>
                                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 italic uppercase tracking-widest leading-relaxed transition-colors">
                                    {__('Admin Backup Desc')}
                                </p>
                            </div>
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    router.post(route('admin.system.backup'), {}, {
                                        onSuccess: () => alert(__('Admin Backup Success'))
                                    })
                                }}
                                className="bg-[#004D5C] dark:bg-[#CCEBF0] text-white dark:text-slate-900 px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl flex items-center gap-3 relative z-10 transition-colors"
                            >
                                <Database className="h-5 w-5" /> {__('Admin Backup Button')}
                            </motion.button>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#006D7E]/5 dark:bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
                        </div>
                    </Section>
                </div>

                <div className="lg:col-span-1">
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="sticky top-32"
                    >
                        <div className="bg-[#004D5C] dark:bg-slate-900 p-12 rounded-[50px] shadow-2xl relative overflow-hidden text-white group transition-colors">
                            <motion.div 
                                animate={{ 
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 90, 0]
                                }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl opacity-20"
                            ></motion.div>
                            
                            <h2 className="text-3xl font-black italic mb-6 tracking-tighter">{__('Admin Save Config')}</h2>
                            <p className="text-white/50 dark:text-white/30 text-xs font-black uppercase tracking-widest mb-10 leading-relaxed transition-colors">
                                {__('Admin Config Note')}
                            </p>
                            
                            <motion.button 
                                type="submit"
                                whileHover={{ scale: 1.02, y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={processing}
                                className="w-full bg-white dark:bg-[#CCEBF0] text-[#004D5C] dark:text-slate-900 py-6 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-[11px]"
                            >
                                {processing ? (
                                    <div className="h-5 w-5 border-2 border-[#004D5C]/30 border-t-[#004D5C] rounded-full animate-spin"></div>
                                ) : (
                                    <Check className="h-5 w-5" />
                                )}
                                {__('Admin Update Button')}
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </form>
        </AdminLayout>
    );
}

function Section({ title, icon, children }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 p-12 rounded-[50px] shadow-sm border border-white/50 dark:border-white/5 relative overflow-hidden group transition-colors"
        >
            <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-600 tracking-[0.3em] uppercase mb-10 flex items-center gap-3 transition-colors">
                {icon} {title}
            </h3>
            <div className="relative z-10 transition-colors">
                {children}
            </div>
        </motion.div>
    );
}

function InputField({ label, value, onChange, type = "text" }) {
    return (
        <div className="space-y-4">
            <label className="text-[10px] font-black text-[#004D5C] dark:text-white uppercase tracking-[0.2em] block ml-2 transition-colors">{label}</label>
            <input 
                type={type} 
                value={value}
                onChange={onChange}
                className="w-full bg-[#F3F7F8] dark:bg-slate-800 border-none rounded-[24px] p-6 text-sm font-black text-[#004D5C] dark:text-white focus:ring-4 focus:ring-[#006D7E]/10 transition-all shadow-inner italic"
            />
        </div>
    );
}

function ToggleItem({ icon, title, description, enabled, setEnabled }) {
    return (
        <div className="flex items-center justify-between gap-6 p-6 hover:bg-[#F3F7F8]/80 dark:hover:bg-white/5 rounded-[32px] transition duration-500 group">
            <div className="flex items-center gap-6">
                <div className="h-14 w-14 bg-[#EEF8F9] dark:bg-slate-800 rounded-[20px] flex items-center justify-center text-[#006D7E] dark:text-[#CCEBF0] group-hover:bg-[#004D5C] group-hover:text-white transition-all duration-500 shadow-inner group-hover:rotate-6">
                    {icon}
                </div>
                <div>
                    <h4 className="font-black text-[#004D5C] dark:text-white italic tracking-tight mb-1 transition-colors">{title}</h4>
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 italic uppercase tracking-widest leading-none transition-colors">{description}</p>
                </div>
            </div>
            <motion.button 
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={() => setEnabled(!enabled)}
                className={`w-16 h-8 rounded-full relative transition-colors duration-500 ${enabled ? 'bg-[#006D7E]' : 'bg-slate-200 dark:bg-slate-700'}`}
            >
                <motion.div 
                    initial={false}
                    animate={{ x: enabled ? 32 : 4 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 left-0 h-6 w-6 bg-white rounded-full shadow-md"
                ></motion.div>
            </motion.button>
        </div>
    );
}
