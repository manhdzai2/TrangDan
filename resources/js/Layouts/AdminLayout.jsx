import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, Briefcase, Users, Settings, 
    FileText, LogOut, User, Bell, Search, Plus, Menu, X as CloseIcon
} from 'lucide-react';

export default function AdminLayout({ children }) {
    const { auth, url } = usePage().props;
    const user = auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-[#F3F7F8] flex font-['Inter'] selection:bg-[#006D7E] selection:text-white overflow-hidden">
            {/* Sidebar */}
            <motion.aside 
                initial={false}
                animate={{ x: isSidebarOpen ? 0 : -288 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#004D5C] text-white w-72 flex-shrink-0 flex flex-col fixed h-full z-50 shadow-2xl"
            >
                <div className="p-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-xl group-hover:bg-white group-hover:text-[#004D5C] transition-all duration-500">
                                <span className="text-xl font-black italic">A</span>
                            </div>
                            <span className="text-xl font-black tracking-tighter group-hover:tracking-normal transition-all duration-500">AMT CAREERS</span>
                        </Link>
                    </motion.div>
                </div>

                <div className="px-6 mb-8 mt-4">
                    <Link href={route('admin.vacancies.index')} className="block">
                        <motion.button 
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-[#006D7E] hover:bg-[#005a68] text-white font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#006D7E]/20 group"
                        >
                            <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-500" />
                            ĐĂNG TIN MỚI
                        </motion.button>
                    </Link>
                </div>

                <nav className="flex-1 px-6 space-y-2 overflow-y-auto custom-scrollbar">
                    <div className="space-y-1">
                        {[
                            { href: route('admin.dashboard'), active: route().current('admin.dashboard'), icon: <LayoutDashboard className="h-5 w-5" />, label: "Bảng điều khiển" },
                            { href: route('admin.vacancies.index'), active: route().current('admin.vacancies.index'), icon: <Briefcase className="h-5 w-5" />, label: "Tin tuyển dụng" },
                            { href: route('admin.applications.index'), active: route().current('admin.applications.index'), icon: <Users className="h-5 w-5" />, label: "Hồ sơ ứng viên" },
                            { href: route('admin.reports.index'), active: route().current('admin.reports.index'), icon: <FileText className="h-5 w-5" />, label: "Báo cáo" },
                            { href: route('admin.profile.index'), active: route().current('admin.profile.index'), icon: <User className="h-5 w-5" />, label: "Hồ sơ cá nhân" }
                        ].map((link, i) => (
                            <motion.div
                                key={link.label}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + (i * 0.1), duration: 0.5 }}
                            >
                                <SidebarLink {...link} />
                            </motion.div>
                        ))}
                    </div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="pt-8 pb-4 text-white/30 text-[10px] font-black uppercase tracking-[0.2em] px-4"
                    >
                        Hệ thống
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <SidebarLink 
                            href={route('admin.settings')} 
                            active={route().current('admin.settings')} 
                            icon={<Settings className="h-5 w-5" />} 
                            label="Cài đặt" 
                        />
                    </motion.div>
                </nav>

                <div className="p-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="bg-white/5 rounded-[24px] p-4 backdrop-blur-sm border border-white/10 shadow-inner"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 bg-[#006D7E] rounded-xl flex items-center justify-center font-bold text-sm shadow-md border border-white/10 overflow-hidden">
                                {user.avatar ? (
                                    <img src={`/storage/${user.avatar}`} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    user.name.charAt(0)
                                )}
                            </div>
                            <div className="overflow-hidden">
                                <div className="text-sm font-black truncate">{user.name}</div>
                                <div className="text-[10px] text-white/50 font-black uppercase tracking-wider">{user.role === 'admin' ? 'Quản trị viên' : 'Nhân sự'}</div>
                            </div>
                        </div>
                        <Link 
                            href={route('logout')} 
                            method="post" 
                            as="button"
                            className="w-full py-2.5 text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white flex items-center gap-2 transition-colors group"
                        >
                            <LogOut className="h-4 w-4 group-hover:translate-x-1 transition-transform" /> Đăng xuất
                        </Link>
                    </motion.div>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-500 ${isSidebarOpen ? 'pl-72' : 'pl-0'}`}>
                {/* Top Bar */}
                <header className="h-20 bg-white/50 backdrop-blur-md sticky top-0 z-40 px-8 flex justify-between items-center border-b border-slate-100">
                    <div className="flex items-center gap-6">
                        <button 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-[#004D5C]"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 group-focus-within:text-[#006D7E] transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Tìm kiếm mọi thứ..." 
                                className="bg-[#F3F7F8] border-none rounded-full pl-12 pr-6 py-2.5 text-[11px] font-black uppercase tracking-wider focus:ring-2 focus:ring-[#006D7E] transition-all w-80 shadow-inner text-[#004D5C] placeholder:text-slate-300"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex gap-2">
                             <IconButton icon={<Bell className="h-5 w-5" />} alert />
                             <Link href={route('admin.profile.index')}>
                                <IconButton icon={<User className="h-5 w-5" />} />
                             </Link>
                        </div>
                        <div className="h-8 w-[1px] bg-slate-100"></div>
                        <div className="text-right">
                            <div className="text-[11px] font-black text-[#004D5C] italic uppercase tracking-tighter">
                                {new Date().toLocaleDateString('vi-VN', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                            <div className="text-[9px] font-black text-slate-300 text-right uppercase tracking-[0.3em] mt-0.5">Hệ thống Trực tuyến</div>
                        </div>
                    </div>
                </header>

                <div className="p-10 relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={url}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}

function SidebarLink({ href, active, icon, label }) {
    return (
        <Link 
            href={href} 
            className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 font-black text-[11px] uppercase tracking-wider relative group ${
                active 
                ? 'bg-white text-[#004D5C] shadow-2xl shadow-black/20 translate-x-1' 
                : 'text-white/40 hover:text-white hover:bg-white/5 hover:translate-x-1'
            }`}
        >
            <span className={`transition-transform duration-500 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>{icon}</span>
            {label}
            {active && (
                <motion.div 
                    layoutId="active-indicator"
                    className="absolute right-3 h-1.5 w-1.5 bg-[#006D7E] rounded-full shadow-lg" 
                />
            )}
        </Link>
    );
}

function IconButton({ icon, alert }) {
    return (
        <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-white rounded-2xl shadow-sm text-slate-400 hover:text-[#006D7E] hover:shadow-xl transition-all relative group border border-slate-100"
        >
            {icon}
            {alert && (
                <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
            )}
        </motion.button>
    );
}
