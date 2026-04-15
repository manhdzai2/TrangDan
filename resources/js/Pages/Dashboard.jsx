import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    PieChart, Pie, Cell, AreaChart, Area,
} from 'recharts';
import { 
    Briefcase, Users, CheckCircle, TrendingUp, 
    Eye, Activity, Zap, Target, Clock, 
    BarChart3 as BarChart3Icon, Award, ShieldCheck
} from 'lucide-react';
import { useTranslation } from '@/Hooks/useTranslation';

export default function Dashboard({ stats, charts, recent_applications }) {
    const { __ } = useTranslation();
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
            transition: { staggerChildren: 0.08, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { 
            opacity: 1, y: 0, scale: 1,
            transition: { type: "spring", stiffness: 80, damping: 15 }
        }
    };

    return (
        <AdminLayout>
            <Head title={`${__('Admin Dashboard')} | Almus Tech`} />

            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
            >
                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-8 w-1.5 bg-[#006D7E] rounded-full" />
                        <h1 className="text-5xl font-black text-[#004D5C] dark:text-white transition-colors tracking-tighter italic leading-none uppercase">{__('Dash Title')}</h1>
                    </div>
                    <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] flex items-center gap-2">
                        <Activity className="h-3 w-3 text-[#006D7E]" /> {__('Dash Sub')}
                    </p>
                </div>
                
                <div className="flex bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-1.5 rounded-[24px] border border-white/60 dark:border-white/5 shadow-lg transition-colors">
                    {['daily', 'monthly', 'yearly'].map((scale) => (
                        <button 
                            key={scale}
                            onClick={() => setTimeScale(scale)}
                            className={`px-6 py-3 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                                timeScale === scale 
                                ? 'bg-[#004D5C] dark:bg-[#006D7E] text-white shadow-xl scale-105' 
                                : 'text-slate-400 dark:text-slate-600 hover:text-[#004D5C] dark:hover:text-white'
                            }`}
                        >
                            {scale === 'daily' ? __('Dash Daily') : scale === 'monthly' ? __('Dash Monthly') : __('Dash Yearly')}
                        </button>
                    ))}
                </div>
            </motion.div>
            
            {/* KPI Section */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
            >
                <KPICard 
                    icon={<Briefcase />} 
                    title={__('Dash Openings')} 
                    value={stats.total_openings} 
                    trend={stats.trends.openings}
                    color="cyan"
                />
                <KPICard 
                    icon={<Users />} 
                    title={__('Dash Total Apps')} 
                    value={stats.total_candidates} 
                    trend={stats.trends.candidates}
                    color="orange"
                />
                <KPICard 
                    icon={<Award />} 
                    title={__('Yield Rate')} 
                    value={`${stats.yield_rate}%`} 
                    trend="+0.4%"
                    color="emerald"
                />
                <KPICard 
                    icon={<ShieldCheck />} 
                    title={__('Defect Types')} 
                    value={stats.defect_types} 
                    trend="Stable"
                    color="rose"
                    dark
                />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
                {/* Growth Chart */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="lg:col-span-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl p-10 rounded-[48px] border border-white/80 dark:border-white/5 shadow-2xl"
                >
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <h3 className="text-3xl font-black text-[#004D5C] dark:text-white tracking-tight italic">{__('Dash Growth Chart')}</h3>
                            <p className="text-slate-400 dark:text-slate-600 text-[10px] font-black uppercase tracking-[0.3em] mt-2">{__('Dash Data Analysis')}</p>
                        </div>
                        <div className="p-4 bg-[#EEF8F9] dark:bg-slate-800 rounded-2xl">
                            <BarChart3Icon className="h-6 w-6 text-[#006D7E] dark:text-[#CCEBF0]" />
                        </div>
                    </div>
                    
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={getActiveChartData()}>
                                <defs>
                                    <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#006D7E" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#006D7E" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="0" vertical={false} stroke="currentColor" className="text-slate-100 dark:text-white/5" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'currentColor', fontSize: 10, fontWeight: 900}} className="text-slate-400 dark:text-slate-600" dy={15}/>
                                <YAxis axisLine={false} tickLine={false} tick={{fill: 'currentColor', fontSize: 10, fontWeight: 900}} className="text-slate-400 dark:text-slate-600"/>
                                <Tooltip 
                                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.9)' }} 
                                    itemStyle={{ color: '#006D7E', fontWeight: 900, textTransform: 'uppercase', fontSize: '10px' }}
                                />
                                <Area type="monotone" dataKey="volume" stroke="#006D7E" strokeWidth={4} fillOpacity={1} fill="url(#colorPrimary)" animationDuration={1500}/>
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Operations Funnel */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="lg:col-span-4 bg-[#004D5C] dark:bg-slate-900 p-10 rounded-[48px] shadow-2xl text-white relative overflow-hidden"
                >
                    <div className="relative z-10 flex flex-col h-full">
                        <h3 className="text-2xl font-black italic mb-10">{__('Operations Funnel')}</h3>
                        <div className="flex-1 space-y-8">
                            {charts.funnel.map((step, i) => (
                                <div key={step.name}>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{__(step.name)}</span>
                                        <span className="text-xl font-black italic">{step.value}</span>
                                    </div>
                                    <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${(step.value / (stats.total_candidates || 1)) * 100}%` }}
                                            transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.2 }}
                                            className="h-full bg-white rounded-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-10 p-6 bg-white/5 rounded-[32px] border border-white/10">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 bg-emerald-400 rounded-full flex items-center justify-center text-[#004D5C]"><Target className="h-5 w-5" /></div>
                                <div>
                                    <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">{__('Success Rate')}</div>
                                    <div className="text-lg font-black italic">{stats.total_candidates > 0 ? Math.round((stats.hired / stats.total_candidates) * 100) : 0}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Tables */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
                <div className="xl:col-span-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl p-10 rounded-[48px] border border-white/80 dark:border-white/5 shadow-xl">
                    <h3 className="text-xl font-black text-[#004D5C] dark:text-white italic mb-10">{__('Application Sources')}</h3>
                    <div className="h-[200px] mb-8">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={charts.application_sources} innerRadius={65} outerRadius={90} paddingAngle={8} dataKey="value" stroke="none">
                                    {charts.application_sources.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-4">
                        {charts.application_sources.map((source, i) => (
                            <div key={source.name} className="flex justify-between items-center bg-white/40 dark:bg-slate-800/40 p-3 px-4 rounded-2xl border border-white/60 dark:border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full" style={{backgroundColor: PIE_COLORS[i % PIE_COLORS.length]}} />
                                    <span className="text-[9px] font-black text-[#004D5C] dark:text-slate-300 uppercase tracking-wider">{source.name}</span>
                                </div>
                                <span className="text-[10px] font-black text-slate-400">{source.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="xl:col-span-3 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-[48px] border border-white/80 dark:border-white/5 shadow-xl overflow-hidden">
                    <div className="px-10 py-8 border-b border-white/60 dark:border-white/5 flex justify-between items-center">
                        <h3 className="text-2xl font-black text-[#004D5C] dark:text-white italic">{__('Recent Applications')}</h3>
                        <Link href={route('admin.applications.index')} className="bg-[#006D7E] text-white text-[10px] font-black px-8 py-4 rounded-[20px] shadow-lg uppercase tracking-widest">
                            {__('View All')}
                        </Link>
                    </div>
                    <div className="p-6 overflow-x-auto">
                        <table className="w-full text-left border-separate border-spacing-y-4">
                            <thead>
                                <tr className="text-slate-300 dark:text-slate-700 text-[9px] font-black uppercase tracking-[0.4em]">
                                    <th className="px-6 pb-2">{__('Candidate')}</th>
                                    <th className="px-6 pb-2">{__('Position')}</th>
                                    <th className="px-6 pb-2 text-center">{__('Status')}</th>
                                    <th className="px-6 pb-2 text-right">{__('Action')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recent_applications.map((app, i) => (
                                    <tr key={app.id} className="group">
                                        <td className="px-6 py-5 rounded-l-[32px] bg-white dark:bg-slate-800/40 group-hover:bg-[#EEF8F9] dark:group-hover:bg-slate-800 transition-all font-black italic text-[#004D5C] dark:text-white">
                                            {app.name}
                                        </td>
                                        <td className="px-6 py-5 bg-white dark:bg-slate-800/40 group-hover:bg-[#EEF8F9] dark:group-hover:bg-slate-800 transition-all text-[#004D5C] dark:text-slate-300 font-black text-xs uppercase tracking-wider">
                                            {app.job}
                                        </td>
                                        <td className="px-6 py-5 text-center bg-white dark:bg-slate-800/40 group-hover:bg-[#EEF8F9] dark:group-hover:bg-slate-800 transition-all">
                                            <span className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">{__(app.status)}</span>
                                        </td>
                                        <td className="px-6 py-5 rounded-r-[32px] text-right bg-white dark:bg-slate-800/40 group-hover:bg-[#EEF8F9] dark:group-hover:bg-slate-800 transition-all">
                                            <Eye className="h-4 w-4 inline text-slate-400 group-hover:text-[#006D7E]" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

function KPICard({ icon, title, value, trend, color, dark = false }) {
    const colors = {
        cyan: 'bg-cyan-500/10 text-cyan-600',
        orange: 'bg-orange-500/10 text-orange-600',
        emerald: 'bg-emerald-500/10 text-emerald-600',
        rose: 'bg-rose-500/10 text-rose-600'
    };

    return (
        <div className={`relative group ${dark ? 'cursor-pointer' : ''}`}>
            <div className={`absolute inset-0 rounded-[40px] border border-white/60 dark:border-white/5 shadow-2xl transition-all duration-500 group-hover:scale-[1.02] ${dark ? 'bg-[#004D5C] dark:bg-slate-900 shadow-[#004d5c]/40' : 'bg-gradient-to-br from-white/80 to-white/20 dark:from-slate-800/80 dark:to-slate-900/40 backdrop-blur-3xl'}`} />
            <div className="relative p-9">
                <div className="flex justify-between items-start mb-8">
                    <div className={`p-4 rounded-2xl transition-all ${dark ? 'bg-white/10 text-white' : colors[color]}`}>
                        {icon}
                    </div>
                    <div className={`text-[10px] font-black px-3 py-1.5 rounded-full ${dark ? 'text-white/40 bg-white/5' : 'text-emerald-600 bg-emerald-100/50'}`}>
                        {trend}
                    </div>
                </div>
                <div className={`text-5xl font-black mb-3 tracking-tighter italic leading-none transition-colors ${dark ? 'text-white' : 'text-[#004D5C] dark:text-white'}`}>{value}</div>
                <div className={`${dark ? 'text-white/40' : 'text-slate-400 dark:text-slate-600'} text-[11px] font-black uppercase tracking-widest`}>{title}</div>
            </div>
        </div>
    );
}
