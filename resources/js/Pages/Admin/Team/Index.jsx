import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { 
    Plus, User, Shield, UserCheck, 
    Mail, Key, Edit2, Trash2,
    Save, X, ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/Hooks/useTranslation';
import { useState } from 'react';

export default function TeamManagement({ users }) {
    const { __ } = useTranslation();
    const [isAdding, setIsAdding] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    return (
        <AdminLayout>
            <Head title={__('Admin Team')} />
            
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-black text-[#004D5C] dark:text-white tracking-tighter mb-2 italic uppercase">
                        {__('Admin Team')}
                    </h1>
                    <p className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest text-[10px]">
                        {__('Manage Administrative Staff and Roles')}
                    </p>
                </div>
                <motion.button 
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsAdding(true)}
                    className="bg-[#004D5C] dark:bg-[#CCEBF0] text-white dark:text-slate-900 px-8 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl flex items-center gap-3 transition-colors"
                >
                    <Plus className="h-4 w-4" /> {__('Add Member')}
                </motion.button>
            </div>

            <AnimatePresence>
                {(isAdding || editingUser) && (
                    <UserForm 
                        user={editingUser} 
                        onClose={() => {
                            setIsAdding(false);
                            setEditingUser(null);
                        }} 
                    />
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user, index) => (
                    <motion.div 
                        key={user.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white dark:bg-slate-900 rounded-[40px] p-8 shadow-sm border border-white/50 dark:border-white/5 group hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8">
                            <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full ${user.role === 'admin' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
                                {user.role === 'admin' ? __('Nav Role Admin') : __('Nav Role Staff')}
                            </span>
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <div className="h-24 w-24 bg-[#EEF8F9] dark:bg-slate-800 rounded-3xl flex items-center justify-center text-[#006D7E] dark:text-[#CCEBF0] mb-6 shadow-inner group-hover:bg-[#004D5C] group-hover:text-white transition-all duration-500 group-hover:rotate-6">
                                <User className="h-10 w-10" />
                            </div>
                            
                            <h3 className="text-xl font-black text-[#004D5C] dark:text-white mb-1 italic tracking-tight">{user.name}</h3>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-8">{user.email}</p>

                            <div className="flex gap-2 w-full pt-6 border-t border-slate-50 dark:border-white/5">
                                <button 
                                    onClick={() => setEditingUser(user)}
                                    className="flex-1 py-3 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-[#006D7E] rounded-xl transition-all font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2"
                                >
                                    <Edit2 className="h-3 w-3" /> {__('Edit')}
                                </button>
                                <button 
                                    onClick={() => {
                                        if(confirm(__('Confirm Delete'))) {
                                            router.delete(route('admin.team.destroy', user.id));
                                        }
                                    }}
                                    className="flex-1 py-3 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-500 rounded-xl transition-all font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2"
                                >
                                    <Trash2 className="h-3 w-3" /> {__('Delete')}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </AdminLayout>
    );
}

function UserForm({ user, onClose }) {
    const { __ } = useTranslation();
    const { data, setData, post, put, processing, errors } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        role: user?.role || 'staff',
        password: '',
        password_confirmation: ''
    });

    const submit = (e) => {
        e.preventDefault();
        if (user) {
            put(route('admin.team.update', user.id), { onSuccess: onClose });
        } else {
            post(route('admin.team.store'), { onSuccess: onClose });
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-[#004D5C] dark:bg-slate-800 p-12 rounded-[50px] shadow-2xl mb-10 relative overflow-hidden text-white"
        >
            <form onSubmit={submit} className="relative z-10 space-y-8">
                <div className="flex justify-between items-start">
                    <h2 className="text-3xl font-black italic tracking-tighter">{user ? __('Edit Profile') : __('Add New Member')}</h2>
                    <button type="button" onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X /></button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-50 block ml-2">{__('Full Name')}</label>
                        <input 
                            value={data.name} 
                            onChange={e => setData('name', e.target.value)}
                            className="w-full bg-white/10 border-none rounded-2xl p-6 text-white placeholder:text-white/30 font-black italic shadow-inner focus:ring-4 focus:ring-white/10 transition-all text-sm"
                            placeholder={__('Enter name...')}
                        />
                        {errors.name && <p className="text-rose-400 text-[10px] font-bold uppercase ml-2">{errors.name}</p>}
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-50 block ml-2">{__('Email Address')}</label>
                        <input 
                            type="email"
                            value={data.email} 
                            onChange={e => setData('email', e.target.value)}
                            className="w-full bg-white/10 border-none rounded-2xl p-6 text-white placeholder:text-white/30 font-black italic shadow-inner focus:ring-4 focus:ring-white/10 transition-all text-sm"
                            placeholder="email@almus.tech"
                        />
                        {errors.email && <p className="text-rose-400 text-[10px] font-bold uppercase ml-2">{errors.email}</p>}
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-50 block ml-2">{__('Role')}</label>
                        <select 
                            value={data.role} 
                            onChange={e => setData('role', e.target.value)}
                            className="w-full bg-white/10 border-none rounded-2xl p-6 text-white font-black italic shadow-inner focus:ring-4 focus:ring-white/10 transition-all text-sm appearance-none"
                        >
                            <option value="staff" className="bg-slate-900">{__('Nav Role Staff')}</option>
                            <option value="admin" className="bg-slate-900">{__('Nav Role Admin')}</option>
                        </select>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-50 block ml-2">{__('Password')} {user && `(${__('Leave blank to keep current')})`}</label>
                        <input 
                            type="password"
                            value={data.password} 
                            onChange={e => setData('password', e.target.value)}
                            className="w-full bg-white/10 border-none rounded-2xl p-6 text-white placeholder:text-white/30 font-black italic shadow-inner focus:ring-4 focus:ring-white/10 transition-all text-sm"
                        />
                    </div>

                    {!user && (
                         <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-50 block ml-2">{__('Confirm Password')}</label>
                            <input 
                                type="password"
                                value={data.password_confirmation} 
                                onChange={e => setData('password_confirmation', e.target.value)}
                                className="w-full bg-white/10 border-none rounded-2xl p-6 text-white placeholder:text-white/30 font-black italic shadow-inner focus:ring-4 focus:ring-white/10 transition-all text-sm"
                            />
                        </div>
                    )}
                </div>

                <div className="flex justify-end pt-4">
                    <motion.button 
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={processing}
                        className="bg-white dark:bg-[#CCEBF0] text-[#004D5C] dark:text-slate-900 px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl flex items-center gap-3 transition-colors disabled:opacity-50"
                    >
                        {processing ? <div className="h-4 w-4 border-2 border-[#004D5C]/30 border-t-[#004D5C] rounded-full animate-spin"></div> : <Save className="h-4 w-4" />}
                        {user ? __('Update Member') : __('Add Member')}
                    </motion.button>
                </div>
            </form>
        </motion.div>
    );
}
