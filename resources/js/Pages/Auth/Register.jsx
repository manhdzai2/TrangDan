import React, { useEffect } from 'react';
import RecruitmentLayout from '@/Layouts/RecruitmentLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Sparkles, ArrowRight, User, Lock, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/Hooks/useTranslation';

export default function Register() {
    const { __ } = useTranslation();
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <RecruitmentLayout>
            <Head title={`${__('Register')} - ALMUS TECH`} />

            <section className="min-h-screen pt-40 pb-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden flex items-center justify-center">
                {/* Background Blobs */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 dark:opacity-40">
                    <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-[#006D7E] blur-[120px] rounded-full animate-pulse"></div>
                    <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-[#004D5C] blur-[100px] rounded-full"></div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-2xl px-6 relative z-10"
                >
                    <div className="bg-white dark:bg-slate-900 px-10 py-16 rounded-[60px] shadow-2l shadow-[#006D7E]/10 border border-white dark:border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 p-10 opacity-10">
                            <Sparkles className="h-24 w-24 text-[#006D7E]" />
                        </div>

                        <div className="text-center mb-12">
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-[#EEF8F9] dark:bg-[#002B33] text-[#006D7E] rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-[#006D7E]/10"
                            >
                                <Sparkles className="h-3 w-3 fill-current" /> {__('Auth Register Badge')}
                            </motion.div>
                            <h2 className="text-5xl font-black text-[#004D5C] dark:text-[#CCEBF0] tracking-tighter italic mb-4">{__('Auth Register Title')}</h2>
                            <p className="text-slate-500 dark:text-slate-400 font-medium italic">{__('Auth Register Sub')}</p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 block opacity-60 dark:text-white ml-2">{__('Auth Name')}</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#006D7E] transition-colors">
                                            <User className="h-5 w-5" />
                                        </div>
                                        <input 
                                            id="name"
                                            type="text"
                                            required
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-14 pr-5 focus:ring-2 focus:ring-[#006D7E]/20 focus:border-[#006D7E] transition placeholder:text-slate-300 dark:placeholder:text-white/10 font-bold text-sm text-[#004D5C] dark:text-white"
                                            placeholder="Nguyễn Văn A"
                                            autoComplete="name"
                                        />
                                    </div>
                                    {errors.name && <div className="text-rose-500 text-[10px] mt-2 font-black italic ml-2">⚠️ {errors.name}</div>}
                                </div>

                                {/* Email */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 block opacity-60 dark:text-white ml-2">{__('Auth Email')}</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#006D7E] transition-colors">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <input 
                                            id="email"
                                            type="email"
                                            required
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-14 pr-5 focus:ring-2 focus:ring-[#006D7E]/20 focus:border-[#006D7E] transition placeholder:text-slate-300 dark:placeholder:text-white/10 font-bold text-sm text-[#004D5C] dark:text-white"
                                            placeholder="email@example.com"
                                            autoComplete="username"
                                        />
                                    </div>
                                    {errors.email && <div className="text-rose-500 text-[10px] mt-2 font-black italic ml-2">⚠️ {errors.email}</div>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Password */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 block opacity-60 dark:text-white ml-2">{__('Auth Password')}</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#006D7E] transition-colors">
                                            <Lock className="h-5 w-5" />
                                        </div>
                                        <input 
                                            id="password"
                                            type="password"
                                            required
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-14 pr-5 focus:ring-2 focus:ring-[#006D7E]/20 focus:border-[#006D7E] transition placeholder:text-slate-300 dark:placeholder:text-white/10 font-bold text-sm text-[#004D5C] dark:text-white"
                                            placeholder="••••••••"
                                            autoComplete="new-password"
                                        />
                                    </div>
                                    {errors.password && <div className="text-rose-500 text-[10px] mt-2 font-black italic ml-2">⚠️ {errors.password}</div>}
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 block opacity-60 dark:text-white ml-2">{__('Auth Confirm Password')}</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#006D7E] transition-colors">
                                            <Lock className="h-5 w-5" />
                                        </div>
                                        <input 
                                            id="password_confirmation"
                                            type="password"
                                            required
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-14 pr-5 focus:ring-2 focus:ring-[#006D7E]/20 focus:border-[#006D7E] transition placeholder:text-slate-300 dark:placeholder:text-white/10 font-bold text-sm text-[#004D5C] dark:text-white"
                                            placeholder="••••••••"
                                            autoComplete="new-password"
                                        />
                                    </div>
                                    {errors.password_confirmation && <div className="text-rose-500 text-[10px] mt-2 font-black italic ml-2">⚠️ {errors.password_confirmation}</div>}
                                </div>
                            </div>

                            <div className="pt-8">
                                <motion.button
                                    whileHover={{ y: -4, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={processing}
                                    className="w-full bg-[#004D5C] text-white py-5 rounded-[24px] font-black uppercase tracking-[0.2em] shadow-xl shadow-[#004D5C]/20 hover:bg-[#003540] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {__('Auth Submit Register')} <ArrowRight className="h-5 w-5" />
                                </motion.button>
                            </div>
                            
                            <div className="text-center mt-12 pt-8 border-t border-slate-100 dark:border-white/5">
                                <p className="text-slate-400 dark:text-slate-500 font-medium italic mb-2">{__('Auth Has Account')}</p>
                                <Link href="/login" className="inline-flex items-center gap-2 text-[#006D7E] font-black uppercase tracking-[0.2em] text-xs hover:gap-4 transition-all group">
                                    <ArrowRight className="h-4 w-4 rotate-180" /> {__('Auth Login Action')}
                                </Link>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </section>
        </RecruitmentLayout>
    );
}
