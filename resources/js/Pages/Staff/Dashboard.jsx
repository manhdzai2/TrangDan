import StaffLayout from '@/Layouts/StaffLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { 
    Briefcase, Users, UserCheck, Clock, 
    TrendingUp, ArrowUpRight, Calendar,
    MessageSquare, ChevronRight, Plus
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard({ stats, recentApplications }) {
    const { auth } = usePage().props;
    const cards = [
        { name: 'Tổng số việc làm', value: stats.total_jobs, icon: Briefcase, color: 'bg-indigo-500', trend: '+2' },
        { name: 'Tổng số ứng viên', value: stats.total_applications, icon: Users, color: 'bg-emerald-500', trend: '+12%' },
        { name: 'Đang chờ xử lý', value: stats.pending_applications, icon: Clock, color: 'bg-amber-500', trend: 'Ưu tiên' },
        { name: 'Đã tiếp nhận', value: stats.accepted_applications, icon: UserCheck, color: 'bg-blue-500', trend: '+5' },
    ];

    return (
        <StaffLayout>
            <Head title="Staff Dashboard" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-3xl font-black text-[#1E293B] tracking-tight mb-2">Xin chào, {auth.user.name.split(' ')[0]}!</h1>
                    <p className="text-slate-500 font-medium">Hôm nay là {new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' })}. Bạn có {stats.pending_applications} hồ sơ mới cần xem xét.</p>
                </div>
                <Link href={route('staff.jobs.create')}>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-slate-700 font-bold py-3.5 px-8 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3 hover:bg-slate-50 transition-all"
                    >
                        <Plus className="h-5 w-5 text-indigo-600" />
                        Tạo Job Mới
                    </motion.button>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {cards.map((card, i) => (
                    <motion.div 
                        key={card.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-500"
                    >
                        <div className={`absolute top-0 right-0 w-24 h-24 ${card.color} opacity-[0.03] rounded-bl-[60px] group-hover:scale-110 transition-transform duration-700`}></div>
                        <div className="flex items-start justify-between relative z-10">
                            <div className={`${card.color} p-3.5 rounded-2xl shadow-lg shadow-current opacity-20`}></div>
                            <div className={`absolute left-0 top-0 m-6 ${card.color} p-3.5 rounded-2xl text-white shadow-xl shadow-current/10`}>
                                <card.icon className="h-6 w-6" />
                            </div>
                            <span className="text-[10px] font-black tracking-widest text-slate-300 uppercase bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">{card.trend}</span>
                        </div>
                        <div className="mt-8 relative z-10">
                            <div className="text-3xl font-black text-[#1E293B] italic mb-1">{card.value}</div>
                            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{card.name}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Recent Applications */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between px-4">
                        <h3 className="text-xl font-black text-[#1E293B] italic flex items-center gap-3">
                            <TrendingUp className="h-5 w-5 text-indigo-500" /> Ứng tuyển Gần đây
                        </h3>
                        <Link href={route('staff.applications.index')} className="text-xs font-bold text-indigo-600 hover:indigo-700 flex items-center gap-1 group">
                            Xem tất cả <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-4 space-y-2">
                            {recentApplications.map((app, i) => (
                                <Link 
                                    key={app.id} 
                                    href={route('staff.applications.show', app.id)}
                                    className="flex items-center justify-between p-5 hover:bg-slate-50 rounded-3xl transition-all group"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className="h-14 w-14 bg-indigo-50 rounded-[20px] flex items-center justify-center font-black text-indigo-600 shadow-sm border border-indigo-100/50 group-hover:scale-105 transition-transform">
                                            {app.candidate.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">{app.candidate.name}</div>
                                            <div className="text-xs text-slate-400 font-medium">Apply cho: <span className="text-slate-600 font-bold">{app.vacancy.title}</span></div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-3 text-right">
                                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm ${
                                            app.status === 'pending' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                            app.status === 'accepted' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                            'bg-rose-50 text-rose-600 border border-rose-100'
                                        }`}>
                                            {app.status === 'pending' ? 'Chờ duyệt' : app.status}
                                        </span>
                                        <div className="text-[10px] text-slate-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                                            <Clock className="h-3 w-3" /> {new Date(app.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                            {recentApplications.length === 0 && (
                                <div className="p-12 text-center">
                                    <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                                        <MessageSquare className="h-8 w-8 text-slate-200" />
                                    </div>
                                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Chưa có hồ sơ ứng tuyển nào</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar Widget */}
                <div className="space-y-8">
                    <div className="bg-[#1E293B] p-10 rounded-[45px] shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
                        <div className="relative z-10">
                            <h4 className="text-white font-black italic text-2xl mb-2 tracking-tight">Kế hoạch Tuyển dụng</h4>
                            <p className="text-white/40 text-xs font-medium mb-8">Nâng cao hiệu suất tìm kiếm nhân tài với AI.</p>
                            
                            <div className="space-y-4 mb-10">
                                <div className="flex items-center justify-between text-white text-xs">
                                    <span className="font-bold opacity-60">Tháng này: 5 vị trí</span>
                                    <span className="font-black">60%</span>
                                </div>
                                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: '60%' }}
                                        transition={{ delay: 0.5, duration: 1 }}
                                        className="h-full bg-indigo-500" 
                                    />
                                </div>
                            </div>
                            
                            <motion.button 
                                whileHover={{ x: 5 }}
                                className="flex items-center gap-2 text-indigo-400 font-black uppercase tracking-widest text-[10px] group"
                            >
                                Xem báo cáo chi tiết <ArrowUpRight className="h-4 w-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                        <h4 className="text-slate-800 font-black italic text-lg mb-6 flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-[#6366F1]" /> Lịch trình
                        </h4>
                        <div className="space-y-4">
                            {[
                                { t: 'Phỏng vấn Frontend', d: 'Ngày mai, 10:00', c: 'border-indigo-500' },
                                { t: 'Gửi Offer PHP Dev', d: 'Thứ 4, 14:30', c: 'border-emerald-500' },
                            ].map((item, i) => (
                                <div key={i} className={`p-4 bg-slate-50 rounded-2xl border-l-4 ${item.c}`}>
                                    <div className="text-sm font-bold text-slate-700">{item.t}</div>
                                    <div className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-widest">{item.d}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </StaffLayout>
    );
}
