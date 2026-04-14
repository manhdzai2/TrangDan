import InputError from '@/Components/InputError';
import { Link, useForm, usePage } from '@inertiajs/react';
import { motion, Transition } from 'framer-motion';
import { Mail, User as UserIcon, CheckCircle, AlertCircle, Save } from 'lucide-react';
import { useTranslation } from '@/Hooks/useTranslation';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const { __ } = useTranslation();
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <form onSubmit={submit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Name Input */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#004D5C]/50 dark:text-white/30 ml-4">
                            {__('Auth Name')}
                        </label>
                        <div className="relative group">
                            <UserIcon className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-[#00B4D8] transition-colors" />
                            <input
                                id="name"
                                type="text"
                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-[24px] pl-14 pr-6 py-4 text-sm font-bold text-[#004D5C] dark:text-white placeholder:text-slate-300 focus:ring-4 focus:ring-[#00B4D8]/10 focus:border-[#00B4D8] transition-all outline-none"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder={__('Jobs Apply Name Placeholder')}
                            />
                        </div>
                        <InputError message={errors.name} className="ml-4" />
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#004D5C]/50 dark:text-white/30 ml-4">
                            {__('Auth Email')}
                        </label>
                        <div className="relative group">
                            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-[#00B4D8] transition-colors" />
                            <input
                                id="email"
                                type="email"
                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-[24px] pl-14 pr-6 py-4 text-sm font-bold text-[#004D5C] dark:text-white placeholder:text-slate-300 focus:ring-4 focus:ring-[#00B4D8]/10 focus:border-[#00B4D8] transition-all outline-none"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                                placeholder="example@almustech.com"
                            />
                        </div>
                        <InputError message={errors.email} className="ml-4" />
                    </div>
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-3xl flex items-start gap-4 mx-4">
                        <AlertCircle className="h-5 w-5 text-amber-500 mt-1 shrink-0" />
                        <div>
                            <p className="text-sm font-bold text-amber-700 dark:text-amber-400">
                                {__('Profile Unverified')}
                            </p>
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="mt-2 text-xs font-black uppercase tracking-widest text-amber-600 hover:text-amber-500 underline transition-colors"
                            >
                                {__('Profile Resend Email')}
                            </Link>
                            {status === 'verification-link-sent' && (
                                <div className="mt-2 text-xs font-bold text-emerald-500 flex items-center gap-1">
                                    <CheckCircle className="h-4 w-4" />
                                    {__('Profile Verification Sent')}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-6 pt-4 px-4">
                    <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={processing}
                        className="px-10 py-4 bg-gradient-to-r from-[#004D5C] to-[#018296] text-white rounded-[24px] text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-[#004D5C]/20 hover:shadow-[#004D5C]/40 disabled:opacity-50 transition-all flex items-center gap-3"
                    >
                        <Save className="h-4 w-4" />
                        {__('Profile Save Changes')}
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
