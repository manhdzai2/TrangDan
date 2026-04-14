import AdminLayout from '@/Layouts/AdminLayout';
import { Head, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { User, Key, ShieldAlert } from 'lucide-react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AdminLayout>
            <Head title="Cài đặt tài khoản" />

            <div className="max-w-5xl mx-auto space-y-12 pb-20">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-2"
                >
                    <h1 className="text-4xl font-black text-[#004D5C] dark:text-white uppercase tracking-tighter">
                        Cài đặt <span className="text-[#00B4D8]">Tài khoản</span>
                    </h1>
                    <p className="text-slate-400 font-medium max-w-2xl uppercase text-[10px] tracking-[0.3em]">
                        Quản lý thông tin cá nhân và bảo mật hệ thống của bạn
                    </p>
                </motion.div>

                <div className="grid gap-12">
                    {/* Profile Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="relative group"
                    >
                        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-[#004D5C] rounded-full group-hover:h-20 transition-all duration-500 shadow-lg shadow-[#004D5C]/50"></div>
                        <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/5 p-8 sm:p-12 rounded-[60px] shadow-2xl transition-all duration-500 hover:shadow-[#004D5C]/10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-4 bg-[#004D5C] rounded-3xl text-white shadow-xl">
                                    <User className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-[#004D5C] dark:text-white uppercase tracking-tight">Thông tin hồ sơ</h3>
                                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Cập nhật thông tin cơ bản và email</p>
                                </div>
                            </div>
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                            />
                        </div>
                    </motion.div>

                    {/* Update Password */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative group"
                    >
                         <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-amber-400 rounded-full group-hover:h-20 transition-all duration-500 shadow-lg shadow-amber-400/50"></div>
                        <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/5 p-8 sm:p-12 rounded-[60px] shadow-2xl transition-all duration-500 border-l-amber-400/20">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-4 bg-amber-400 rounded-3xl text-white shadow-xl">
                                    <Key className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-[#004D5C] dark:text-white uppercase tracking-tight">Mật khẩu bảo mật</h3>
                                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Đảm bảo tài khoản của bạn luôn an toàn</p>
                                </div>
                            </div>
                            <UpdatePasswordForm />
                        </div>
                    </motion.div>

                    {/* Delete User */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="relative group"
                    >
                        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-rose-500 rounded-full group-hover:h-20 transition-all duration-500 shadow-lg shadow-rose-500/50"></div>
                        <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/5 p-8 sm:p-12 rounded-[60px] shadow-2xl transition-all duration-500 border-l-rose-500/20">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-4 bg-rose-500 rounded-3xl text-white shadow-xl">
                                    <ShieldAlert className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-[#004D5C] dark:text-white uppercase tracking-tight">Vùng nguy hiểm</h3>
                                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Xóa vĩnh viễn tài khoản của bạn</p>
                                </div>
                            </div>
                            <DeleteUserForm />
                        </div>
                    </motion.div>
                </div>
            </div>
        </AdminLayout>
    );
}
