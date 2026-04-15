import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Search, Filter, Eye, CheckCircle, XCircle, Clock, Download, X, Mail, Phone, MapPin, Send, Sparkles, User, LayoutGrid } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/Hooks/useTranslation';

export default function Index({ applications, filters }) {
    const { __ } = useTranslation();
    const [selectedApp, setSelectedApp] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || 'all');

    const { data: contactData, setData: setContactData, post: postContact, processing: contacting, reset: resetContact, wasSuccessful: contactSuccess } = useForm({
        subject: '',
        message: '',
    });

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search !== (filters.search || '')) {
                router.get(route('admin.applications.index'), { search, status }, { preserveState: true, replace: true });
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        router.get(route('admin.applications.index'), { search, status: newStatus }, { preserveState: true });
    };

    const openDetails = (app) => {
        setSelectedApp(app);
        setShowModal(true);
        setShowContact(false);
    };

    const updateStatus = (id, status) => {
        router.put(route('admin.applications.updateStatus', id), { status }, {
            onSuccess: () => {
                if (selectedApp && selectedApp.id === id) {
                    setSelectedApp({ ...selectedApp, status });
                }
            }
        });
    };

    const handleContact = (e) => {
        e.preventDefault();
        postContact(route('admin.applications.contact', selectedApp.id), {
            onSuccess: () => {
                setTimeout(() => setShowContact(false), 2000);
                resetContact();
            }
        });
    };

    const mapStatusClass = (status) => {
        switch(status) {
            case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/30';
            case 'reviewed': return 'bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800/30';
            case 'accepted': return 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/30';
            case 'rejected': return 'bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800/30';
            default: return 'bg-slate-50 text-slate-600 border-slate-100 dark:bg-slate-800/50 dark:text-slate-400 dark:border-white/5';
        }
    };

    const mapStatusText = (status) => {
        switch(status) {
            case 'pending': return __('Admin Status Pending');
            case 'reviewed': return __('Admin Status Reviewed');
            case 'accepted': return __('Admin Status Accepted');
            case 'rejected': return __('Admin Status Rejected');
            default: return status;
        }
    };

    const [showReportOverlay, setShowReportOverlay] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);

    const runAI = () => {
        setAnalyzing(true);
        router.post(route('admin.applications.ai-analyze', selectedApp.id), {}, { 
            preserveScroll: true,
            onSuccess: (page) => {
                const updatedApp = page.props.applications.find(a => a.id === selectedApp.id);
                if (updatedApp && updatedApp.ai_analysis) {
                    setSelectedApp(updatedApp);
                    setShowReportOverlay(true);
                } else {
                    alert(__('Admin AI Analysis Error'));
                }
                setAnalyzing(false);
            },
            onError: (err) => {
                console.error(err);
                alert(__('Admin AI Analysis Error'));
                setAnalyzing(false);
            },
            onFinish: () => setAnalyzing(false)
        });
    };

    return (
        <AdminLayout>
            <Head title={__('Admin App Title')} />
            
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center mb-10"
            >
                <div>
                    <h1 className="text-4xl font-black text-[#004D5C] dark:text-white tracking-tighter mb-2 italic uppercase">{__('Admin App Header')}</h1>
                    <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">{__('Admin App Sub')}</p>
                </div>
                <div className="flex gap-4">
                    <Link 
                        href={route('admin.applications.kanban')}
                        className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 text-[#006D7E] font-black py-4 px-8 rounded-2xl flex items-center gap-2 shadow-2xl transition-all group hover:bg-[#EEF8F9]"
                    >
                        <LayoutGrid className="h-5 w-5" /> {__('Admin Kanban Button')}
                    </Link>
                    <a 
                        href={route('admin.export.applications')}
                        className="bg-[#004D5C] text-white font-black py-4 px-8 rounded-2xl flex items-center gap-2 shadow-2xl transition-all group hover:bg-[#003A46]"
                    >
                        <Download className="h-5 w-5 group-hover:translate-y-1 transition-transform" /> {__('Admin Export Button')}
                    </a>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-slate-900 rounded-[40px] shadow-sm border border-white/50 dark:border-white/5 overflow-hidden mb-12"
            >
                <div className="p-8 border-b border-slate-50 dark:border-white/5 flex flex-wrap gap-6 bg-slate-50/20 dark:bg-transparent">
                    <div className="relative flex-1 min-w-[300px]">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                        <input 
                            type="text" 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={__('Admin Search Placeholder')} 
                            className="w-full bg-white dark:bg-slate-800 border-none rounded-2xl pl-16 pr-6 py-4 text-[11px] font-black uppercase tracking-wider focus:ring-2 focus:ring-[#006D7E] transition-all shadow-sm text-[#004D5C] dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600" 
                        />
                    </div>
                    <div className="flex gap-2">
                        {['all', 'pending', 'reviewed', 'accepted', 'rejected'].map((s) => (
                            <button
                                key={s}
                                onClick={() => handleStatusChange(s)}
                                className={`px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                    status === s 
                                    ? 'bg-[#004D5C] text-white shadow-lg' 
                                    : 'bg-white dark:bg-slate-800 text-slate-400 hover:text-[#004D5C] border border-slate-100 dark:border-white/5 shadow-sm'
                                }`}
                            >
                                {s === 'all' ? __('Admin Filter All') : mapStatusText(s)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto px-6 pb-6 pt-2">
                    <table className="w-full text-left border-separate border-spacing-y-4">
                        <thead>
                            <tr className="text-slate-300 dark:text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
                                <th className="px-10 py-4">{__('Admin Table App Source')}</th>
                                <th className="px-10 py-4">{__('Admin Table Position')}</th>
                                <th className="px-10 py-4 text-center">{__('Admin Table Score')}</th>
                                <th className="px-10 py-4 text-center">{__('Admin Table Status')}</th>
                                <th className="px-10 py-4 text-right pr-12">{__('Admin Table Action')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.length > 0 ? applications.map((app, index) => (
                                    <motion.tr 
                                        key={app.id} 
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className={`hover:bg-[#F3F7F8]/80 dark:hover:bg-white/5 transition duration-500 group cursor-default ${!app.is_read ? 'bg-emerald-50/30 dark:bg-emerald-900/5' : ''}`}
                                    >
                                    <td className="px-10 py-6 rounded-l-[32px] bg-white dark:bg-slate-900 group-hover:bg-transparent transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 bg-[#EEF8F9] dark:bg-slate-800 rounded-2xl flex items-center justify-center text-[#006D7E] dark:text-[#CCEBF0] font-black group-hover:bg-[#004D5C] group-hover:text-white transition-all duration-500 text-lg shadow-inner border border-[#006D7E]/5">
                                                {app.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1.5">
                                                    <div className="font-black text-[#004D5C] dark:text-white tracking-tight italic group-hover:translate-x-1 transition-all">{app.name}</div>
                                                    {!app.is_read && (
                                                        <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.6)]" title={__('Admin New App Badge')}></span>
                                                    )}
                                                </div>
                                                <div className="text-[9px] text-slate-300 dark:text-slate-500 font-black tracking-widest uppercase">{app.source || __('Admin Source Direct')} • {app.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-6 bg-white dark:bg-slate-900 group-hover:bg-transparent transition-colors">
                                        <div className="text-[#004D5C] dark:text-slate-200 font-black text-sm italic">{app.vacancy?.title || 'N/A'}</div>
                                        <div className="text-[9px] text-slate-300 dark:text-slate-500 font-black uppercase tracking-widest mt-1">{app.vacancy?.location || 'AMT'}</div>
                                    </td>
                                    <td className="px-10 py-6 bg-white dark:bg-slate-900 group-hover:bg-transparent transition-colors text-center">
                                        {app.ai_analysis?.match_score ? (
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="text-lg font-black text-[#006D7E] italic">{app.ai_analysis.match_score}<span className="text-[10px] opacity-50">%</span></div>
                                                <div className="w-12 h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div 
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${app.ai_analysis.match_score}%` }}
                                                        className={`h-full ${app.ai_analysis.match_score > 80 ? 'bg-emerald-500' : app.ai_analysis.match_score > 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest italic opacity-50">N/A</span>
                                        )}
                                    </td>
                                    <td className="px-10 py-6 text-center bg-white dark:bg-slate-900 group-hover:bg-transparent transition-colors">
                                        <span className={`inline-flex px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm border ${mapStatusClass(app.status)}`}>
                                            {mapStatusText(app.status)}
                                        </span>
                                    </td>
                                    <td className="px-10 py-6 rounded-r-[32px] text-right pr-12 bg-white dark:bg-slate-900 group-hover:bg-transparent transition-colors">
                                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                                            <motion.button 
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => openDetails(app)}
                                                className="p-3 text-slate-300 hover:text-[#006D7E] dark:hover:text-white hover:bg-[#EEF8F9] dark:hover:bg-slate-800 rounded-2xl transition-all shadow-sm bg-white dark:bg-slate-900 border border-slate-50 dark:border-white/5"
                                            >
                                                <Eye className="h-5 w-5" />
                                            </motion.button>
                                            <motion.button 
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => updateStatus(app.id, 'accepted')}
                                                className="p-3 text-slate-300 hover:text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all shadow-sm bg-white dark:bg-slate-900 border border-slate-50 dark:border-white/5"
                                            >
                                                <CheckCircle className="h-5 w-5" />
                                            </motion.button>
                                        </div>
                                    </td>
                                    </motion.tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-20 text-slate-300 font-black uppercase tracking-widest text-xs italic">
                                        {__('Admin No Apps Found')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Details Modal */}
            <AnimatePresence>
                {showModal && selectedApp && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-0">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[#004D5C]/60 dark:bg-black/80 backdrop-blur-md" 
                            onClick={() => setShowModal(false)}
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white dark:bg-slate-900 rounded-[40px] w-full max-w-5xl relative z-10 shadow-2xl overflow-hidden flex flex-col md:flex-row h-[85vh]"
                        >
                            {/* Left Panel: Profile */}
                            <div className="w-full md:w-80 bg-slate-50 dark:bg-slate-800/50 p-10 flex flex-col border-r border-slate-100 dark:border-white/5">
                                <div className="text-center mb-10">
                                    <div className="h-24 w-24 bg-[#004D5C] text-white rounded-[32px] flex items-center justify-center text-4xl font-black mx-auto mb-6 shadow-2xl italic">
                                        {selectedApp.name.charAt(0)}
                                    </div>
                                    <h3 className="text-2xl font-black text-[#004D5C] dark:text-white tracking-tight italic mb-1">{selectedApp.name}</h3>
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{__('Admin Potential Candidate')}</p>
                                </div>

                                <div className="space-y-4 flex-1">
                                    <InfoItem icon={<Mail />} label={__('Admin System Email')} value={selectedApp.email} />
                                    <InfoItem icon={<Phone />} label={__('Admin Phone')} value={selectedApp.phone || __('Admin Not Updated')} />
                                    <InfoItem icon={<MapPin />} label={__('Admin Address')} value={selectedApp.address || __('Admin Not Updated')} />
                                    {selectedApp.age && <InfoItem icon={<User />} label={__('Admin Age')} value={`${selectedApp.age}`} />}
                                    {selectedApp.start_date && <InfoItem icon={<Clock />} label={__('Admin Start Date')} value={new Date(selectedApp.start_date).toLocaleDateString()} />}
                                </div>

                                {selectedApp.cv_path && (
                                    <motion.a 
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        href={`/storage/${selectedApp.cv_path}`} 
                                        target="_blank"
                                        className="mt-6 bg-[#006D7E] text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl text-[10px] uppercase tracking-widest"
                                    >
                                        <Download className="h-4 w-4" /> {__('Admin View CV')}
                                    </motion.a>
                                )}
                            </div>

                            {/* Right Panel: Content & Actions */}
                            <div className="flex-1 p-12 flex flex-col overflow-hidden">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-2">{__('Admin Table Position')}</div>
                                        <h2 className="text-3xl font-black text-[#004D5C] dark:text-white tracking-tight italic">{selectedApp.vacancy?.title}</h2>
                                    </div>
                                    <div className="flex gap-2">
                                        <motion.button 
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setShowContact(!showContact)}
                                            className={`p-4 rounded-2xl transition border ${showContact ? 'bg-[#004D5C] text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-white border-slate-100 dark:border-white/5'}`}
                                        >
                                            <Mail className="h-5 w-5" />
                                        </motion.button>
                                        <motion.button 
                                            whileHover={{ rotate: 90, scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setShowModal(false)} 
                                            className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-300 hover:text-rose-500 transition border border-slate-100 dark:border-white/5"
                                        >
                                            <X className="h-5 w-5" />
                                        </motion.button>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto custom-scrollbar pr-6">
                                    <AnimatePresence mode="wait">
                                        {showContact ? (
                                            <motion.div 
                                                key="contact"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-6"
                                            >
                                                <div className="text-[10px] font-black text-[#004D5C] dark:text-white uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                                                    <Send className="h-4 w-4" /> {__('Admin Contact App')}
                                                </div>
                                                
                                                {contactSuccess ? (
                                                    <motion.div 
                                                        initial={{ scale: 0.9, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 p-10 rounded-[32px] text-center"
                                                    >
                                                        <Sparkles className="h-12 w-12 mx-auto mb-4" />
                                                        <div className="font-black italic text-xl">{__('Admin Contact Success')}</div>
                                                        <p className="text-xs mt-2 opacity-70 uppercase tracking-widest font-black">{__('Admin Contact Note')}</p>
                                                    </motion.div>
                                                ) : (
                                                    <form onSubmit={handleContact} className="space-y-6">
                                                        <div className="space-y-2">
                                                            <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">{__('Admin Subject')}</label>
                                                            <input 
                                                                type="text" 
                                                                value={contactData.subject}
                                                                onChange={e => setContactData('subject', e.target.value)}
                                                                placeholder={__('Admin Subject Placeholder')}
                                                                className="w-full bg-[#F3F7F8] dark:bg-slate-800 border-none rounded-2xl p-4 text-xs font-black italic text-[#004D5C] dark:text-white"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">{__('Admin Message')}</label>
                                                            <textarea 
                                                                rows={6}
                                                                value={contactData.message}
                                                                onChange={e => setContactData('message', e.target.value)}
                                                                placeholder={__('Admin Message Placeholder')}
                                                                className="w-full bg-[#F3F7F8] dark:bg-slate-800 border-none rounded-[32px] p-6 text-xs font-black italic text-[#004D5C] dark:text-white leading-relaxed"
                                                            ></textarea>
                                                        </div>
                                                        <motion.button
                                                            disabled={contacting}
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                            className="w-full bg-[#004D5C] text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl flex items-center justify-center gap-2"
                                                        >
                                                            {contacting ? __('Admin Sending') : __('Admin Send Button')}
                                                        </motion.button>
                                                    </form>
                                                )}
                                            </motion.div>
                                        ) : (
                                            <motion.div 
                                                key="details"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                            >
                                                <div className="mb-10">
                                                    <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4 flex justify-between items-center">
                                                        <span>{__('Admin Cover Letter')}</span>
                                                        <div className="flex gap-2">
                                                            {selectedApp.ai_analysis && (
                                                                <motion.button
                                                                    onClick={() => setShowReportOverlay(true)}
                                                                    whileHover={{ scale: 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                    className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest shadow-sm"
                                                                >
                                                                    <Eye className="w-3 h-3" /> {__('Admin View AI Insight')}
                                                                </motion.button>
                                                            )}
                                                            <motion.button
                                                                onClick={runAI}
                                                                disabled={analyzing}
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all text-[9px] font-black uppercase tracking-widest ${analyzing ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-[#EEF8F9] text-[#006D7E] border-[#006D7E]/10 hover:bg-[#006D7E] hover:text-white shadow-sm'}`}
                                                            >
                                                                <Sparkles className={`w-3 h-3 ${analyzing ? 'animate-spin' : ''}`} /> 
                                                                {analyzing ? __('Admin AI Analyzing') : selectedApp.ai_analysis ? __('Admin AI Analyze Again') : __('Admin AI Analyze Button')}
                                                            </motion.button>
                                                        </div>
                                                    </div>

                                                    <div 
                                                        className="bg-slate-50 dark:bg-white/5 p-8 rounded-[32px] text-sm font-medium text-[#004D5C] dark:text-slate-300 leading-relaxed italic border border-slate-100 dark:border-white/5"
                                                        dangerouslySetInnerHTML={{ __html: selectedApp.cover_letter || __('Admin No Cover Letter') }}
                                                    />
                                                </div>

                                                <div>
                                                    <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-6">{__('Admin Change Status')}</div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        {[
                                                            { status: 'reviewed', label: __('Status Reviewed'), icon: <Eye className="h-4 w-4" />, color: 'indigo' },
                                                            { status: 'pending', label: __('Status Pending'), icon: <Clock className="h-4 w-4" />, color: 'amber' },
                                                            { status: 'accepted', label: __('Status Accepted'), icon: <CheckCircle className="h-4 w-4" />, color: 'emerald' },
                                                            { status: 'rejected', label: __('Status Rejected'), icon: <XCircle className="h-4 w-4" />, color: 'rose' }
                                                        ].map((btn) => (
                                                            <button
                                                                key={btn.status}
                                                                onClick={() => updateStatus(selectedApp.id, btn.status)}
                                                                className={`p-5 rounded-2xl flex items-center gap-3 transition-all border font-black text-[10px] uppercase tracking-widest ${
                                                                    selectedApp.status === btn.status 
                                                                    ? `bg-${btn.color}-50 dark:bg-${btn.color}-900/20 text-${btn.color}-600 dark:text-${btn.color}-400 border-${btn.color}-200 dark:border-${btn.color}-700 shadow-lg` 
                                                                    : 'border-slate-100 dark:border-white/5 bg-white dark:bg-slate-800 text-slate-400 hover:border-slate-200'
                                                                }`}
                                                            >
                                                                {btn.icon} {btn.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* AI Insight Report Overlay */}
            <AnimatePresence>
                {showReportOverlay && selectedApp?.ai_analysis && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[#002B33]/80 backdrop-blur-2xl"
                            onClick={() => setShowReportOverlay(false)}
                        />
                        <motion.div 
                            initial={{ opacity: 0, y: 100, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 100, scale: 0.9 }}
                            className="bg-white dark:bg-slate-900 w-full max-w-6xl rounded-[50px] shadow-2xl relative z-10 overflow-hidden flex flex-col h-[90vh]"
                        >
                            <div className="absolute top-0 right-0 p-10 z-20">
                                <motion.button 
                                    whileHover={{ rotate: 90, scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setShowReportOverlay(false)}
                                    className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-300 hover:text-rose-500 transition shadow-xl"
                                >
                                    <X className="h-6 w-6" />
                                </motion.button>
                            </div>

                            <div className="flex-1 overflow-y-auto custom-scrollbar">
                                <div className="p-16">
                                    <div className="flex flex-col md:flex-row gap-16 items-start">
                                        {/* Score Section */}
                                        <div className="w-full md:w-1/3 flex flex-col items-center">
                                            <div className="relative h-64 w-64 flex items-center justify-center mb-8">
                                                <svg className="w-full h-full transform -rotate-90">
                                                    <circle cx="128" cy="128" r="110" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-slate-50 dark:text-slate-800" />
                                                    <motion.circle 
                                                        cx="128" cy="128" r="110" stroke="currentColor" strokeWidth="16" fill="transparent" 
                                                        strokeDasharray={2 * Math.PI * 110}
                                                        initial={{ strokeDashoffset: 2 * Math.PI * 110 }}
                                                        animate={{ strokeDashoffset: 2 * Math.PI * 110 * (1 - selectedApp.ai_analysis.match_score / 100) }}
                                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                                        className="text-[#006D7E]" 
                                                    />
                                                </svg>
                                                <div className="absolute flex flex-col items-center">
                                                    <span className="text-7xl font-black text-[#004D5C] dark:text-white leading-none italic">{selectedApp.ai_analysis.match_score}</span>
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{__('Admin AI Result Match')}</span>
                                                </div>
                                            </div>

                                            <div className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl mb-10 ${
                                                selectedApp.ai_analysis.recommendation === 'Highly Recommend' ? 'bg-emerald-500 text-white' :
                                                selectedApp.ai_analysis.recommendation === 'Strong Fit' ? 'bg-[#006D7E] text-white' :
                                                selectedApp.ai_analysis.recommendation === 'Potential' ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white'
                                            }`}>
                                                {selectedApp.ai_analysis.recommendation}
                                            </div>

                                            <div className="space-y-6 w-full">
                                                <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[32px] border border-slate-100 dark:border-white/5">
                                                    <div className="text-[9px] font-black text-[#006D7E] uppercase tracking-widest mb-4 flex items-center gap-2">
                                                        <CheckCircle className="w-3 h-3" /> {__('Admin Strategic Summary')}
                                                    </div>
                                                    <p className="text-xs font-bold leading-relaxed text-[#004D5C] dark:text-slate-300 italic">
                                                        "{selectedApp.ai_analysis.summary}"
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="flex-1 space-y-12">
                                            <div>
                                                <h2 className="text-4xl font-black text-[#004D5C] dark:text-white tracking-tighter italic mb-2">{__('Admin AI Report Title')}</h2>
                                                <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">{__('Admin AI Report Sub')}</p>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                                <section className="bg-white dark:bg-slate-800 p-10 rounded-[40px] shadow-sm border border-slate-50 dark:border-white/5">
                                                    <div className="text-[10px] font-black text-[#006D7E] uppercase tracking-widest mb-6">{__('Admin Experience Eval')}</div>
                                                    <p className="text-xs font-bold leading-relaxed text-[#004D5C] dark:text-slate-300">
                                                        {selectedApp.ai_analysis.experience_evaluation}
                                                    </p>
                                                </section>

                                                <section className="bg-[#EEF8F9] dark:bg-slate-800 p-10 rounded-[40px] shadow-sm">
                                                    <div className="text-[10px] font-black text-[#006D7E] dark:text-white uppercase tracking-widest mb-6">{__('Admin Tech Skills')}</div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {selectedApp.ai_analysis.technical_fit.map((skill, i) => (
                                                            <span key={i} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                                                                skill.includes('đạt') || skill.includes('tốt') ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                                                            }`}>
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </section>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                                <section className="bg-white dark:bg-slate-800 p-10 rounded-[40px] shadow-sm border border-slate-50 dark:border-white/5">
                                                    <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-6">{__('Admin Soft Skills')}</div>
                                                    <div className="space-y-3">
                                                        {selectedApp.ai_analysis.soft_skills.map((skill, i) => (
                                                            <div key={i} className="flex items-center gap-3 text-xs font-black text-slate-500 italic">
                                                                <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> {skill}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </section>

                                                <section className="bg-[#004D5C] p-10 rounded-[40px] shadow-2xl">
                                                    <div className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-6 flex items-center gap-2">
                                                        <div className="w-3 h-3 text-amber-400" ><Sparkles/></div> {__('Admin Interview Questions')}
                                                    </div>
                                                    <div className="space-y-4">
                                                        {selectedApp.ai_analysis.interview_questions.map((q, i) => (
                                                            <div key={i} className="bg-white/5 p-4 rounded-2xl text-[11px] font-bold text-white italic border border-white/5 hover:bg-white/10 transition-colors">
                                                                "{q}"
                                                            </div>
                                                        ))}
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </AdminLayout>
    );
}

function InfoItem({ icon, label, value }) {
    return (
        <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 group hover:border-[#006D7E] transition-all">
            <div className="text-[#006D7E] shrink-0 group-hover:scale-110 transition-transform">{icon}</div>
            <div className="overflow-hidden">
                <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">{label}</div>
                <div className="text-[11px] font-black text-[#004D5C] dark:text-white truncate">{value}</div>
            </div>
        </div>
    );
}
