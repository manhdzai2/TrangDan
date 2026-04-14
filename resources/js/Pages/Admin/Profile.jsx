import { useState, useRef } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { 
    User, Mail, Phone, Camera, 
    Lock, Shield, Save, Trash2, 
    CheckCircle, AlertCircle, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/Hooks/useTranslation';

export default function Profile() {
    const { __ } = useTranslation();
    const { auth } = usePage().props;
    const [activeTab, setActiveTab] = useState('info');
    const fileInputRef = useRef();

    const { data, setData, post, processing, errors, reset } = useForm({
        name: auth.user.name,
        email: auth.user.email,
        phone: auth.user.phone || '',
        avatar: null,
    });

    const { data: passwordData, setData: setPasswordData, post: postPassword, processing: passwordProcessing, errors: passwordErrors, reset: resetPassword } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        post(route('admin.profile.update'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                // Success feedback
            }
        });
    };

    const handleUpdatePassword = (e) => {
        e.preventDefault();
        postPassword(route('admin.profile.password'), {
            preserveScroll: true,
            onSuccess: () => resetPassword(),
        });
    };

    const triggerFileSelect = () => fileInputRef.current.click();

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('avatar', file);
            // Optionally preview
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <AdminLayout>
            <Head title={__('Staff Profile Title')} />

            <div className="flex justify-between items-end mb-10">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="text-4xl font-black text-[#004D5C] tracking-tighter mb-2 italic lowercase first-letter:uppercase">{__('Staff Profile Title')}</h1>
                    <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">{__('Admin Profile Note')}</p>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Profile Sidebar */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                >
                    <div className="bg-white p-10 rounded-[50px] shadow-sm border border-white/50 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#EEF8F9] rounded-full translate-x-1/2 -translate-y-1/2 opacity-50 blur-3xl transition-transform duration-1000 group-hover:scale-150"></div>
                        
                        <div className="flex flex-col items-center text-center relative z-10">
                            <div className="relative mb-6">
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    className="h-32 w-32 bg-[#004D5C] text-white rounded-[40px] flex items-center justify-center text-5xl font-black italic shadow-2xl overflow-hidden border-4 border-white"
                                >
                                    {auth.user.avatar ? (
                                        <img src={`/storage/${auth.user.avatar}`} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        auth.user.name.charAt(0)
                                    )}
                                </motion.div>
                                <motion.button 
                                    whileHover={{ scale: 1.1, rotate: 10 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={triggerFileSelect}
                                    className="absolute -bottom-2 -right-2 h-10 w-10 bg-white shadow-xl rounded-2xl flex items-center justify-center text-[#006D7E] border border-slate-100"
                                >
                                    <Camera className="h-5 w-5" />
                                </motion.button>
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    className="hidden" 
                                    onChange={handleAvatarChange}
                                    accept="image/*"
                                />
                            </div>
                            
                            <h2 className="text-2xl font-black text-[#004D5C] tracking-tight mb-1 italic">{auth.user.name}</h2>
                            <span className="px-4 py-1.5 bg-[#EEF8F9] text-[#006D7E] text-[10px] font-black uppercase tracking-widest rounded-xl border border-[#006D7E]/10 mb-6">
                                {auth.user.role === 'admin' ? __('Admin Role Admin') : __('Admin Role HR')}
                            </span>

                            <div className="w-full space-y-2">
                                <button 
                                    onClick={() => setActiveTab('info')}
                                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest ${activeTab === 'info' ? 'bg-[#004D5C] text-white shadow-xl shadow-[#004d5c]/20' : 'text-slate-400 hover:bg-slate-50'}`}
                                >
                                    <User className="h-4 w-4" /> {__('Admin Tab Basic')}
                                </button>
                                <button 
                                    onClick={() => setActiveTab('security')}
                                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest ${activeTab === 'security' ? 'bg-[#004D5C] text-white shadow-xl shadow-[#004d5c]/20' : 'text-slate-400 hover:bg-slate-50'}`}
                                >
                                    <Shield className="h-4 w-4" /> {__('Admin Tab Security')}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#004D5C] p-8 rounded-[40px] shadow-2xl relative overflow-hidden group">
                        <motion.div 
                            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                            transition={{ duration: 10, repeat: Infinity }}
                            className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"
                        ></motion.div>
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="h-12 w-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                                <Sparkles className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h4 className="text-white font-black italic text-sm">{__('Admin Performance Title')}</h4>
                                <p className="text-white/40 text-[9px] font-black uppercase tracking-widest">{__('Admin Performance Note')}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Content Area */}
                <div className="lg:col-span-2">
                    <AnimatePresence mode="wait">
                        {activeTab === 'info' && (
                            <motion.div 
                                key="info"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-white p-12 rounded-[50px] shadow-sm border border-white/50"
                            >
                                <h3 className="text-xl font-black text-[#004D5C] italic mb-10 tracking-tight flex items-center gap-3">
                                    <User className="text-[#006D7E]" /> {__('Staff Update Info')}
                                </h3>

                                <form onSubmit={handleUpdateProfile} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{__('Auth Name')}</label>
                                            <input 
                                                type="text"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#006D7E] transition-all font-black text-[#004D5C] italic"
                                            />
                                            {errors.name && <p className="text-rose-500 text-[10px] font-bold mt-1 px-2">{errors.name}</p>}
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{__('Admin System Email')}</label>
                                            <input 
                                                type="email"
                                                value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                                className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#006D7E] transition-all font-black text-[#004D5C]"
                                            />
                                            {errors.email && <p className="text-rose-500 text-[10px] font-bold mt-1 px-2">{errors.email}</p>}
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{__('Staff Phone Label')}</label>
                                            <input 
                                                type="text"
                                                value={data.phone}
                                                onChange={e => setData('phone', e.target.value)}
                                                placeholder={__('Admin Not Updated')}
                                                className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#006D7E] transition-all font-black text-[#004D5C]"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{__('Admin Joined Date')}</label>
                                            <div className="w-full bg-slate-100/50 text-slate-400 rounded-2xl p-4 font-black italic cursor-not-allowed">
                                                {new Date(auth.user.created_at).toLocaleDateString(usePage().props.locale === 'en' ? 'en-US' : 'vi-VN')}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-6">
                                        <motion.button 
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            disabled={processing}
                                            className="bg-[#004D5C] text-white font-black py-4 px-10 rounded-2xl flex items-center gap-3 shadow-2xl shadow-[#004d5c]/20"
                                        >
                                            <Save className="h-5 w-5" /> {__('Staff Save Changes')}
                                        </motion.button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        {activeTab === 'security' && (
                            <motion.div 
                                key="security"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-white p-12 rounded-[50px] shadow-sm border border-white/50"
                            >
                                <h3 className="text-xl font-black text-[#004D5C] italic mb-10 tracking-tight flex items-center gap-3">
                                    <Lock className="text-[#006D7E]" /> {__('Staff Change Password')}
                                </h3>

                                <form onSubmit={handleUpdatePassword} className="max-w-xl space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{__('Profile Current Password')}</label>
                                        <input 
                                            type="password"
                                            value={passwordData.current_password}
                                            onChange={e => setPasswordData('current_password', e.target.value)}
                                            className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#006D7E] transition-all"
                                        />
                                        {passwordErrors.current_password && <p className="text-rose-500 text-[10px] font-bold mt-1 px-2">{passwordErrors.current_password}</p>}
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{__('Profile New Password')}</label>
                                        <input 
                                            type="password"
                                            value={passwordData.password}
                                            onChange={e => setPasswordData('password', e.target.value)}
                                            className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#006D7E] transition-all"
                                        />
                                        {passwordErrors.password && <p className="text-rose-500 text-[10px] font-bold mt-1 px-2">{passwordErrors.password}</p>}
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{__('Auth Confirm Password')}</label>
                                        <input 
                                            type="password"
                                            value={passwordData.password_confirmation}
                                            onChange={e => setPasswordData('password_confirmation', e.target.value)}
                                            className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#006D7E] transition-all"
                                        />
                                    </div>

                                    <div className="flex justify-end pt-6">
                                        <motion.button 
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            disabled={passwordProcessing}
                                            className="bg-[#004D5C] text-white font-black py-4 px-10 rounded-2xl flex items-center gap-3 shadow-2xl shadow-[#004d5c]/20"
                                        >
                                            <Save className="h-5 w-5" /> {__('Staff Update Password Button')}
                                        </motion.button>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </AdminLayout>
    );
}
