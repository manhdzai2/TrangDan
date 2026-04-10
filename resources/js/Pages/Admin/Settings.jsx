import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { 
    Settings, Shield, Bell, User, 
    Globe, Save, Mail, Building, Sparkles, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsPage() {
    const { data, setData, post, processing, wasSuccessful } = useForm({
        company_name: 'AMT SOLUTIONS',
        admin_email: 'admin@amt.com',
        notifications: true,
        two_factor: true,
        maintenance_mode: false,
    });

    const submit = (e) => {
        e.preventDefault();
        // Since there's no route defined in the mock form for post, we'll just simulate success for UI demo
        // but it's better to use Inertia if the route exists.
        // For now, keeping it as is but wrapping with motion.
    };

    return (
        <AdminLayout>
            <Head title="Cài đặt hệ thống | AMT" />
            
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center mb-10"
            >
                <div>
                    <h1 className="text-4xl font-black text-[#004D5C] tracking-tighter mb-2 italic">Cấu hình Hệ thống</h1>
                    <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Tùy chỉnh trải nghiệm và bảo mật Lucid Intelligence</p>
                </div>
                <AnimatePresence>
                    {wasSuccessful && (
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="bg-emerald-50 text-emerald-600 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] border border-emerald-100 flex items-center gap-2 shadow-lg shadow-emerald-500/5"
                        >
                            <Sparkles className="h-4 w-4" /> ĐÃ LƯU THAY ĐỔI
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10">
                    {/* General Settings */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-12 rounded-[50px] shadow-sm border border-white/50 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#EEF8F9] rounded-full translate-x-1/2 -translate-y-1/2 opacity-20 blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
                        
                        <h3 className="text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase mb-10 flex items-center gap-3">
                            <Building className="h-4 w-4 text-[#006D7E]" /> Thông tin doanh nghiệp
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-[#004D5C] uppercase tracking-[0.2em] block ml-2">Tên công ty</label>
                                <input 
                                    type="text" 
                                    value={data.company_name}
                                    onChange={e => setData('company_name', e.target.value)}
                                    className="w-full bg-[#F3F7F8] border-none rounded-[24px] p-6 text-sm font-black text-[#004D5C] focus:ring-4 focus:ring-[#006D7E]/10 transition-all shadow-inner italic"
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-[#004D5C] uppercase tracking-[0.2em] block ml-2">Email quản trị</label>
                                <input 
                                    type="email" 
                                    value={data.admin_email}
                                    onChange={e => setData('admin_email', e.target.value)}
                                    className="w-full bg-[#F3F7F8] border-none rounded-[24px] p-6 text-sm font-black text-[#004D5C] focus:ring-4 focus:ring-[#006D7E]/10 transition-all shadow-inner italic"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Notification Settings */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-12 rounded-[50px] shadow-sm border border-white/50 relative overflow-hidden group"
                    >
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#006D7E]/5 rounded-full -translate-x-1/2 translate-y-1/2 opacity-20 blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
                        
                        <h3 className="text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase mb-10 flex items-center gap-3">
                            <Bell className="h-4 w-4 text-[#006D7E]" /> Tùy chọn thông báo & Bảo mật
                        </h3>
                        
                        <div className="space-y-4 relative z-10">
                            <ToggleItem 
                                icon={<Mail className="h-6 w-6" />}
                                title="Thông báo email"
                                description="Nhận email khi có ứng viên mới nộp hồ sơ."
                                enabled={data.notifications}
                                setEnabled={v => setData('notifications', v)}
                            />
                            <div className="h-px bg-slate-50 w-full ml-20"></div>
                            <ToggleItem 
                                icon={<Shield className="h-6 w-6" />}
                                title="Xác thực 2 lớp (2FA)"
                                description="Bảo mật tối đa cho tài khoản quản trị viên."
                                enabled={data.two_factor}
                                setEnabled={v => setData('two_factor', v)}
                            />
                        </div>
                    </motion.div>
                </div>

                <div className="lg:col-span-1">
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="sticky top-32"
                    >
                        <div className="bg-[#004D5C] p-12 rounded-[50px] shadow-2xl relative overflow-hidden text-white group">
                            <motion.div 
                                animate={{ 
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 90, 0]
                                }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"
                            ></motion.div>
                            
                            <h2 className="text-3xl font-black italic mb-6 tracking-tighter">Lưu cấu hình</h2>
                            <p className="text-white/50 text-xs font-black uppercase tracking-widest mb-10 leading-relaxed">
                                Mọi thay đổi sẽ được áp dụng ngay lập tức cho toàn hệ thống nhân sự AMT.
                            </p>
                            
                            <motion.button 
                                type="submit"
                                whileHover={{ scale: 1.02, y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={processing}
                                className="w-full bg-white text-[#004D5C] py-6 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-[11px]"
                            >
                                {processing ? (
                                    <div className="h-5 w-5 border-2 border-[#004D5C]/30 border-t-[#004D5C] rounded-full animate-spin"></div>
                                ) : (
                                    <Check className="h-5 w-5" />
                                )}
                                CẬP NHẬT NGAY
                            </motion.button>

                            <div className="mt-12 pt-8 border-t border-white/10">
                                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">Lần cập nhật cuối</div>
                                <div className="text-xs font-black italic text-white/80">Hôm nay, 14:30 bởi Admin</div>
                            </div>
                        </div>

                        <motion.div 
                            whileHover={{ y: -5 }}
                            className="mt-10 p-10 bg-[#EEF8F9] rounded-[40px] border border-[#006D7E]/10 flex items-center justify-between"
                        >
                            <div>
                                <div className="flex items-center gap-4 mb-2">
                                    <Globe className="h-4 w-4 text-[#006D7E]" />
                                    <span className="text-[9px] font-black text-[#006D7E] uppercase tracking-widest">Ngôn ngữ mặc định</span>
                                </div>
                                <div className="text-xl font-black text-[#004D5C] italic uppercase tracking-tighter">Tiếng Việt (VN)</div>
                            </div>
                            <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-slate-300">
                                <span className="font-black text-xs">VN</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </form>
        </AdminLayout>
    );
}

function ToggleItem({ icon, title, description, enabled, setEnabled }) {
    return (
        <div className="flex items-center justify-between gap-6 p-6 hover:bg-[#F3F7F8]/80 rounded-[32px] transition duration-500 group">
            <div className="flex items-center gap-6">
                <div className="h-14 w-14 bg-[#EEF8F9] rounded-[20px] flex items-center justify-center text-[#006D7E] group-hover:bg-[#004D5C] group-hover:text-white transition-all duration-500 shadow-inner group-hover:rotate-6">
                    {icon}
                </div>
                <div>
                    <h4 className="font-black text-[#004D5C] italic tracking-tight mb-1">{title}</h4>
                    <p className="text-[10px] font-black text-slate-400 italic uppercase tracking-widest leading-none">{description}</p>
                </div>
            </div>
            <motion.button 
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={() => setEnabled(!enabled)}
                className={`w-16 h-8 rounded-full relative transition-colors duration-500 ${enabled ? 'bg-[#006D7E]' : 'bg-slate-200'}`}
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
