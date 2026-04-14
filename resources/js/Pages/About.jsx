import React from 'react';
import RecruitmentLayout from '../Layouts/RecruitmentLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Target, 
    Rocket, 
    Shield, 
    Zap, 
    Users, 
    Globe,
    ArrowRight,
    MapPin,
    Building,
    FileText,
    History,
    Cpu,
    Briefcase,
    Clock,
    Scale,
    Lock,
    Network,
    GraduationCap,
    CheckCircle2,
    Award
} from 'lucide-react';
import { useTranslation } from '@/Hooks/useTranslation';

const Card = ({ title, description, icon, delay = 0 }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -8, scale: 1.02 }}
        className="glass-effect p-10 flex flex-col items-center text-center group cursor-default relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[40px] shadow-xl hover:shadow-2xl"
    >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#006D7E]/20 to-transparent group-hover:via-[#006D7E]/50 transition-all duration-700"></div>
        <div className="h-20 w-20 bg-[#EEF8F9] dark:bg-[#002B33] rounded-[32px] flex items-center justify-center text-[#006D7E] dark:text-[#CCEBF0] mb-8 group-hover:bg-[#006D7E] group-hover:text-white transition-all duration-700 shadow-inner">
            {icon}
        </div>
        <h3 className="text-xl font-black text-[#004D5C] dark:text-[#CCEBF0] italic mb-4 tracking-tight group-hover:text-[#006D7E] transition-colors duration-300">{title}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium italic leading-relaxed">{description}</p>
    </motion.div>
);

const InfoRow = ({ label, value, icon: Icon }) => (
    <div className="flex items-start gap-4 py-4 border-b border-slate-100 dark:border-white/5 last:border-0 group">
        <div className="h-10 w-10 bg-[#EEF8F9] dark:bg-[#002B33] rounded-xl flex items-center justify-center text-[#006D7E] shrink-0 group-hover:bg-[#006D7E] group-hover:text-white transition-all duration-500 shadow-sm">
            <Icon className="h-5 w-5" />
        </div>
        <div>
            <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{label}</div>
            <div className="text-slate-700 dark:text-slate-300 font-bold italic">{value}</div>
        </div>
    </div>
);

const SectionHeader = ({ subtitle, title, description, dark = false }) => (
    <div className="text-center mb-24">
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`text-[10px] font-black ${dark ? 'text-white/40' : 'text-[#006D7E]'} tracking-[0.4em] uppercase mb-6`}
        >
            {subtitle}
        </motion.div>
        <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`text-6xl font-black ${dark ? 'text-white' : 'text-[#004D5C] dark:text-[#CCEBF0]'} tracking-tighter italic mb-8 leading-none`}
        >
            {title}
        </motion.h2>
        {description && (
            <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className={`text-lg font-medium italic max-w-2xl mx-auto leading-relaxed ${dark ? 'text-white/60' : 'text-slate-500 dark:text-slate-400'}`}
            >
                {description}
            </motion.p>
        )}
    </div>
);

export default function About() {
    const { __ } = useTranslation();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <RecruitmentLayout>
            <Head title={__('About Us')} />

            {/* Hero Section - Legal Profile */}
            <section className="min-h-screen relative flex items-center pt-32 pb-20 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500">
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 0.05 }} transition={{ duration: 2 }}
                        className="absolute top-0 right-0 w-1/2 h-full bg-[#006D7E] blur-[160px] rounded-full translate-x-1/2"
                    ></motion.div>
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 0.03 }} transition={{ duration: 2, delay: 0.5 }}
                        className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[#004D5C] blur-[120px] rounded-full -translate-x-1/2"
                    ></motion.div>
                </div>

                <div className="max-w-7xl mx-auto px-12 w-full relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <motion.div variants={containerVariants} initial="hidden" animate="visible">
                            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-6 py-2.5 bg-[#EEF8F9] dark:bg-[#002B33] text-[#006D7E] rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10 border border-[#006D7E]/10">
                                <FileText className="h-4 w-4" /> {__('About Legal Profile')}
                            </motion.div>
                            
                            <motion.h1 variants={itemVariants} className="text-7xl font-black text-[#004D5C] dark:text-[#CCEBF0] tracking-tighter italic leading-[1] mb-10">
                                {__('Creating')} <br /> <span className="text-[#006D7E]">{__('Real Values')}</span>
                            </motion.h1>

                            <motion.p variants={itemVariants} className="text-xl text-slate-500 dark:text-slate-400 font-medium italic mb-12 leading-relaxed max-w-3xl">
                                {__('About Intro Summary')}
                            </motion.p>

                            <motion.div variants={itemVariants} className="flex gap-4">
                                <div className="px-6 py-3 bg-[#006D7E] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest italic flex items-center gap-2">
                                    <Globe className="h-4 w-4" /> {__('About Strategic Partner')}
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="bg-white dark:bg-slate-900 p-12 rounded-[60px] shadow-2xl border border-slate-100 dark:border-white/5 relative group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#EEF8F9] dark:bg-[#002B33] rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-110 transition duration-700"></div>
                            <div className="space-y-2 relative z-10">
                                <InfoRow icon={Building} label={__('About Biz Name Label')} value={__('About Biz Name')} />
                                <InfoRow icon={Scale} label={__('About Biz Type Label')} value={__('About Biz Type')} />
                                <InfoRow icon={FileText} label={__('About Tax ID Label')} value={__('About Tax ID')} />
                                <InfoRow icon={MapPin} label={__('About Location Label')} value={__('About Location')} />
                                <InfoRow icon={Users} label={__('About Representative Label')} value={__('About Representative')} />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* History Section - Phased Timeline */}
            <section className="py-40 bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-white/5 relative overflow-hidden transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-12 relative z-10">
                    <SectionHeader 
                        subtitle={__('History')}
                        title={__('About History Title')}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-20">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                            className="bg-white dark:bg-slate-800 p-12 rounded-[60px] shadow-xl relative group overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-2 h-full bg-[#006D7E]/20"></div>
                            <div className="flex items-center gap-6 mb-8 text-[#006D7E]">
                                <History className="h-10 w-10" />
                                <h3 className="text-2xl font-black italic tracking-tight">{__('About History Phase 1 Title')}</h3>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-lg italic leading-relaxed font-medium">
                                {__('About History Phase 1 Detail')}
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                            className="bg-[#004D5C] p-12 rounded-[60px] shadow-xl relative group overflow-hidden text-white"
                        >
                            <div className="absolute top-0 left-0 w-2 h-full bg-white/20"></div>
                            <div className="flex items-center gap-6 mb-8 text-white">
                                <Rocket className="h-10 w-10" />
                                <h3 className="text-2xl font-black italic tracking-tight">{__('About History Phase 2 Title')}</h3>
                            </div>
                            <p className="text-white/60 text-lg italic leading-relaxed font-medium">
                                {__('About History Phase 2 Detail')}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Fields of Activity */}
            <section className="py-40 bg-white dark:bg-slate-950 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-12">
                    <SectionHeader 
                        subtitle={__('About Activity Title')}
                        title={__('Jobs Division Title')}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <Card icon={<Cpu className="h-8 w-8" />} title={__('About Activity Production')} description={__('About Activity Production Detail')} delay={0.1} />
                        <Card icon={<Shield className="h-8 w-8" />} title={__('About Activity QC')} description={__('About Activity QC Detail')} delay={0.2} />
                        <Card icon={<Award className="h-8 w-8" />} title={__('About Activity Finish')} description={__('About Activity Finish Detail')} delay={0.3} />
                    </div>
                </div>
            </section>

            {/* Regulations Section */}
            <section className="py-40 bg-slate-50 dark:bg-slate-900 relative overflow-hidden transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div>
                            <SectionHeader 
                                subtitle={__('About Reg Title')}
                                title={__('About Reg Discipline Title')}
                                description={__('About Reg Discipline Detail')}
                            />
                            <div className="space-y-8">
                                <motion.div 
                                    whileHover={{ x: 20 }}
                                    className="p-8 bg-white dark:bg-slate-800 rounded-[40px] shadow-lg flex gap-6 items-center"
                                >
                                    <div className="h-16 w-16 bg-[#EEF8F9] dark:bg-[#002B33] rounded-3xl flex items-center justify-center text-[#006D7E] shrink-0"><Clock className="h-8 w-8" /></div>
                                    <div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{__('About Reg Time Title')}</div>
                                        <div className="text-slate-700 dark:text-slate-300 font-bold italic">{__('About Reg Time Detail')}</div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-[#004D5C] p-2 dark:bg-slate-800 rounded-[80px] rotate-3 shadow-2xl relative overflow-hidden group">
                                <div className="bg-white dark:bg-slate-900 p-20 rounded-[78px] -rotate-3 transition duration-700 group-hover:rotate-0">
                                    <div className="flex flex-col items-center text-center">
                                        <Zap className="h-24 w-24 text-[#006D7E] mb-10 animate-pulse" />
                                        <h4 className="text-3xl font-black text-[#004D5C] dark:text-[#CCEBF0] italic tracking-tighter mb-6 underline decoration-[#006D7E]/30">{__('About Reg 5S Title')}</h4>
                                        <p className="text-slate-500 italic font-medium">{__('About Reg 5S Detail')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* QC Information Security */}
            <section className="py-40 bg-[#004D5C] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#006D7E]/20 to-transparent blur-3xl opacity-50"></div>
                <div className="max-w-7xl mx-auto px-12 relative z-10">
                    <div className="text-center mb-24">
                        <SectionHeader dark subtitle={__('About Security QC Title')} title={__('Lock Information')} />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-10 border border-white/10 rounded-[50px] bg-white/5 backdrop-blur-sm">
                            <div className="flex items-center gap-6 mb-8 text-white">
                                <Shield className="h-10 w-10 text-emerald-400" />
                                <h4 className="text-2xl font-black italic tracking-tight">{__('About QC Importance')}</h4>
                            </div>
                            <p className="text-white/60 text-lg italic leading-relaxed">{__('About Security QC Importance')}</p>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="p-10 border border-white/10 rounded-[50px] bg-white/5 backdrop-blur-sm">
                            <div className="flex items-center gap-6 mb-8 text-white">
                                <Lock className="h-10 w-10 text-amber-400" />
                                <h4 className="text-2xl font-black italic tracking-tight">{__('About QC Measures')}</h4>
                            </div>
                            <p className="text-white/60 text-lg italic leading-relaxed">{__('About Security QC Measures')}</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Org Chart Area */}
            <section className="py-40 bg-white dark:bg-slate-950 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-12">
                    <SectionHeader 
                        subtitle={__('About Org Chart Title')}
                        title={__('About Org CEO')}
                    />

                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
                            <motion.div whileHover={{ y: -10 }} className="p-10 bg-slate-50 dark:bg-slate-900 rounded-[50px] border border-slate-100 dark:border-white/5 group">
                                <Network className="h-12 w-12 text-[#006D7E] mx-auto mb-6 group-hover:scale-110 transition duration-500" />
                                <h5 className="text-xl font-black text-[#004D5C] dark:text-[#CCEBF0] italic tracking-tighter mb-4">{__('About Org Production Dir')}</h5>
                                <p className="text-slate-400 text-sm italic">{__('About Org Units')}</p>
                            </motion.div>
                            <motion.div whileHover={{ y: -10 }} className="p-10 bg-slate-50 dark:bg-slate-900 rounded-[50px] border border-slate-100 dark:border-white/5 group">
                                <Briefcase className="h-12 w-12 text-[#006D7E] mx-auto mb-6 group-hover:scale-110 transition duration-500" />
                                <h5 className="text-xl font-black text-[#004D5C] dark:text-[#CCEBF0] italic tracking-tighter mb-4">{__('About Org Admin Dir')}</h5>
                                <p className="text-slate-400 text-sm italic">{__('About Org Admin Unit')}</p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Internship Program */}
            <section className="py-40 bg-slate-50 dark:bg-slate-900 transition-colors duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#006D7E]/5 rounded-full blur-3xl"></div>
                <div className="max-w-7xl mx-auto px-12 relative z-10">
                    <div className="bg-white dark:bg-slate-800 p-24 rounded-[80px] shadow-2xl relative overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                            <div>
                                <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10">
                                    <GraduationCap className="h-4 w-4" /> {__('About Intern Program Title')}
                                </div>
                                <h2 className="text-5xl font-black text-[#004D5C] dark:text-[#CCEBF0] italic tracking-tighter mb-8 leading-none">
                                    {__('About Intern Campaign')}
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 text-lg font-medium italic mb-10">
                                    {__('About Intern Content')}
                                </p>
                                <div className="space-y-4 mb-12">
                                    {[__('About Intern Goal 1'), __('About Intern Goal 2'), __('About Intern Goal 3')].map((goal, i) => (
                                        <div key={i} className="flex gap-4 items-center group">
                                            <div className="h-8 w-8 bg-[#EEF8F9] dark:bg-[#002B33] rounded-lg flex items-center justify-center text-[#006D7E] group-hover:bg-[#006D7E] group-hover:text-white transition duration-500"><CheckCircle2 className="h-4 w-4" /></div>
                                            <div className="text-slate-600 dark:text-slate-400 font-bold italic">{goal}</div>
                                        </div>
                                    ))}
                                </div>
                                <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
                                    <Link href="/jobs" className="px-10 py-5 bg-[#004D5C] text-white rounded-[24px] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl flex items-center gap-3">
                                        {__('Home Explore Jobs')} <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </motion.div>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-900/50 p-12 rounded-[60px] border border-slate-100 dark:border-white/5">
                                <h4 className="text-2xl font-black text-[#004D5C] dark:text-[#CCEBF0] italic tracking-tight mb-10 border-b-2 border-[#006D7E]/20 pb-4">{__('About Intern Timeline')}</h4>
                                <div className="space-y-10">
                                    {[
                                        { week: __('About Intern Week 1 Label'), desc: __('About Intern Week 1') },
                                        { week: __('About Intern Week 2 Label'), desc: __('About Intern Week 2') },
                                        { week: __('About Intern Week 3 Label'), desc: __('About Intern Week 3') }
                                    ].map((item, i) => (
                                        <div key={i} className="relative pl-12 group">
                                            <div className="absolute left-0 top-0 h-full w-0.5 bg-slate-200 dark:bg-slate-700"></div>
                                            <div className="absolute left-[-5px] top-0 h-3 w-3 rounded-full bg-[#006D7E] group-hover:scale-150 transition duration-500 shadow-[0_0_10px_rgba(0,109,126,0.5)]"></div>
                                            <div className="text-[10px] font-black text-[#006D7E] uppercase tracking-widest mb-2">{item.week}</div>
                                            <div className="text-slate-500 dark:text-slate-400 font-medium italic">{item.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </RecruitmentLayout>
    );
}
