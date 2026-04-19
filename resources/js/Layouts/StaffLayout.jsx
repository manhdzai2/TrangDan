import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, Briefcase, Users, User, 
    LogOut, Bell, Search, Plus, Menu, X as CloseIcon,
    ChevronRight, Sparkles
} from 'lucide-react';

export default function StaffLayout({ children }) {
    const { auth, url } = usePage().props;
    const user = auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const navigation = [
        { name: 'Tổng quan', href: route('staff.dashboard'), icon: LayoutDashboard, current: route().current('staff.dashboard') },
        { name: 'Việc làm của tôi', href: route('staff.jobs.index'), icon: Briefcase, current: route().current('staff.jobs.index') || route().current('staff.jobs.*') },
        { name: 'Ứng viên', href: route('staff.applications.index'), icon: Users, current: route().current('staff.applications.index') || route().current('staff.applications.show') },
        { name: 'Tài khoản', href: route('staff.profile.index'), icon: User, current: route().current('staff.profile.index') },
    ];

    return (
        <div className="min-h-screen bg-[#F0F4F8] flex font-['Inter'] selection:bg-[#6366F1] selection:text-white overflow-hidden">
            {/* Sidebar */}
            <motion.aside 
                initial={false}
                animate={{ x: isSidebarOpen ? 0 : -280 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white w-[280px] flex-shrink-0 flex flex-col fixed h-full z-50 border-r border-slate-200 shadow-xl"
            >
                <div className="p-8">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="h-10 w-10 bg-[#6366F1] rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:rotate-12 transition-transform duration-500">
                            <Sparkles className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-[#1E293B]">ALMUS TECH <span className="text-[#6366F1]">STAFF</span></span>
                    </Link>
                </div>

                <div className="px-6 mb-8">
                    <Link href={route('staff.jobs.create')}>
                        <motion.button 
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-100 group"
                        >
                            <Plus className="h-5 w-5" />
                            ĐĂNG TIN MỚI
                        </motion.button>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
                    {navigation.map((item) => (
                        <Link 
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 font-bold text-[13px] relative group ${
                                item.current 
                                ? 'bg-indigo-50 text-[#4338CA] shadow-sm' 
                                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            <item.icon className={`h-5 w-5 ${item.current ? 'text-[#4338CA]' : 'text-slate-400 group-hover:text-slate-600'}`} />
                            {item.name}
                            {item.current && (
                                <motion.div 
                                    layoutId="staff-active-nav"
                                    className="absolute right-3 h-1.5 w-1.5 bg-[#4338CA] rounded-full" 
                                />
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="p-6 mt-auto">
                    <div className="bg-slate-50 rounded-3xl p-4 border border-slate-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center overflow-hidden">
                                {user.avatar ? (
                                    <img src={`/storage/${user.avatar}`} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="font-bold text-indigo-600">{user.name.charAt(0)}</span>
                                )}
                            </div>
                            <div className="overflow-hidden">
                                <div className="text-sm font-bold text-slate-800 truncate">{user.name}</div>
                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Nhân sự ALMUS TECH</div>
                            </div>
                        </div>
                        <Link 
                            href={route('logout')} 
                            method="post" 
                            as="button"
                            className="w-full py-2.5 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-rose-500 flex items-center gap-2 transition-colors border-t border-slate-100 mt-2"
                        >
                            <LogOut className="h-4 w-4" /> Đăng xuất
                        </Link>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-500 ${isSidebarOpen ? 'pl-[280px]' : 'pl-0'}`}>
                {/* Top Bar */}
                <header className="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-40 px-8 flex justify-between items-center border-b border-slate-100">
                    <div className="flex items-center gap-6">
                        <button 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors text-slate-400"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                        <div className="hidden md:flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                            <span className="h-2 w-2 bg-emerald-500 rounded-full"></span>
                            Portal Nhân Sự Trực Tuyến
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="relative group hidden sm:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                            <input 
                                type="text" 
                                placeholder="Tìm kiếm ứng viên..." 
                                className="bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-2.5 text-xs font-medium focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all w-64 shadow-inner placeholder:text-slate-300"
                            />
                        </div>
                        <button className="p-3 bg-white border border-slate-100 rounded-2xl shadow-sm text-slate-400 hover:text-indigo-600 transition-all relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-3 right-3 h-2 w-2 bg-rose-500 rounded-full border-2 border-white"></span>
                        </button>
                    </div>
                </header>

                <div className="p-10 relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={url}
                            initial={{ opacity: 0, scale: 0.98, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: -10 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
