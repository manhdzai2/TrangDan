import RecruitmentLayout from '@/Layouts/RecruitmentLayout';
import { Head, useForm, Link, usePage } from '@inertiajs/react';
import { 
    ChevronLeft, MapPin, Clock, Briefcase, 
    CheckCircle, FileText, Send, Sparkles, Phone, Home, Calendar, User as UserIcon,
    UploadCloud, X, FileDigit
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/Hooks/useTranslation';

export default function Show({ vacancy }) {
    const { auth } = usePage().props;
    const { __ } = useTranslation();

    // JSON-LD for Google Jobs
    const jobSchema = {
        "@context": "https://schema.org/",
        "@type": "JobPosting",
        "title": vacancy.title,
        "description": vacancy.description,
        "datePosted": vacancy.created_at,
        "validThrough": "2026-12-31T23:59:59Z",
        "employmentType": vacancy.type,
        "hiringOrganization": {
            "@type": "Organization",
            "name": "Almus Tech",
            "sameAs": "https://almus-tech.vn"
        },
        "jobLocation": {
            "@type": "Place",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": vacancy.location,
                "addressCountry": "VN"
            }
        },
        "baseSalary": vacancy.salary ? {
            "@type": "MonetaryAmount",
            "currency": "VND",
            "value": {
                "@type": "QuantitativeValue",
                "value": vacancy.salary,
                "unitText": "MONTH"
            }
        } : undefined
    };
    
    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        name: auth.user?.name || '',
        email: auth.user?.email || '',
        phone: '',
        address: '',
        age: '',
        start_date: '',
        cv: null,
        cover_letter: '',
    });

    const submit = (e) => {
        e.preventDefault();
        
        if (!auth.user) {
            window.location.href = '/login';
            return;
        }

        post(route('jobs.apply', vacancy.id), {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <RecruitmentLayout>
            <Head>
                <title>{`${vacancy.title} | Almus Tech`}</title>
                <script type="application/ld+json">
                    {JSON.stringify(jobSchema)}
                </script>
            </Head>

            <section className="pt-32 pb-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-12">
                        <Link 
                            href={route('jobs.index')}
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-[#006D7E] font-black text-[10px] uppercase tracking-[0.2em] transition"
                        >
                            <ChevronLeft className="h-4 w-4" /> {__('Jobs Back to List')}
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Job Content */}
                        <div className="lg:col-span-2 space-y-12">
                            <div className="bg-white dark:bg-slate-900 p-12 md:p-16 rounded-[60px] shadow-sm border border-white/50 dark:border-white/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-12 hidden md:block">
                                    <div className="h-20 w-20 bg-[#EEF8F9] dark:bg-[#002B33] rounded-[32px] flex items-center justify-center text-[#006D7E] text-4xl font-black italic shadow-inner">
                                        {vacancy.title.charAt(0)}
                                    </div>
                                </div>

                                <div className="max-w-2xl">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#EEF8F9] dark:bg-[#002B33] text-[#006D7E] rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-[#006D7E]/10">
                                        <Sparkles className="h-3 w-3 fill-current" /> {__('Jobs Badge Detail')}
                                    </div>
                                    <h1 className="text-5xl md:text-6xl font-black text-[#004D5C] dark:text-[#CCEBF0] tracking-tighter italic leading-none mb-10">
                                        {vacancy.title}
                                    </h1>
                                    
                                    <div className="flex flex-wrap gap-8 text-slate-400 font-bold text-sm italic mb-12">
                                        <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-[#006D7E]" /> {vacancy.location}</div>
                                        <div className="flex items-center gap-3"><Clock className="h-5 w-5 text-[#006D7E]" /> {vacancy.type}</div>
                                        <div className="flex items-center gap-3"><Briefcase className="h-5 w-5 text-[#006D7E]" /> {vacancy.salary || __('Jobs Salary Negotiable')}</div>
                                    </div>
                                </div>

                                <div className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:text-[#004D5C] dark:prose-headings:text-[#CCEBF0] prose-headings:font-black prose-headings:italic">
                                    <h3 className="text-2xl mb-6 tracking-tighter">{__('Jobs Desc Title')}</h3>
                                    {vacancy.description ? (
                                        <div 
                                            className="leading-loose mb-10 text-slate-700 dark:text-slate-300 font-medium"
                                            dangerouslySetInnerHTML={{ __html: vacancy.description }} 
                                        />
                                    ) : (
                                        <p className="leading-loose mb-10 text-slate-400">{__('Jobs Desc Placeholder')}</p>
                                    )}

                                    {vacancy.requirements && (
                                        <>
                                            <h3 className="text-2xl mb-6 tracking-tighter">{__('Jobs Requirements Title')}</h3>
                                            <div 
                                                className="leading-loose mb-10 text-slate-700 dark:text-slate-300 font-medium"
                                                dangerouslySetInnerHTML={{ __html: vacancy.requirements }} 
                                            />
                                        </>
                                    )}
                                    
                                    {vacancy.benefits && (
                                        <>
                                            <h3 className="text-2xl mb-6 tracking-tighter">{__('Jobs Benefits Title')}</h3>
                                            <div 
                                                className="leading-loose text-slate-700 dark:text-slate-300 font-medium"
                                                dangerouslySetInnerHTML={{ __html: vacancy.benefits }} 
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Application Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-32">
                                <div className="bg-[#004D5C] dark:bg-slate-900 p-10 rounded-[60px] shadow-2xl relative overflow-hidden text-white transition-colors duration-500">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                                    
                                    {!auth.user ? (
                                        <div className="text-center py-12 px-6">
                                            <div className="h-20 w-20 bg-white/10 rounded-[32px] flex items-center justify-center text-white mx-auto mb-8 shadow-xl border border-white/20">
                                                <UserIcon className="h-10 w-10" />
                                            </div>
                                            <h3 className="text-2xl font-black mb-4 tracking-tighter italic leading-tight">{__('Jobs Apply Login Hero')}</h3>
                                            <p className="text-white/60 font-medium italic mb-10 leading-relaxed text-sm">{__('Jobs Apply Login Desc')}</p>
                                            
                                            <div className="space-y-4">
                                                <Link 
                                                    href={route('login')}
                                                    className="w-full bg-white text-[#004D5C] py-5 rounded-[24px] font-black uppercase tracking-[0.2em] shadow-xl hover:translate-y-[-4px] transition flex items-center justify-center gap-3"
                                                >
                                                    {__('Jobs Apply Login Button')}
                                                </Link>
                                                <Link 
                                                    href={route('register')}
                                                    className="w-full bg-transparent border-2 border-white/20 text-white py-5 rounded-[24px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition flex items-center justify-center gap-3"
                                                >
                                                    {__('Jobs Apply Register Button')}
                                                </Link>
                                            </div>
                                        </div>
                                    ) : wasSuccessful ? (
                                        <div className="bg-white/10 p-8 rounded-[32px] text-center border border-white/20 animate-in zoom-in duration-500">
                                            <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center text-[#004D5C] mx-auto mb-6 shadow-xl">
                                                <CheckCircle className="h-8 w-8" />
                                            </div>
                                            <h3 className="text-xl font-black mb-2">{__('Jobs Apply Success Title')}</h3>
                                            <p className="text-white/60 text-sm font-medium italic">{__('Jobs Apply Success Desc')}</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={submit} className="space-y-4">
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 block opacity-60">{__('Jobs Apply Label Name')}</label>
                                                <input 
                                                    type="text" required
                                                    value={data.name}
                                                    onChange={e => setData('name', e.target.value)}
                                                    className="w-full bg-white/10 border border-white/20 rounded-2xl p-3.5 focus:ring-2 focus:ring-white/20 transition placeholder:text-white/20 font-bold text-sm"
                                                    placeholder="Nguyễn Văn A"
                                                />
                                                {errors.name && <div className="text-rose-400 text-[10px] mt-1 font-black">{errors.name}</div>}
                                            </div>

                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 block opacity-60">{__('Jobs Apply Label Age')}</label>
                                                <input 
                                                    type="number" required min="16" max="70"
                                                    value={data.age}
                                                    onChange={e => setData('age', e.target.value)}
                                                    className="w-full bg-white/10 border border-white/20 rounded-2xl p-3.5 focus:ring-2 focus:ring-white/20 transition placeholder:text-white/20 font-bold text-sm"
                                                    placeholder="25"
                                                />
                                                {errors.age && <div className="text-rose-400 text-[10px] mt-1 font-black">{errors.age}</div>}
                                            </div>

                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 block opacity-60">{__('Jobs Apply Label Email')}</label>
                                                <input 
                                                    type="email" required
                                                    value={data.email}
                                                    onChange={e => setData('email', e.target.value)}
                                                    className="w-full bg-white/10 border border-white/20 rounded-2xl p-3.5 focus:ring-2 focus:ring-white/20 transition placeholder:text-white/20 font-bold text-sm"
                                                    placeholder="example@email.com"
                                                />
                                                {errors.email && <div className="text-rose-400 text-[10px] mt-1 font-black">{errors.email}</div>}
                                            </div>

                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 block opacity-60">{__('Jobs Apply Label Phone')}</label>
                                                <input 
                                                    type="tel" required
                                                    value={data.phone}
                                                    onChange={e => setData('phone', e.target.value)}
                                                    pattern="^(0|84)(3|5|7|8|9)([0-9]{8})$"
                                                    title={__('Jobs Apply Phone Title')}
                                                    className="w-full bg-white/10 border border-white/20 rounded-2xl p-3.5 focus:ring-2 focus:ring-white/20 transition placeholder:text-white/20 font-bold text-sm"
                                                    placeholder={__('Jobs Apply Phone Placeholder')}
                                                />
                                                {errors.phone && <div className="text-rose-400 text-[10px] mt-1 font-black">{errors.phone}</div>}
                                            </div>

                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 block opacity-60">{__('Jobs Apply Label Address')}</label>
                                                <input 
                                                    type="text" required
                                                    value={data.address}
                                                    onChange={e => setData('address', e.target.value)}
                                                    className="w-full bg-white/10 border border-white/20 rounded-2xl p-3.5 focus:ring-2 focus:ring-white/20 transition placeholder:text-white/20 font-bold text-sm"
                                                    placeholder="TP. Hồ Chí Minh"
                                                />
                                                {errors.address && <div className="text-rose-400 text-[10px] mt-1 font-black">{errors.address}</div>}
                                            </div>

                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 block opacity-60">{__('Jobs Apply Label Start Date')}</label>
                                                <input 
                                                    type="date" required
                                                    value={data.start_date}
                                                    min={new Date().toISOString().split('T')[0]}
                                                    onChange={e => setData('start_date', e.target.value)}
                                                    className="w-full bg-white/10 border border-white/20 rounded-2xl p-3.5 font-bold text-sm text-white [color-scheme:dark]"
                                                />
                                                {errors.start_date && <div className="text-rose-400 text-[10px] mt-1 font-black">{errors.start_date}</div>}
                                            </div>

                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 block opacity-60">{__('Jobs Apply Label Cover Letter')}</label>
                                                <textarea 
                                                    value={data.cover_letter}
                                                    onChange={e => setData('cover_letter', e.target.value)}
                                                    className="w-full bg-white/10 border border-white/20 rounded-2xl p-3.5 h-24 focus:ring-2 focus:ring-white/20 transition placeholder:text-white/20 font-bold text-sm italic"
                                                    placeholder="..."
                                                ></textarea>
                                            </div>

                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 block opacity-60">{__('Jobs Apply Label CV')}</label>
                                                <div 
                                                    className={`relative group transition-all duration-500 rounded-[32px] overflow-hidden ${
                                                        data.cv ? 'bg-[#EEF8F9]/20 border-2 border-dashed border-[#006D7E]/30' : 'bg-white/5 border-2 border-dashed border-white/10 hover:border-white/30'
                                                    }`}
                                                    onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-[#006D7E]/50', 'bg-[#EEF8F9]/10'); }}
                                                    onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('border-[#006D7E]/50', 'bg-[#EEF8F9]/10'); }}
                                                    onDrop={(e) => {
                                                        e.preventDefault();
                                                        e.currentTarget.classList.remove('border-[#006D7E]/50', 'bg-[#EEF8F9]/10');
                                                        const file = e.dataTransfer.files[0];
                                                        if (file && (file.type === 'application/pdf' || file.name.match(/\.(doc|docx)$/i))) {
                                                            setData('cv', file);
                                                        }
                                                    }}
                                                >
                                                    <input 
                                                        type="file"
                                                        accept=".pdf,.doc,.docx"
                                                        onChange={e => setData('cv', e.target.files[0])}
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                    />
                                                    
                                                    {!data.cv ? (
                                                        <div className="p-8 flex flex-col items-center justify-center text-center gap-4">
                                                            <div className="h-16 w-16 bg-white/5 rounded-[24px] flex items-center justify-center text-white/40 group-hover:text-white group-hover:bg-[#006D7E] transition-all duration-500">
                                                                <UploadCloud className="h-8 w-8" />
                                                            </div>
                                                            <div>
                                                                <p className="text-white font-bold text-sm tracking-tight mb-1">{__('Jobs Apply CV Click or Drag')}</p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="p-6 flex items-center gap-5 relative z-20">
                                                            <div className="h-14 w-14 bg-[#004D5C] rounded-2xl flex items-center justify-center text-white shadow-xl">
                                                                <FileDigit className="h-7 w-7" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-white font-black text-sm truncate pr-8 italic">{data.cv.name}</p>
                                                            </div>
                                                            <button 
                                                                type="button"
                                                                onClick={(e) => { e.preventDefault(); setData('cv', null); }}
                                                                className="h-10 w-10 bg-rose-500/20 hover:bg-rose-500 text-rose-500 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300"
                                                            >
                                                                <X className="h-5 w-5" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                                {errors.cv && <div className="text-rose-400 text-[10px] mt-2 font-black italic">⚠️ {errors.cv}</div>}
                                            </div>
                                            
                                            <button 
                                                type="submit"
                                                disabled={processing}
                                                className="w-full bg-white text-[#004D5C] py-5 rounded-[24px] font-black uppercase tracking-[0.2em] shadow-xl hover:translate-y-[-4px] active:scale-95 transition flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                                            >
                                                <Send className="h-5 w-5" /> {processing ? __('Jobs Apply Button Sending') : __('Jobs Apply Button Send')}
                                            </button>

                                            {Object.keys(errors).length > 0 && (
                                                <div className="bg-rose-500/20 border border-rose-500/50 p-4 rounded-2xl text-[10px] text-white font-bold italic text-center">
                                                    {__('Jobs Apply Error Check')}
                                                </div>
                                            )}
                                        </form>
                                    )}
                                </div>

                                <div className="mt-10 p-10 bg-white dark:bg-slate-900 rounded-[40px] shadow-sm border border-slate-100 dark:border-white/5 flex items-center gap-6 transition-colors duration-500">
                                    <div className="h-12 w-12 bg-[#EEF8F9] dark:bg-[#002B33] rounded-2xl flex items-center justify-center text-[#006D7E]">
                                        <FileText className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{__('Jobs Division Title')}</div>
                                        <div className="text-lg font-black text-[#004D5C] dark:text-[#CCEBF0] italic">{__('Jobs Division Sub')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </RecruitmentLayout>
    );
}
