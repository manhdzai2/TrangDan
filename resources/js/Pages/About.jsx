import React from 'react';
import RecruitmentLayout from '../Layouts/RecruitmentLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Target, 
    Rocket, 
    Shield, 
    Zap, 
    Award,
    Maximize2,
    X,
    Search,
    ClipboardCheck,
    ShieldCheck,
    FileBarChart,
    AlertCircle,
    Lock,
    GraduationCap,
    CheckCircle2,
    ArrowRight,
    FileText,
    Globe,
    Building,
    Scale,
    Users,
    History,
    Cpu,
    Clock
} from 'lucide-react';
import { useTranslation } from '@/Hooks/useTranslation';

const ImageModal = ({ src, isOpen, onClose }) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative max-w-7xl max-h-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button 
                        onClick={onClose}
                        className="absolute -top-16 right-0 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>
                    <img src={src} alt="Preview" className="w-full h-full object-contain rounded-2xl shadow-2xl border border-white/10" />
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);

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

const InfoRow = ({ label, value, icon: IconComponent }) => (
    <div className="flex items-start gap-4 py-4 border-b border-slate-100 dark:border-white/5 last:border-0 group">
        <div className="h-10 w-10 bg-[#EEF8F9] dark:bg-[#002B33] rounded-xl flex items-center justify-center text-[#006D7E] dark:text-[#CCEBF0] shrink-0 group-hover:bg-[#006D7E] group-hover:text-white transition-all duration-500 shadow-sm">
            {IconComponent && <IconComponent className="h-5 w-5" />}
        </div>
        <div>
            <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{typeof label === 'string' ? label : ''}</div>
            <div className="text-slate-700 dark:text-slate-300 font-bold italic text-sm">{typeof value === 'string' ? value : ''}</div>
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
    const [selectedImage, setSelectedImage] = React.useState(null);

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
            
            <ImageModal 
                isOpen={!!selectedImage} 
                src={selectedImage} 
                onClose={() => setSelectedImage(null)} 
            />

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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div variants={containerVariants} initial="hidden" animate="visible">
                            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-6 py-2.5 bg-[#EEF8F9] dark:bg-[#002B33] text-[#006D7E] rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10 border border-[#006D7E]/10">
                                <FileText className="h-4 w-4" /> {__('About Legal Profile')}
                            </motion.div>
                            
                            <motion.h1 variants={itemVariants} className="text-7xl font-black text-[#004D5C] dark:text-[#CCEBF0] tracking-tighter italic leading-[1] mb-10">
                                {__('Creating')} <br /> <span className="text-[#006D7E]">{__('Real Values')}</span>
                            </motion.h1>

                            <motion.p variants={itemVariants} className="text-xl text-slate-500 dark:text-slate-400 font-medium italic mb-12 leading-relaxed max-w-xl">
                                {__('About Intro Summary')}
                            </motion.p>

                            <motion.div variants={itemVariants} className="flex gap-4">
                                <div className="px-6 py-3 bg-[#006D7E] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest italic flex items-center gap-2 shadow-lg shadow-[#006D7E]/20">
                                    <Globe className="h-4 w-4" /> {__('About Strategic Partner')}
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-10 bg-[#006D7E]/10 blur-[100px] rounded-full group-hover:bg-[#006D7E]/20 transition duration-700"></div>
                            <div className="relative glass-effect p-8 rounded-[60px] border border-slate-100 dark:border-white/5 overflow-hidden shadow-2xl">
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    className="relative h-[500px] rounded-[40px] overflow-hidden overflow-hidden cursor-zoom-in"
                                    onClick={() => setSelectedImage('/images/building.jpg.png')}
                                >
                                    <img src="/images/building.jpg.png" alt="Almus Tech Building" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#004D5C]/80 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-10 left-10 text-white">
                                        <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Headquarters</div>
                                        <div className="text-2xl font-black italic tracking-tight">ALMUS TECH OFFICE</div>
                                    </div>
                                    <div className="absolute top-8 right-8 h-12 w-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Maximize2 className="h-5 w-5" />
                                    </div>
                                </motion.div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                                    <InfoRow icon={Building} label={__('About Biz Name Label')} value={__('About Biz Name')} />
                                    <InfoRow icon={FileText} label={__('About Tax ID Label')} value={__('About Tax ID')} />
                                    <InfoRow icon={Scale} label={__('About Biz Type Label')} value={__('About Biz Type')} />
                                    <InfoRow icon={Users} label={__('About Representative Label')} value={__('About Representative')} />
                                </div>
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
                                <Rocket className="h-10 w-10 text-amber-300" />
                                <h3 className="text-2xl font-black italic tracking-tight">{__('About History Phase 2 Title')}</h3>
                            </div>
                            <p className="text-slate-200 text-lg italic leading-relaxed font-medium">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                         <div className="grid grid-cols-1 gap-8">
                            <Card icon={<Cpu className="h-8 w-8" />} title={__('About Activity Production')} description={__('About Activity Production Detail')} delay={0.1} />
                            <Card icon={<Shield className="h-8 w-8" />} title={__('About Activity QC')} description={__('About Activity QC Detail')} delay={0.2} />
                            <Card icon={<Award className="h-8 w-8" />} title={__('About Activity Finish')} description={__('About Activity Finish Detail')} delay={0.3} />
                        </div>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative group h-[600px] rounded-[60px] overflow-hidden shadow-2xl cursor-zoom-in"
                            onClick={() => setSelectedImage('/images/Picture6.png')}
                        >
                            <img src="/images/Picture6.png" alt="Factory Process" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#004D5C]/60 to-transparent"></div>
                            <div className="absolute top-8 right-8 h-12 w-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                <Maximize2 className="h-5 w-5" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Regulations Section */}
            <section className="py-40 bg-slate-50 dark:bg-slate-900 relative overflow-hidden transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-12 relative z-10">
                    <SectionHeader subtitle={__('About Reg Title')} title={__('About Reg Discipline Title')} />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-20">
                        {/* Workshop rules image */}
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                            className="relative group bg-white dark:bg-slate-800 p-8 rounded-[60px] shadow-xl overflow-hidden cursor-zoom-in"
                            onClick={() => setSelectedImage('/images/workshop_rules.jpg.png')}
                        >
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#006D7E]/10 rounded-full blur-3xl"></div>
                            <div className="text-[10px] font-black text-[#006D7E] uppercase tracking-widest mb-6 px-4">{__('About Reg Discipline Title')}</div>
                            <img src="/images/workshop_rules.jpg.png" alt="Workshop Rules" className="w-full rounded-[40px] shadow-inner mb-6" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 backdrop-blur-[2px]">
                                <Maximize2 className="h-10 w-10 text-white" />
                            </div>
                        </motion.div>

                        {/* 5S Rules image */}
                        <motion.div 
                            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                            className="relative group bg-white dark:bg-slate-800 p-8 rounded-[60px] shadow-xl overflow-hidden cursor-zoom-in"
                            onClick={() => setSelectedImage('/images/5s_rules.jpg.png')}
                        >
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#006D7E]/10 rounded-full blur-3xl"></div>
                            <div className="text-[10px] font-black text-[#006D7E] uppercase tracking-widest mb-6 px-4">{__('About Reg 5S Title')}</div>
                            <img src="/images/5s_rules.jpg.png" alt="5S Rules" className="w-full rounded-[40px] shadow-inner mb-6" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 backdrop-blur-[2px]">
                                <Maximize2 className="h-10 w-10 text-white" />
                            </div>
                        </motion.div>
                    </div>

                    <div className="mt-20 flex justify-center">
                        <motion.div 
                            whileHover={{ x: 20 }}
                            className="px-12 py-8 bg-white dark:bg-slate-800 rounded-[50px] shadow-lg flex gap-10 items-center border border-[#006D7E]/10"
                        >
                            <div className="h-20 w-20 bg-[#EEF8F9] dark:bg-[#002B33] rounded-[30px] flex items-center justify-center text-[#006D7E] shrink-0"><Clock className="h-10 w-10" /></div>
                            <div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{__('About Reg Time Title')}</div>
                                <div className="text-xl text-slate-700 dark:text-slate-300 font-bold italic">{__('About Reg Time Detail')}</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* QC Information Security */}
            <section className="py-40 bg-[#004D5C] relative overflow-hidden group transition-colors duration-500">
                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#006D7E]/20 to-transparent blur-3xl opacity-50"></div>
                <div className="max-w-7xl mx-auto px-12 relative z-10">
                    <div className="text-center mb-24">
                        <SectionHeader dark subtitle={__('About Security QC Title')} title={__('Lock Information')} />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                        <div className="space-y-12">
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
                        
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative aspect-square rounded-[80px] overflow-hidden shadow-2xl group cursor-zoom-in border-4 border-white/5"
                            onClick={() => setSelectedImage('/images/Picture7.png')}
                        >
                            <img src="/images/Picture7.png" alt="OQC Process" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#004D5C] via-transparent to-transparent opacity-60"></div>
                            <div className="absolute top-10 right-10 h-16 w-16 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                <Maximize2 className="h-6 w-6" />
                            </div>
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

                    <div className="max-w-5xl mx-auto relative group">
                        <div className="absolute -inset-10 bg-[#006D7E]/5 blur-[100px] rounded-full"></div>
                        <motion.div 
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            onClick={() => setSelectedImage('/images/org_chart.jpg.png')}
                            className="relative glass-effect p-4 rounded-[60px] shadow-2xl border border-slate-100 dark:border-white/5 overflow-hidden cursor-zoom-in"
                        >
                            <img src="/images/org_chart.jpg.png" alt="Organization Chart" className="w-full h-auto rounded-[50px]" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#004D5C]/10 backdrop-blur-[2px]">
                                <div className="bg-white/90 dark:bg-slate-900/90 p-6 rounded-[40px] shadow-2xl flex items-center gap-4 text-[#006D7E]">
                                    <Maximize2 className="h-6 w-6" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{__('View Full Screen')}</span>
                                </div>
                            </div>
                        </motion.div>
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
                                            <div className="text-slate-600 dark:text-slate-400 font-bold italic text-sm">{goal}</div>
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
                                            <div className="text-slate-500 dark:text-slate-400 font-medium italic text-sm">{item.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Work Process (OQC) Section */}
            <section className="py-40 bg-white dark:bg-slate-950 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-12">
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

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-40">
                        {[
                            { id: 1, title: __('About OQC Step 1 Title'), desc: __('About OQC Step 1 Desc'), icon: <Target className="h-6 w-6" /> },
                            { id: 2, title: __('About OQC Step 2 Title'), desc: __('About OQC Step 2 Desc'), icon: <Search className="h-6 w-6" /> },
                            { id: 3, title: __('About OQC Step 3 Title'), desc: __('About OQC Step 3 Desc'), icon: <ClipboardCheck className="h-6 w-6" /> },
                            { id: 4, title: __('About OQC Step 4 Title'), desc: __('About OQC Step 4 Desc'), icon: <ShieldCheck className="h-6 w-6" /> },
                            { id: 5, title: __('About OQC Step 5 Title'), desc: __('About OQC Step 5 Desc'), icon: <FileBarChart className="h-6 w-6" /> }
                        ].map((step, index) => (
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

                    {/* Quality Standards Section */}
                    <div className="bg-[#EEF8F9] dark:bg-[#002B33] rounded-[80px] p-20 border border-[#006D7E]/10">
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
                                    {[__('About QC Fail Item 1'), __('About QC Fail Item 2'), __('About QC Fail Item 3'), __('About QC Fail Item 4'), __('About QC Fail Item 5')].map((item, i) => (
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
        </RecruitmentLayout>
    );
}
