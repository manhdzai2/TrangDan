import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { 
    Briefcase, Users, Calendar, CheckCircle, TrendingUp, 
    MoreHorizontal, Eye, ExternalLink, ArrowUpRight
} from 'lucide-react';

export default function Dashboard({ stats, charts, recent_applications }) {
    const PIE_COLORS = ['#006D7E', '#66B2BD', '#99D6E0', '#CCEBF0'];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        }
    };

    return (
        <AdminLayout>
            <Head title="Bảng điều khiển | Lucid Intelligence" />

            <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mb-10"
            >
                <h1 className="text-4xl font-black text-[#004D5C] tracking-tighter mb-2 italic">Tổng quan Quản trị</h1>
                <p className="text-slate-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis uppercase tracking-[0.2em] text-[10px]">Hệ thống Lucid Intelligence • Tiến độ tuyển dụng v1.0</p>
            </motion.div>
            
            {/* KPI Bento Grid */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10"
            >
                {/* KPI 1 */}
                <motion.div variants={itemVariants} className="bg-white p-8 rounded-[32px] shadow-sm border border-white/50 relative overflow-hidden group hover:shadow-2xl hover:shadow-[#006D7E]/10 transition-all duration-500">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-4 bg-[#EEF8F9] rounded-2xl text-[#006D7E]">
                            <Briefcase className="h-6 w-6" />
                        </div>
                        <div className="flex items-center text-emerald-500 text-[10px] font-black bg-emerald-50 px-3 py-1.5 rounded-full uppercase tracking-wider">
                            <TrendingUp className="h-3 w-3 mr-1" /> {stats.trends.openings}
                        </div>
                    </div>
                    <div className="text-4xl font-black text-[#004D5C] mb-2 tracking-tighter italic">{stats.total_openings}</div>
                    <div className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Vị trí đang tuyển</div>
                </motion.div>

                {/* KPI 2 */}
                <motion.div variants={itemVariants} className="bg-white p-8 rounded-[32px] shadow-sm border border-white/50 relative overflow-hidden group hover:shadow-2xl hover:shadow-[#006D7E]/10 transition-all duration-500">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-4 bg-[#FFF7ED] rounded-2xl text-[#C2410C]">
                            <Users className="h-6 w-6" />
                        </div>
                        <div className="flex items-center text-emerald-500 text-[10px] font-black bg-emerald-50 px-3 py-1.5 rounded-full uppercase tracking-wider">
                            <TrendingUp className="h-3 w-3 mr-1" /> {stats.trends.candidates}
                        </div>
                    </div>
                    <div className="text-4xl font-black text-[#004D5C] mb-2 tracking-tighter italic">{stats.total_candidates}</div>
                    <div className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Tổng số ứng viên</div>
                </motion.div>

                {/* KPI 3 */}
                <motion.div variants={itemVariants} className="bg-white p-8 rounded-[32px] shadow-sm border border-white/50 relative overflow-hidden group hover:shadow-2xl hover:shadow-[#006D7E]/10 transition-all duration-500">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600">
                            <Calendar className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="text-4xl font-black text-[#004D5C] mb-2 tracking-tighter italic">{stats.interviews}</div>
                    <div className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Hồ sơ đã xem</div>
                </motion.div>

                {/* KPI 4 - Highlighted Dark Card */}
                <motion.div 
                    variants={itemVariants}
                    className="bg-[#004D5C] p-8 rounded-[32px] shadow-2xl relative overflow-hidden group hover:translate-y-[-4px] transition-all duration-500 hover:shadow-[#004d5c]/40"
                >
                    <motion.div 
                        animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ 
                            duration: 10, 
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute -right-6 -top-6 h-48 w-48 bg-white/10 rounded-full blur-3xl pointer-events-none"
                    />
                    <div className="flex justify-between items-start mb-6 relative z-10">
                        <div className="p-4 bg-white/10 rounded-2xl text-white backdrop-blur-md">
                            <CheckCircle className="h-6 w-6" />
                        </div>
                        <ArrowUpRight className="text-white/30 h-6 w-6" />
                    </div>
                    <div className="text-4xl font-black text-white mb-2 tracking-tighter italic relative z-10">{stats.hired}</div>
                    <div className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] relative z-10">Đã tuyển tháng này</div>
                </motion.div>
            </motion.div>

            {/* Main Dashboard Section */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10"
            >
                {/* Application Activity Chart */}
                <div className="lg:col-span-2 bg-white p-10 rounded-[40px] shadow-sm border border-white/50 flex flex-col">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h3 className="text-2xl font-black text-[#004D5C] tracking-tight italic">Lưu lượng Ứng tuyển</h3>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Phân tích xu hướng lịch sử</p>
                        </div>
                        <div className="flex gap-2">
                             <button className="bg-[#EEF8F9] text-[#006D7E] text-[10px] font-black px-5 py-2.5 rounded-full shadow-inner tracking-widest uppercase">Hàng tuần</button>
                             <button className="text-slate-400 hover:text-slate-600 text-[10px] font-black px-5 py-2.5 rounded-full transition uppercase tracking-widest">Hàng tháng</button>
                        </div>
                    </div>
                    <div className="h-[340px] w-full flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={charts.application_volume}>
                                <defs>
                                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#006D7E" stopOpacity={0.2}/>
                                        <stop offset="95%" stopColor="#006D7E" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="0" vertical={false} stroke="#ECEFF1" />
                                <XAxis 
                                    dataKey="name" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 900}} 
                                    dy={10}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 900}} 
                                />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '16px' }} 
                                    itemStyle={{ color: '#006D7E', fontWeight: 900, textTransform: 'uppercase', fontSize: '10px' }}
                                    cursor={{ stroke: '#006D7E', strokeWidth: 1, strokeDasharray: '4 4' }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="volume" 
                                    stroke="#006D7E" 
                                    strokeWidth={4} 
                                    fillOpacity={1} 
                                    fill="url(#colorVolume)" 
                                    animationDuration={2500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Candidate Sources */}
                <div className="bg-white p-10 rounded-[40px] shadow-sm border border-white/50 flex flex-col">
                    <h3 className="text-2xl font-black text-[#004D5C] tracking-tight mb-1 italic">Vị trí Phổ biến</h3>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-10">Phân bổ hồ sơ theo công việc</p>
                    
                    <div className="h-[260px] w-full relative mb-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={charts.application_sources}
                                    innerRadius={75}
                                    outerRadius={105}
                                    paddingAngle={10}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {charts.application_sources.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} className="hover:opacity-80 transition cursor-pointer" />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                            <div className="text-4xl font-black text-[#004D5C] leading-none tracking-tighter italic">{stats.total_candidates}</div>
                            <div className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] mt-2">Tổng lực</div>
                        </div>
                    </div>

                    <div className="space-y-4 flex-1 overflow-y-auto max-h-[220px] custom-scrollbar pr-2">
                        {charts.application_sources.map((source, i) => (
                            <motion.div 
                                key={source.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex justify-between items-center bg-slate-50/50 p-4 rounded-2xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100"
                            >
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{backgroundColor: PIE_COLORS[i % PIE_COLORS.length]}}></div>
                                    <div className="text-[10px] font-black text-[#004D5C] uppercase tracking-wider truncate">{source.name}</div>
                                </div>
                                <div className="text-[10px] font-black text-slate-400 ml-2">{source.value}%</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Pipeline Table Section */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-[40px] shadow-sm border border-white/50 overflow-hidden mb-12"
            >
                <div className="px-10 py-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/20 backdrop-blur-sm">
                    <div>
                        <h3 className="text-2xl font-black text-[#004D5C] tracking-tight italic">Danh sách Ứng tuyển</h3>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Quản lý các hồ sơ vừa nộp</p>
                    </div>
                    <button className="flex items-center gap-2 text-[10px] font-black text-[#006D7E] bg-white border border-slate-100 px-8 py-4 rounded-full hover:shadow-xl hover:translate-y-[-2px] transition-all shadow-sm uppercase tracking-widest">
                        XEM TOÀN BỘ <ExternalLink className="h-4 w-4" />
                    </button>
                </div>
                <div className="overflow-x-auto px-6 pb-6 pt-2">
                    <table className="w-full text-left border-separate border-spacing-y-3">
                        <thead>
                            <tr className="text-slate-300 text-[10px] font-black uppercase tracking-[0.3em]">
                                <th className="px-6 py-4">Ứng viên</th>
                                <th className="px-6 py-4">Vị trí</th>
                                <th className="px-6 py-4 text-center">Trạng thái</th>
                                <th className="px-6 py-4">Ngày nộp</th>
                                <th className="px-6 py-4 text-right pr-10">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recent_applications.map((app, index) => (
                                <motion.tr 
                                    key={app.id} 
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="hover:bg-[#F3F7F8]/80 transition duration-500 group cursor-default"
                                >
                                    <td className="px-6 py-5 rounded-l-[32px] bg-white group-hover:bg-transparent transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 bg-[#EEF8F9] rounded-2xl flex items-center justify-center text-[#006D7E] font-black group-hover:bg-[#004D5C] group-hover:text-white transition-all duration-500 text-lg shadow-inner border border-[#006D7E]/5">
                                                {app.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-black text-[#004D5C] tracking-tight leading-none mb-1.5 italic transition-colors group-hover:text-[#004D5C]">{app.name}</div>
                                                <div className="text-[9px] text-slate-300 font-black tracking-widest uppercase">TAL-{100 + app.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 bg-white group-hover:bg-transparent transition-colors">
                                        <div className="text-[#004D5C] font-black text-[13px] italic">{app.job}</div>
                                        <div className="text-[9px] text-slate-300 font-black uppercase tracking-widest mt-0.5">Full Time • Remote</div>
                                    </td>
                                    <td className="px-6 py-5 text-center bg-white group-hover:bg-transparent transition-colors">
                                        <span className={`inline-flex px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm ${
                                            app.status === 'Đã tuyển' ? 'bg-emerald-50 text-emerald-600' : 
                                            app.status === 'Chờ duyệt' ? 'bg-amber-50 text-amber-600' : 
                                            app.status === 'Đã xem' ? 'bg-indigo-50 text-indigo-600' : 'bg-rose-50 text-rose-600'
                                        }`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-slate-400 text-[10px] font-black tracking-widest uppercase bg-white group-hover:bg-transparent transition-colors">
                                        {new Date(app.date).toLocaleDateString('vi-VN', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </td>
                                    <td className="px-6 py-5 rounded-r-[32px] text-right pr-10 bg-white group-hover:bg-transparent transition-colors">
                                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                                            <button className="p-3 text-slate-300 hover:text-[#006D7E] hover:bg-[#EEF8F9] rounded-2xl transition-all shadow-sm bg-white border border-slate-50">
                                                <Eye className="h-5 w-5" />
                                            </button>
                                            <button className="p-3 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded-2xl transition-all">
                                                <MoreHorizontal className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </AdminLayout>
    );
}
