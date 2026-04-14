import RecruitmentLayout from '@/Layouts/RecruitmentLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Send, Calendar, Users, ClipboardCheck, 
    CheckCircle2, ArrowRight, Sparkles, Zap,
    Star, Heart, ShieldCheck, AlertCircle, Search, FileBarChart
} from 'lucide-react';
import { useTranslation } from '@/Hooks/useTranslation';

export default function Process() {
    const { __ } = useTranslation();

    const recruitmentSteps = [
        {
            id: 1,
            title: __('Process Step 1 Title'),
            description: __('Process Step 1 Desc'),
            icon: <Send className="h-8 w-8 text-[#006D7E]" />,
            color: "bg-[#EEF8F9] dark:bg-[#002B33]",
            badge: __('Process Step 1 Badge')
        },
        {
            id: 2,
            title: __('Process Step 2 Title'),
            description: __('Process Step 2 Desc'),
            icon: <Users className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />,
            color: "bg-indigo-50 dark:bg-indigo-950/30",
            badge: __('Process Step 2 Badge')
        },
        {
            id: 3,
            title: __('Process Step 3 Title'),
            description: __('Process Step 3 Desc'),
            icon: <Zap className="h-8 w-8 text-amber-600 dark:text-amber-400" />,
            color: "bg-amber-50 dark:bg-amber-950/30",
            badge: __('Process Step 3 Badge')
        },
        {
            id: 4,
            title: __('Process Step 4 Title'),
            description: __('Process Step 4 Desc'),
            icon: <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />,
            color: "bg-emerald-50 dark:bg-emerald-950/30",
            badge: __('Process Step 4 Badge')
        }
    ];

    const oqcSteps = [
        { id: 1, title: __('About OQC Step 1 Title'), desc: __('About OQC Step 1 Desc'), icon: <Target className="h-6 w-6" /> },
        { id: 2, title: __('About OQC Step 2 Title'), desc: __('About OQC Step 2 Desc'), icon: <Search className="h-6 w-6" /> },
        { id: 3, title: __('About OQC Step 3 Title'), desc: __('About OQC Step 3 Desc'), icon: <ClipboardCheck className="h-6 w-6" /> },
        { id: 4, title: __('About OQC Step 4 Title'), desc: __('About OQC Step 4 Desc'), icon: <ShieldCheck className="h-6 w-6" /> },
        { id: 5, title: __('About OQC Step 5 Title'), desc: __('About OQC Step 5 Desc'), icon: <FileBarChart className="h-6 w-6" /> }
    ];

    return (
        <RecruitmentLayout>
            <Head title={__('Process Head Title')} />

            {/* Hero Section */}
            <section className="pt-40 pb-32 bg-white dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-[#006D7E]/5 blur-[120px] rounded-full translate-x-1/2"></div>
                </div>

                <div className="max-w-7xl mx-auto px-12">
                    <div className="text-center mb-32 relative">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#EEF8F9] dark:bg-[#002B33] text-[#006D7E] rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-[#006D7E]/10"
                        >
                            <Sparkles className="h-3 w-3" /> {__('Process Badge')}
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-7xl font-black text-[#004D5C] dark:text-[#CCEBF0] tracking-tighter italic leading-none mb-10"
                        >
                            {__('Process Hero Title 1')} <br /> <span className="text-[#006D7E]">{__('Process Hero Title 2')}</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="text-slate-500 dark:text-slate-400 text-lg font-medium italic max-w-2xl mx-auto leading-relaxed"
                        >
                            {__('Process Hero Desc')}
                        </motion.p>
                    </div>

                    {/* Recruitment Steps */}
                    <div className="relative mb-60">
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#006D7E]/20 via-[#006D7E]/5 to-transparent -translate-x-1/2">
                            <motion.div 
                                initial={{ height: 0 }}
                                whileInView={{ height: '100%' }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="w-full bg-[#006D7E] origin-top"
                            />
                        </div>

                        <div className="space-y-32">
                            {recruitmentSteps.map((step, index) => (
                                <div key={step.id} className="relative flex flex-col lg:flex-row items-center justify-between gap-12 group">
                                    <motion.div 
                                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                        className={`w-full lg:w-[45%] ${index % 2 !== 0 ? 'lg:order-2' : ''}`}
                                    >
                                        <div className="bg-white dark:bg-slate-900 p-12 rounded-[60px] shadow-sm border border-slate-50 dark:border-white/5 relative group-hover:shadow-2xl group-hover:shadow-[#006D7E]/5 transition-all duration-700">
                                            <div className={`h-16 w-16 ${step.color} rounded-3xl flex items-center justify-center mb-10`}>
                                                {step.icon}
                                            </div>
                                            <div className="text-[10px] font-black text-[#006D7E] uppercase tracking-widest mb-4">{step.badge}</div>
                                            <h3 className="text-3xl font-black text-[#004D5C] dark:text-[#CCEBF0] italic tracking-tight mb-6">{step.title}</h3>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium italic leading-relaxed">{step.description}</p>
                                        </div>
                                    </motion.div>

                                    <div className="relative z-10 h-24 w-24 bg-[#004D5C] dark:bg-slate-800 border-8 border-white dark:border-slate-950 rounded-full flex items-center justify-center text-white text-3xl font-black italic shadow-2xl group-hover:bg-[#006D7E] transition-all duration-700">
                                        {step.id}
                                    </div>

                                    <div className={`hidden lg:block w-[45%] ${index % 2 === 0 ? 'lg:order-2' : ''}`}>
                                         <div className="h-40 w-full border-2 border-dashed border-slate-100 rounded-[60px] flex items-center justify-center opacity-30 saturate-0">
                                             <Sparkles className="h-12 w-12 text-[#006D7E]/20" />
                                         </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Work Process (OQC) Section */}
                    <div className="mt-60">
                        <div className="text-center mb-24">
                            <motion.div 
                                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                                className="text-[10px] font-black text-[#006D7E] tracking-[0.4em] uppercase mb-6"
                            >
                                {__('Work Environment')}
                            </motion.div>
                            <h2 className="text-5xl font-black text-[#004D5C] dark:text-[#CCEBF0] tracking-tighter italic mb-8">
                                {__('About OQC Process Title')}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                            {oqcSteps.map((step, index) => (
                                <motion.div 
                                    key={step.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-white/5 relative group cursor-default"
                                >
                                    <div className="h-12 w-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-[#006D7E] mb-6 shadow-sm group-hover:bg-[#006D7E] group-hover:text-white transition duration-500">
                                        {step.icon}
                                    </div>
                                    <div className="text-[10px] font-black text-[#006D7E] opacity-40 mb-4 tracking-widest">STEP 0{step.id}</div>
                                    <h4 className="text-lg font-black text-[#004D5C] dark:text-[#CCEBF0] italic tracking-tight mb-4">{step.title}</h4>
                                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium italic leading-relaxed">{step.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Quality Standards Section */}
                    <div className="mt-60 bg-[#EEF8F9] dark:bg-[#002B33] rounded-[80px] p-20 border border-[#006D7E]/10">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl font-black text-[#004D5C] dark:text-[#CCEBF0] tracking-tighter italic mb-4">
                                {__('About QC Standard Title')}
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium italic">{__('About Strategic Partner')}</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <motion.div 
                                whileHover={{ y: -5 }}
                                className="bg-white dark:bg-slate-900 p-12 rounded-[60px] shadow-sm border-l-8 border-emerald-500"
                            >
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="h-12 w-12 bg-emerald-50 dark:bg-emerald-950/30 rounded-full flex items-center justify-center text-emerald-600">
                                        <CheckCircle2 className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-2xl font-black italic text-[#004D5C] dark:text-[#CCEBF0]">{__('About QC Pass Label')}</h3>
                                </div>
                                <ul className="space-y-4">
                                    {[__('About QC Pass Item 1'), __('About QC Pass Item 2')].map((item, i) => (
                                        <li key={i} className="flex gap-4 items-start text-slate-500 dark:text-slate-400 font-medium italic">
                                            <div className="h-5 w-5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center shrink-0 mt-1">
                                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-600"></div>
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            <motion.div 
                                whileHover={{ y: -5 }}
                                className="bg-white dark:bg-slate-900 p-12 rounded-[60px] shadow-sm border-l-8 border-rose-500"
                            >
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="h-12 w-12 bg-rose-50 dark:bg-rose-950/30 rounded-full flex items-center justify-center text-rose-600">
                                        <AlertCircle className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-2xl font-black italic text-[#004D5C] dark:text-[#CCEBF0]">{__('About QC Fail Label')}</h3>
                                </div>
                                <ul className="space-y-4">
                                    {[__('About QC Fail Item 1'), __('About QC Fail Item 2')].map((item, i) => (
                                        <li key={i} className="flex gap-4 items-start text-slate-500 dark:text-slate-400 font-medium italic">
                                            <div className="h-5 w-5 rounded-full bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center shrink-0 mt-1">
                                                <div className="h-1.5 w-1.5 rounded-full bg-rose-600"></div>
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-40 bg-white dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
                <div className="max-w-7xl mx-auto px-12 text-center relative">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="bg-[#004D5C] rounded-[80px] p-24 relative overflow-hidden group shadow-2xl"
                    >
                        <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter mb-10 leading-none relative z-10">
                            {__('Process CTA Title 1')} <br /> {__('Process CTA Title 2')} <span className="text-[#006D7E]">{__('Process CTA Title 3')}</span>
                        </h2>
                        <motion.div whileHover={{ scale: 1.05 }} className="relative z-10">
                            <Link 
                                href="/jobs" 
                                className="inline-flex items-center gap-4 px-16 py-6 bg-white text-[#004D5C] rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-2xl transition-all duration-500"
                            >
                                {__('Process CTA Button')} <ArrowRight className="h-5 w-5" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </RecruitmentLayout>
    );
}

const Target = (props) => (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
);

const Rocket = (props) => (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3" />
      <path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5" />
    </svg>
);
