import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Trash2, X, Lock } from 'lucide-react';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-rose-500/5 border border-rose-500/10 rounded-[32px]">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-rose-500/10 rounded-2xl text-rose-500">
                        <Trash2 className="h-5 w-5" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500/70 max-w-xs leading-relaxed">
                        Hành động này không thể hoàn tác. Một khi bạn xóa tài khoản, mọi dữ liệu sẽ biến mất vĩnh viễn.
                    </p>
                </div>
                
                <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={confirmUserDeletion}
                    className="px-8 py-3.5 bg-rose-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-500/20 hover:shadow-rose-500/40 transition-all flex items-center gap-2"
                >
                    <Trash2 className="h-4 w-4" />
                    Xóa tài khoản
                </motion.button>
            </div>

            <Modal show={confirmingUserDeletion} onClose={closeModal} maxWidth="md">
                <div className="bg-white dark:bg-[#0F172A] p-8 sm:p-12 rounded-[40px] border border-slate-100 dark:border-white/5 shadow-2xl relative overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-rose-500/10 blur-[100px] rounded-full"></div>
                    
                    <form onSubmit={deleteUser} className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-rose-500/10 rounded-3xl text-rose-500">
                                    <ShieldAlert className="h-8 w-8" />
                                </div>
                                <h2 className="text-2xl font-black text-[#004D5C] dark:text-white uppercase tracking-tight">Xác nhận xóa</h2>
                            </div>
                            <button 
                                type="button"
                                onClick={closeModal}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors text-slate-400"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <p className="text-slate-500 dark:text-slate-400 font-medium mb-10 leading-loose">
                            Hệ thống yêu cầu bạn nhập mật khẩu để xác nhận rằng bạn thực sự muốn xóa vĩnh viễn tài khoản của mình. 
                            <span className="block mt-2 font-black text-rose-500 uppercase text-[10px] tracking-widest leading-none">Cảnh báo: Dữ liệu sẽ không thể khôi phục.</span>
                        </p>

                        <div className="space-y-2 mb-10">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#004D5C]/50 dark:text-white/30 ml-4">
                                Nhập mật khẩu xác thực
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-rose-500 transition-colors" />
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-[28px] pl-14 pr-6 py-5 text-sm font-bold text-[#004D5C] dark:text-white placeholder:text-slate-300 focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all outline-none"
                                    placeholder="••••••••"
                                    autoFocus
                                />
                            </div>
                            <InputError message={errors.password} className="ml-4" />
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100 dark:border-white/5">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="px-8 py-4 bg-slate-100 dark:bg-white/5 text-[#004D5C] dark:text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                            >
                                Hủy bỏ
                            </button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={processing}
                                className="px-10 py-4 bg-rose-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-rose-500/20 hover:shadow-rose-500/40 disabled:opacity-50 transition-all flex items-center gap-2"
                            >
                                <Trash2 className="h-4 w-4" />
                                Xác nhận xóa vĩnh viễn
                            </motion.button>
                        </div>
                    </form>
                </div>
            </Modal>
        </section>
    );
}
