import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import { Download, FileText, Filter, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/Hooks/useTranslation';

export default function Index({ stats }) {
    const { __ } = useTranslation();
    const COLORS = ['#006D7E', '#C2410C', '#4F46E5', '#E11D48'];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <AdminLayout>
            <Head title={__('Admin Report Title')} />

            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center mb-10"
            >
                <div>
                    <h1 className="text-4xl font-black text-[#004D5C] tracking-tighter mb-2 italic">{__('Admin Report Header')}</h1>
                    <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">{__('Admin Report Subtitle')}</p>
                </div>
                <motion.button 
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#004D5C] text-white font-black py-4 px-8 rounded-2xl flex items-center gap-2 shadow-2xl shadow-[#004d5c]/20 transition-all group"
                >
                    <Download className="h-6 w-6 group-hover:translate-y-1 transition-transform" /> {__('Admin Export PDF')}
                </motion.button>
            </motion.div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10"
            >
                {/* Status distribution */}
                <motion.div 
                    variants={itemVariants}
                    className="bg-white p-12 rounded-[50px] shadow-sm border border-white/50 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#EEF8F9] rounded-full translate-x-1/2 -translate-y-1/2 opacity-20 blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
                    
                    <h3 className="text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase mb-10 flex items-center gap-3 relative z-10">
                        <TrendingUp className="h-4 w-4 text-[#006D7E]" /> {__('Admin Report Status Dist')}
                    </h3>
                    <div className="h-[350px] relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.by_status}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                <XAxis 
                                    dataKey="status" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 900, textTransform: 'uppercase' }} 
                                    tickFormatter={(val) => __(`Admin Status ${val.charAt(0).toUpperCase() + val.slice(1)}`)}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 900 }} 
                                />
                                <Tooltip 
                                    cursor={{ fill: '#F8FAFC' }}
                                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 900, textTransform: 'uppercase', fontSize: '10px' }}
                                    formatter={(value, name, props) => [value, __(`Admin Status ${props.payload.status.charAt(0).toUpperCase() + props.payload.status.slice(1)}`)]}
                                />
                                <Bar dataKey="count" fill="#006D7E" radius={[12, 12, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Source distribution */}
                <motion.div 
                    variants={itemVariants}
                    className="bg-white p-12 rounded-[50px] shadow-sm border border-white/50 relative overflow-hidden group"
                >
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#006D7E]/5 rounded-full -translate-x-1/2 translate-y-1/2 opacity-20 blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
                    
                    <h3 className="text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase mb-10 flex items-center gap-3 relative z-10">
                        <FileText className="h-4 w-4 text-[#006D7E]" /> {__('Admin Report Source Dist')}
                    </h3>
                    <div className="h-[350px] relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={stats.by_source}
                                    dataKey="count"
                                    nameKey="source"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={120}
                                    paddingAngle={8}
                                >
                                    {stats.by_source.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(255,255,255,0.2)" strokeWidth={2} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 900, textTransform: 'uppercase', fontSize: '10px' }}
                                    formatter={(value, name) => [value, __(`Admin Source ${name.charAt(0).toUpperCase() + name.slice(1)}`)]}
                                />
                                <Legend 
                                    verticalAlign="bottom" 
                                    height={36}
                                    formatter={(value) => <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{__(`Admin Source ${value.charAt(0).toUpperCase() + value.slice(1)}`)}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-[#004D5C] p-10 rounded-[40px] shadow-2xl relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50 group-hover:scale-150 transition duration-1000"></div>
                <div className="flex items-center gap-6 relative z-10">
                    <div className="h-16 w-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10">
                        <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-white italic tracking-tight mb-1">{__('Admin Report AI Title')}</h4>
                        <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">{__('Admin Report AI Note')}</p>
                    </div>
                </div>
            </motion.div>
        </AdminLayout>
    );
}
