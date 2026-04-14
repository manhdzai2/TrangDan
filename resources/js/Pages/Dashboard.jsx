import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar, LabelList
} from 'recharts';
import { 
    Briefcase, Users, Calendar, CheckCircle, TrendingUp, 
    MoreHorizontal, Eye, ExternalLink, ArrowUpRight,
    Activity, Zap, Target, Clock, Filter, BarChart3 as BarChart3Icon
} from 'lucide-react';

export default function Dashboard({ stats, charts, recent_applications }) {
    const [timeScale, setTimeScale] = useState('daily');
    const PIE_COLORS = ['#006D7E', '#66B2BD', '#99D6E0', '#CCEBF0'];

    const getActiveChartData = () => {
        switch(timeScale) {
            case 'monthly': return charts.application_monthly;
            case 'yearly': return charts.application_yearly;
            default: return charts.application_daily;
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 15
            }
        }
    };

    return (
        <AdminLayout>
            <Head title="Bảng điều khiển | Lucid Intelligence" />

            {/* Header Section with Glass Effect */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
            >
                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-8 w-1.5 bg-[#006D7E] rounded-full" />
                        <h1 className="text-5xl font-black text-[#004D5C] dark:text-white transition-colors tracking-tighter italic leading-none">Insight Quản trị</h1>
                    </div>
                    <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] flex items-center gap-2">
                        <Activity className="h-3 w-3 text-[#006D7E]" /> Hệ thống Lucid Intelligence • Phân tích Real-time
                    </p>
                </div>
                
                <div className="flex bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-1.5 rounded-[24px] border border-white/60 dark:border-white/5 shadow-lg shadow-[#006D7E]/5 transition-colors">
                    {['daily', 'monthly', 'yearly'].map((scale) => (
                        <button 
                            key={scale}
                            onClick={() => setTimeScale(scale)}
                            className={`px-6 py-3 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                                timeScale === scale 
                                ? 'bg-[#004D5C] dark:bg-[#006D7E] text-white shadow-xl shadow-[#004D5C]/20 scale-105' 
                                : 'text-slate-400 dark:text-slate-600 hover:bg-white/60 dark:hover:bg-slate-800 hover:text-[#004D5C] dark:hover:text-white'
                            }`}
                        >
                            {scale === 'daily' ? 'Hàng ngày' : scale === 'monthly' ? 'Hàng tháng' : 'Hàng năm'}
                        </button>
                    ))}
                </div>
            </motion.div>
            
            {/* KPI Section with Enhanced Glassmorphism */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
            >
                {/* KPI 1 - Openings */}
                <motion.div variants={itemVariants} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/20 dark:from-slate-800/80 dark:to-slate-900/40 backdrop-blur-3xl rounded-[40px] border border-white/60 dark:border-white/5 shadow-2xl shadow-[#006D7E]/5 transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-[#006D7E]/10" />
                    <div className="relative p-9">
                        <div className="flex justify-between items-start mb-8">
                            <div className="p-4 bg-[#006D7E]/10 rounded-2xl text-[#006D7E] group-hover:bg-[#006D7E] group-hover:text-white transition-colors duration-500">
                                <Briefcase className="h-6 w-6" />
                            </div>
                            <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-[10px] font-black bg-emerald-100/50 dark:bg-emerald-950/30 backdrop-blur-md px-3 py-1.5 rounded-full ring-1 ring-emerald-500/20">
                                <TrendingUp className="h-3 w-3 mr-1" /> {stats.trends.openings}
                            </div>
                        </div>
                        <div className="text-5xl font-black text-[#004D5C] dark:text-white mb-3 tracking-tighter italic leading-none transition-colors">{stats.total_openings}</div>
                        <div className="text-slate-400 dark:text-slate-600 text-[11px] font-black uppercase tracking-widest">Vị trí tuyển dụng</div>
                    </div>
                </motion.div>

                {/* KPI 2 - Candidates */}
                <motion.div variants={itemVariants} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/20 dark:from-slate-800/80 dark:to-slate-900/40 backdrop-blur-3xl rounded-[40px] border border-white/60 dark:border-white/5 shadow-2xl shadow-[#006D7E]/5 transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-[#006D7E]/10" />
                    <div className="relative p-9">
                        <div className="flex justify-between items-start mb-8">
                            <div className="p-4 bg-orange-500/10 rounded-2xl text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-500">
                                <Users className="h-6 w-6" />
                            </div>
                            <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-[10px] font-black bg-emerald-100/50 dark:bg-emerald-950/30 backdrop-blur-md px-3 py-1.5 rounded-full ring-1 ring-emerald-500/20">
                                <TrendingUp className="h-3 w-3 mr-1" /> {stats.trends.candidates}
                            </div>
                        </div>
                        <div className="text-5xl font-black text-[#004D5C] dark:text-white mb-3 tracking-tighter italic leading-none transition-colors">{stats.total_candidates}</div>
                        <div className="text-slate-400 dark:text-slate-600 text-[11px] font-black uppercase tracking-widest">Tổng hồ sơ ứng tuyển</div>
                    </div>
                </motion.div>

                {/* KPI 3 - Response Time (New) */}
                <motion.div variants={itemVariants} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/20 dark:from-slate-800/80 dark:to-slate-900/40 backdrop-blur-3xl rounded-[40px] border border-white/60 dark:border-white/5 shadow-2xl shadow-[#006D7E]/5 transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-[#006D7E]/10" />
                    <div className="relative p-9">
                        <div className="flex justify-between items-start mb-8">
                            <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                                <Clock className="h-6 w-6" />
                            </div>
                        </div>
                        <div className="text-5xl font-black text-[#004D5C] dark:text-white mb-3 tracking-tighter italic leading-none transition-colors">2.4<span className="text-lg font-bold ml-1 italic opacity-50">Ngày</span></div>
                        <div className="text-slate-400 dark:text-slate-600 text-[11px] font-black uppercase tracking-widest">Thời gian phản hồi</div>
                    </div>
                </motion.div>

                {/* KPI 4 - High Contrast Card */}
                <motion.div 
                    variants={itemVariants}
                    className="relative group cursor-pointer"
                >
                    <div className="absolute inset-0 bg-[#004D5C] dark:bg-slate-900 rounded-[40px] shadow-2xl shadow-[#004d5c]/40 dark:shadow-black/60 transition-all duration-500 group-hover:scale-[1.02] group-hover:translate-y-[-4px]" />
                    <motion.div 
                        animate={{ 
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0.6, 0.3],
                            rotate: [0, 90, 0]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute -right-12 -top-12 h-64 w-64 bg-teal-400/20 rounded-full blur-3xl pointer-events-none"
                    />
                    <div className="relative p-9 z-10">
                        <div className="flex justify-between items-start mb-8">
                            <div className="p-4 bg-white/20 dark:bg-white/5 backdrop-blur-xl rounded-2xl text-white border border-white/30 dark:border-white/10">
                                <Zap className="h-6 w-6" />
                            </div>
                            <ArrowUpRight className="text-white/40 h-6 w-6" />
                        </div>
                        <div className="text-5xl font-black text-white mb-3 tracking-tighter italic leading-none transition-colors">{stats.hired}</div>
                        <div className="text-white/60 text-[11px] font-black uppercase tracking-widest">Đã tuyển dụng</div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Middle Section: Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
                {/* Main Dynamic Chart */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="lg:col-span-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl p-10 rounded-[48px] border border-white/80 dark:border-white/5 shadow-2xl shadow-black/5"
                >
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <h3 className="text-3xl font-black text-[#004D5C] dark:text-white tracking-tight italic transition-colors">Biểu đồ Tăng trưởng</h3>
                            <p className="text-slate-400 dark:text-slate-600 text-[10px] font-black uppercase tracking-[0.3em] mt-2 transition-colors">Dữ liệu phân tích {timeScale === 'daily' ? '30 ngày gần nhất' : timeScale === 'monthly' ? '12 tháng qua' : 'toàn thời gian'}</p>
                        </div>
                        <div className="p-4 bg-[#EEF8F9] dark:bg-slate-800 rounded-2xl transition-colors">
                            <BarChart3Icon className="h-6 w-6 text-[#006D7E] dark:text-[#CCEBF0]" />
                        </div>
                    </div>
                    
                    <div className="h-[400px] w-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={timeScale}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.02 }}
                                transition={{ duration: 0.4 }}
                                className="h-full w-full"
                            >
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={getActiveChartData()}>
                                        <defs>
                                            <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#006D7E" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#006D7E" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="0" vertical={false} stroke="currentColor" className="text-slate-100 dark:text-white/5" />
                                        <XAxis 
                                            dataKey="name" 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{fill: 'currentColor', fontSize: 10, fontWeight: 900}} 
                                            className="text-slate-400 dark:text-slate-600"
                                            dy={15}
                                        />
                                        <YAxis 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{fill: 'currentColor', fontSize: 10, fontWeight: 900}} 
                                            className="text-slate-400 dark:text-slate-600"
                                        />
                                        <Tooltip 
                                            contentStyle={{ 
                                                borderRadius: '24px', 
                                                border: 'none', 
                                                boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', 
                                                padding: '20px',
                                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                            }} 
                                            className="dark:[&_.recharts-default-tooltip]:!bg-slate-900/90 dark:[&_.recharts-default-tooltip]:!border-white/10 dark:[&_.recharts-default-tooltip]:backdrop-blur-xl"
                                            itemStyle={{ color: '#006D7E', fontWeight: 900, textTransform: 'uppercase', fontSize: '10px' }}
                                            cursor={{ stroke: '#006D7E', strokeWidth: 1, strokeDasharray: '4 4' }}
                                        />
                                        <Area 
                                            type="monotone" 
                                            dataKey="volume" 
                                            stroke="#006D7E" 
                                            strokeWidth={4} 
                                            fillOpacity={1} 
                                            fill="url(#colorPrimary)" 
                                            animationDuration={1500}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Performance Funnel (Target vs Actual) */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="lg:col-span-4 bg-[#004D5C] dark:bg-slate-900 p-10 rounded-[48px] shadow-2xl text-white relative overflow-hidden transition-colors duration-500"
                >
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <h3 className="text-2xl font-black italic leading-none">Phễu Tuyển dụng</h3>
                                <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.3em] mt-3">Hiệu suất chuyển đổi hồ sơ</p>
                            </div>
                            <Filter className="h-6 w-6 text-white/20" />
                        </div>

                        <div className="flex-1 flex flex-col justify-center space-y-8">
                            {charts.funnel.map((step, i) => (
                                <div key={step.name} className="relative">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{step.name}</span>
                                        <span className="text-xl font-black italic">{step.value}</span>
                                    </div>
                                    <div className="h-3 w-full bg-white/10 dark:bg-white/5 rounded-full overflow-hidden transition-colors">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${(step.value / stats.total_candidates) * 100}%` }}
                                            transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.2 }}
                                            className="h-full bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)] dark:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 p-6 bg-white/5 rounded-[32px] border border-white/10">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 bg-emerald-400 rounded-full flex items-center justify-center text-[#004D5C]">
                                    <Target className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-black text-white/40 uppercase tracking-widest transition-colors">Tỷ lệ thành công</div>
                                    <div className="text-lg font-black italic">{stats.total_candidates > 0 ? round((stats.hired / stats.total_candidates) * 100) : 0}% <span className="text-emerald-400 text-xs font-bold uppercase tracking-tighter ml-1 opacity-80 underline underline-offset-4 decoration-2">Hiring Rate</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Section: Tables & Extra Stats */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-10 mb-12">
                {/* Popular Roles Chart */}
                <div className="xl:col-span-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl p-10 rounded-[48px] border border-white/80 dark:border-white/5 shadow-xl shadow-black/5 transition-colors">
                    <h3 className="text-xl font-black text-[#004D5C] dark:text-white tracking-tight italic mb-1 transition-colors">Nguồn Ứng viên</h3>
                    <p className="text-slate-400 dark:text-slate-600 text-[9px] font-black uppercase tracking-widest mb-10 transition-colors">Phân bổ theo kênh</p>
                    
                    <div className="h-[200px] w-full relative mb-8">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={charts.application_sources}
                                    innerRadius={65}
                                    outerRadius={90}
                                    paddingAngle={8}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {charts.application_sources.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="space-y-4">
                        {charts.application_sources.map((source, i) => (
                            <div key={source.name} className="flex justify-between items-center bg-white/40 dark:bg-slate-800/40 p-3 px-4 rounded-2xl border border-white/60 dark:border-white/5 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full shadow-sm" style={{backgroundColor: PIE_COLORS[i % PIE_COLORS.length]}} />
                                    <span className="text-[9px] font-black text-[#004D5C] dark:text-slate-300 transition-colors uppercase tracking-wider">{source.name}</span>
                                </div>
                                <span className="text-[10px] font-black text-slate-400 dark:text-slate-600">{source.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Detailed Table Section */}
                <div className="xl:col-span-3 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-[48px] border border-white/80 dark:border-white/5 shadow-xl shadow-black/5 overflow-hidden transition-colors">
                    <div className="px-10 py-8 border-b border-white/60 dark:border-white/5 flex justify-between items-center transition-colors">
                        <div>
                            <h3 className="text-2xl font-black text-[#004D5C] dark:text-white transition-colors tracking-tight italic leading-none">Hoạt động Tuyển dụng</h3>
                            <p className="text-slate-400 dark:text-slate-600 text-[10px] font-black uppercase tracking-[0.3em] mt-3 transition-colors">Các hồ sơ vừa nộp trong 24h qua</p>
                        </div>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#006D7E] text-white text-[10px] font-black px-8 py-4 rounded-[20px] shadow-lg shadow-[#006D7E]/20 uppercase tracking-widest"
                        >
                            Tất cả hồ sơ
                        </motion.button>
                    </div>
                    
                    <div className="overflow-x-auto p-6">
                        <table className="w-full text-left border-separate border-spacing-y-4">
                            <thead>
                                <tr className="text-slate-300 dark:text-slate-700 text-[9px] font-black uppercase tracking-[0.4em] transition-colors">
                                    <th className="px-6 pb-2">Họ & Tên</th>
                                    <th className="px-6 pb-2">Vị trí</th>
                                    <th className="px-6 pb-2 text-center">Trạng thái</th>
                                    <th className="px-6 pb-2 text-right">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recent_applications.map((app, index) => (
                                    <motion.tr 
                                        key={app.id} 
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="group"
                                    >
                                        <td className="px-6 py-5 rounded-l-[32px] bg-white dark:bg-slate-800/40 group-hover:bg-[#EEF8F9] dark:group-hover:bg-slate-800 transition-all duration-500 shadow-sm dark:shadow-none border-y border-l border-transparent group-hover:border-white dark:group-hover:border-white/5">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 bg-[#EEF8F9] dark:bg-slate-700 rounded-xl flex items-center justify-center text-[#006D7E] dark:text-[#CCEBF0] font-black group-hover:bg-[#004D5C] group-hover:text-white transition-all duration-500">
                                                    {app.name.charAt(0)}
                                                </div>
                                                <div className="font-black text-[#004D5C] dark:text-white transition-colors italic">{app.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 bg-white dark:bg-slate-800/40 group-hover:bg-[#EEF8F9] dark:group-hover:bg-slate-800 transition-all duration-500 shadow-sm dark:shadow-none border-y border-transparent group-hover:border-white dark:group-hover:border-white/5">
                                            <div className="text-[#004D5C] dark:text-slate-300 transition-colors font-black text-xs uppercase tracking-wider">{app.job}</div>
                                        </td>
                                        <td className="px-6 py-5 text-center bg-white dark:bg-slate-800/40 group-hover:bg-[#EEF8F9] dark:group-hover:bg-slate-800 transition-all duration-500 shadow-sm dark:shadow-none border-y border-transparent group-hover:border-white dark:group-hover:border-white/5">
                                            <span className={`inline-flex px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-colors ${
                                                app.status === 'Đã tuyển' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 
                                                app.status === 'Chờ duyệt' ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400' : 
                                                app.status === 'Đã xem' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
                                            }`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 rounded-r-[32px] text-right bg-white dark:bg-slate-800/40 group-hover:bg-[#EEF8F9] dark:group-hover:bg-slate-800 transition-all duration-500 shadow-sm dark:shadow-none border-y border-r border-transparent group-hover:border-white dark:group-hover:border-white/5">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 text-[#006D7E] dark:text-[#CCEBF0] hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors border border-transparent hover:border-slate-100 dark:hover:border-white/10">
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                                <button className="p-2 text-slate-300 dark:text-slate-700 hover:text-slate-600 dark:hover:text-slate-400 rounded-lg transition-colors">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

const round = (val) => Math.round(val);
