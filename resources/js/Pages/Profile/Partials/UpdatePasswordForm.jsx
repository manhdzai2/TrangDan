import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { motion, Transition } from 'framer-motion';
import { Lock, key as KeyIcon, Eye, Save, CheckCircle } from 'lucide-react';
import { useTranslation } from '@/Hooks/useTranslation';

export default function UpdatePasswordForm({ className = '' }) {
    const { __ } = useTranslation();
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <form onSubmit={updatePassword} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Current Password */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#004D5C]/50 dark:text-white/30 ml-4">
                            {__('Profile Current Password')}
                        </label>
                        <div className="relative group">
                            <Lock className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-amber-400 transition-colors" />
                            <input
                                id="current_password"
                                ref={currentPasswordInput}
                                type="password"
                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-[24px] pl-14 pr-6 py-4 text-sm font-bold text-[#004D5C] dark:text-white placeholder:text-slate-300 focus:ring-4 focus:ring-amber-400/10 focus:border-amber-400 transition-all outline-none"
                                value={data.current_password}
                                onChange={(e) => setData('current_password', e.target.value)}
                                autoComplete="current-password"
                                placeholder="••••••••"
                            />
                        </div>
                        <InputError message={errors.current_password} className="ml-4" />
                    </div>

                    <div className="hidden md:block"></div>

                    {/* New Password */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#004D5C]/50 dark:text-white/30 ml-4">
                            {__('Profile New Password')}
                        </label>
                        <div className="relative group">
                            <KeyIcon className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-amber-400 transition-colors" />
                            <input
                                id="password"
                                ref={passwordInput}
                                type="password"
                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-[24px] pl-14 pr-6 py-4 text-sm font-bold text-[#004D5C] dark:text-white placeholder:text-slate-300 focus:ring-4 focus:ring-amber-400/10 focus:border-amber-400 transition-all outline-none"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                autoComplete="new-password"
                                placeholder={__('Profile New Password Placeholder')}
                            />
                        </div>
                        <InputError message={errors.password} className="ml-4" />
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#004D5C]/50 dark:text-white/30 ml-4">
                            {__('Auth Confirm Password')}
                        </label>
                        <div className="relative group">
                            <CheckCircle className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-amber-400 transition-colors" />
                            <input
                                id="password_confirmation"
                                type="password"
                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-[24px] pl-14 pr-6 py-4 text-sm font-bold text-[#004D5C] dark:text-white placeholder:text-slate-300 focus:ring-4 focus:ring-amber-400/10 focus:border-amber-400 transition-all outline-none"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                autoComplete="new-password"
                                placeholder={__('Profile Confirm Password Placeholder')}
                            />
                        </div>
                        <InputError message={errors.password_confirmation} className="ml-4" />
                    </div>
                </div>

                <div className="flex items-center gap-6 pt-4 px-4">
                    <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={processing}
                        className="px-10 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-[24px] text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-amber-400/20 hover:shadow-amber-400/40 disabled:opacity-50 transition-all flex items-center gap-3"
                    >
                        <Save className="h-4 w-4" />
                        {__('Profile Update Password Button')}
                    </motion.button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-out duration-300"
                        enterFrom="opacity-0 translate-x-4"
                        enterTo="opacity-100 translate-x-0"
                        leave="transition ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        className="flex items-center gap-2 text-emerald-500 text-xs font-black uppercase tracking-widest"
                    >
                        <CheckCircle className="h-4 w-4" />
                        {__('Profile Updated')}
                    </Transition>
                </div>
            </form>
        </section>
    );
}
