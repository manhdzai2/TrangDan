import StaffLayout from '@/Layouts/StaffLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { 
    User, Mail, Phone, Lock, Camera, 
    Save, CheckCircle2, ShieldCheck, Trash2,
    Sparkles, KeyRound, XCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Profile() {
    const { auth } = usePage().props;
    const user = auth.user;

    const [activeTab, setActiveTab] = useState('info');

    const { data, setData, post, processing, errors, reset } = useForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        avatar: null,
    });

    const { data: passwordData, setData: setPasswordData, post: postPassword, processing: passwordProcessing, errors: passwordErrors, reset: resetPassword } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updateInfo = (e) => {
        e.preventDefault();
        post(route('staff.profile.update'), { 
            preserveScroll: true,
            onSuccess: () => reset('avatar')
        });
    };

    const updatePassword = (e) => {
        e.preventDefault();
        post(route('staff.profile.password'), {
            preserveScroll: true,
            onSuccess: () => resetPassword()
        });
    };

    const deleteAvatar = () => {
        if(confirm('Xác nhận xóa ảnh đại diện?')) {
            post(route('staff.profile.avatar'), {
                _method: 'delete',
                preserveScroll: true
            });
        }
    };

    return (
        <StaffLayout>
            <Head title="Hồ sơ cá nhân" />

            <div className="max-w-5xl mx-auto pb-20">
                <div className="mb-12">
                    <h1 className="text-4xl font-black text-[#1E293B] tracking-tight mb-2 italic">Tài khoản Nhân viên</h1>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-2">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Bảo mật & Quản lý thông tin định danh
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left: Nav & Avatar */}
                    <div className="lg:w-1/3 space-y-8">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white p-10 rounded-[50px] shadow-sm border border-slate-100 flex flex-col items-center"
                        >
                            <div className="relative group mb-8">
                                <div className="h-40 w-40 bg-indigo-50 rounded-[48px] flex items-center justify-center font-black text-5xl text-indigo-600 shadow-xl border-4 border-white overflow-hidden group-hover:rotate-3 transition-all duration-500">
                                    {user.avatar ? (
                                        <img src={`/storage/${user.avatar}`} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        user.name.charAt(0)
                                    )}
                                </div>
                                <label className="absolute bottom-2 right-2 p-3.5 bg-[#6366F1] text-white rounded-2xl shadow-xl cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-indigo-200">
                                    <Camera className="h-5 w-5" />
                                    <input type="file" className="hidden" onChange={e => setData('avatar', e.target.files[0])} />
                                </label>
                            </div>
                            
                            <h2 className="text-2xl font-black text-[#1E293B] italic mb-1">{user.name}</h2>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-10">NHÂN SỰ AMT</p>

                            <div className="w-full space-y-3">
                                <button 
                                    onClick={() => setActiveTab('info')}
                                    className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'info' ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'bg-white text-slate-400 hover:bg-slate-50'}`}
                                >
                                    <User className="h-4 w-4" /> Hồ sơ cá nhân
                                </button>
                                <button 
                                    onClick={() => setActiveTab('security')}
                                    className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'security' ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'bg-white text-slate-400 hover:bg-slate-50'}`}
                                >
                                    <Lock className="h-4 w-4" /> Bảo mật tài khoản
                                </button>
                                {user.avatar && (
                                    <button 
                                        onClick={deleteAvatar}
                                        className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 transition-all border border-transparent hover:border-rose-100"
                                    >
                                        <Trash2 className="h-4 w-4" /> Xóa ảnh đại diện
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Dynamic Forms */}
                    <div className="lg:w-2/3">
                        {activeTab === 'info' && (
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white p-12 rounded-[50px] shadow-sm border border-slate-100"
                            >
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                                        <Sparkles className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-2xl font-black text-[#1E293B] italic tracking-tight">Cập nhật Thông tin</h3>
                                </div>

                                <form onSubmit={updateInfo} className="space-y-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Họ và tên</label>
                                            <div className="relative">
                                                <User className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                                                <input 
                                                    type="text" 
                                                    value={data.name}
                                                    onChange={e => setData('name', e.target.value)}
                                                    className="w-full bg-slate-50 border-none rounded-[24px] pl-14 pr-8 py-5 text-sm font-black text-[#1E293B] focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-inner placeholder:text-slate-300 italic" 
                                                />
                                            </div>
                                            {errors.name && <p className="text-rose-500 text-[10px] font-bold mt-2 px-3">{errors.name}</p>}
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email liên hệ</label>
                                            <div className="relative">
                                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                                                <input 
                                                    type="email" 
                                                    value={data.email}
                                                    onChange={e => setData('email', e.target.value)}
                                                    className="w-full bg-slate-50 border-none rounded-[24px] pl-14 pr-8 py-5 text-sm font-black text-[#1E293B] focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-inner placeholder:text-slate-300 italic" 
                                                />
                                            </div>
                                            {errors.email && <p className="text-rose-500 text-[10px] font-bold mt-2 px-3">{errors.email}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-3 max-w-md">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Số điện thoại</label>
                                        <div className="relative">
                                            <Phone className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                                            <input 
                                                type="text" 
                                                value={data.phone}
                                                onChange={e => setData('phone', e.target.value)}
                                                placeholder="+84 ..."
                                                className="w-full bg-slate-50 border-none rounded-[24px] pl-14 pr-8 py-5 text-sm font-black text-[#1E293B] focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-inner placeholder:text-slate-300 italic" 
                                            />
                                        </div>
                                    </div>

                                    {data.avatar && (
                                        <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 bg-white rounded-2xl p-1 shadow-sm overflow-hidden">
                                                    <img src={URL.createObjectURL(data.avatar)} className="w-full h-full object-cover rounded-xl" />
                                                </div>
                                                <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Sẵn sàng tải lên: {data.avatar.name}</span>
                                            </div>
                                            <button type="button" onClick={() => setData('avatar', null)} className="text-emerald-700 hover:text-rose-500 transition-colors">
                                                <XCircle className="h-5 w-5" />
                                            </button>
                                        </div>
                                    )}

                                    <motion.button 
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        disabled={processing}
                                        type="submit"
                                        className="bg-[#6366F1] text-white font-black py-5 px-14 rounded-2xl flex items-center gap-3 shadow-2xl shadow-indigo-100 transition-all uppercase tracking-widest text-[11px]"
                                    >
                                        <Save className="h-5 w-5" />
                                        LƯU THAY ĐỔI
                                    </motion.button>
                                </form>
                            </motion.div>
                        )}

                        {activeTab === 'security' && (
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white p-12 rounded-[50px] shadow-sm border border-slate-100"
                            >
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="h-10 w-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500">
                                        <KeyRound className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-2xl font-black text-[#1E293B] italic tracking-tight">Đổi mật khẩu</h3>
                                </div>

                                <form onSubmit={updatePassword} className="space-y-10">
                                    <div className="space-y-4 max-w-md">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mật khẩu hiện tại</label>
                                        <input 
                                            type="password" 
                                            value={passwordData.current_password}
                                            onChange={e => setPasswordData('current_password', e.target.value)}
                                            className="w-full bg-slate-50 border-none rounded-[24px] px-8 py-5 text-sm font-black text-[#1E293B] focus:ring-4 focus:ring-rose-500/10 transition-all shadow-inner" 
                                        />
                                        {passwordErrors.current_password && <p className="text-rose-500 text-[10px] font-bold px-3">{passwordErrors.current_password}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mật khẩu mới</label>
                                            <input 
                                                type="password" 
                                                value={passwordData.password}
                                                onChange={e => setPasswordData('password', e.target.value)}
                                                className="w-full bg-slate-50 border-none rounded-[24px] px-8 py-5 text-sm font-black text-[#1E293B] focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-inner" 
                                            />
                                            {passwordErrors.password && <p className="text-rose-500 text-[10px] font-bold px-3">{passwordErrors.password}</p>}
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Xác nhận mật khẩu</label>
                                            <input 
                                                type="password" 
                                                value={passwordData.password_confirmation}
                                                onChange={e => setPasswordData('password_confirmation', e.target.value)}
                                                className="w-full bg-slate-50 border-none rounded-[24px] px-8 py-5 text-sm font-black text-[#1E293B] focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-inner" 
                                            />
                                        </div>
                                    </div>

                                    <motion.button 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        disabled={passwordProcessing}
                                        type="submit"
                                        className="bg-[#1E293B] text-white font-black py-5 px-14 rounded-2xl flex items-center gap-3 shadow-2xl shadow-slate-200 transition-all uppercase tracking-widest text-[11px]"
                                    >
                                        <Lock className="h-5 w-5" />
                                        CẬP NHẬT MẬT KHẨU
                                    </motion.button>
                                </form>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </StaffLayout>
    );
}
