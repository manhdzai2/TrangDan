import RecruitmentLayout from '@/Layouts/RecruitmentLayout';
import { Head, useForm, Link, usePage } from '@inertiajs/react';
import { 
    ChevronLeft, MapPin, Clock, Briefcase, 
    CheckCircle, FileText, Send, Sparkles, Phone, Home, Calendar, User as UserIcon
} from 'lucide-react';

export default function Show({ vacancy }) {
    const { auth, translations } = usePage().props;
    const __ = (key) => translations[key] || key;

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
            // Lưu URL để redirect về sau khi đăng nhập
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
                            <ChevronLeft className="h-4 w-4" /> QUAY LẠI DANH SÁCH
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
                                        <Sparkles className="h-3 w-3 fill-current" /> TUYỂN DỤNG 2026
                                    </div>
                                    <h1 className="text-5xl md:text-6xl font-black text-[#004D5C] dark:text-[#CCEBF0] tracking-tighter italic leading-none mb-10">
                                        {vacancy.title}
                                    </h1>
                                    
                                    <div className="flex flex-wrap gap-8 text-slate-400 font-bold text-sm italic mb-12">
                                        <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-[#006D7E]" /> {vacancy.location}</div>
                                        <div className="flex items-center gap-3"><Clock className="h-5 w-5 text-[#006D7E]" /> {vacancy.type}</div>
                                        <div className="flex items-center gap-3"><Briefcase className="h-5 w-5 text-[#006D7E]" /> {vacancy.salary || 'Thỏa thuận'}</div>
                                    </div>
                                </div>

                                <div className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:text-[#004D5C] dark:prose-headings:text-[#CCEBF0] prose-headings:font-black prose-headings:italic">
                                    <h3 className="text-2xl mb-6 tracking-tighter">Mô tả công việc</h3>
                                    {vacancy.description ? (
                                        <div 
                                            className="leading-loose mb-10 text-slate-700 dark:text-slate-300 font-medium"
                                            dangerouslySetInnerHTML={{ __html: vacancy.description }} 
                                        />
                                    ) : (
                                        <p className="leading-loose mb-10 text-slate-400">Chúng tôi đang tìm kiếm một tài năng đam mê để gia nhập đội ngũ Almus Tech...</p>
                                    )}

                                    {vacancy.requirements && (
                                        <>
                                            <h3 className="text-2xl mb-6 tracking-tighter">Yêu cầu ứng viên</h3>
                                            <div 
                                                className="leading-loose mb-10 text-slate-700 dark:text-slate-300 font-medium"
                                                dangerouslySetInnerHTML={{ __html: vacancy.requirements }} 
                                            />
                                        </>
                                    )}
                                    
                                    {vacancy.benefits && (
                                        <>
                                            <h3 className="text-2xl mb-6 tracking-tighter">Quyền lợi</h3>
                                            <div 
                                                className="leading-loose text-slate-700 dark:text-slate-300 font-medium"
                                                dangerouslySetInnerHTML={{ __html: vacancy.benefits }} 
                                            />
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Quy trình tuyển dụng */}
                            {vacancy.recruitment_process && (
                                <div className="bg-[#004D5C] p-12 md:p-16 rounded-[60px] shadow-xl text-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                                    <div className="relative z-10">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-white/20">
                                            <Sparkles className="h-3 w-3" /> QUY TRÌNH TUYỂN DỤNG
                                        </div>
                                        <h3 className="text-3xl font-black italic tracking-tighter mb-8">Các bước tiếp theo</h3>
                                        <div 
                                            className="leading-loose text-white/70 font-medium italic"
                                            dangerouslySetInnerHTML={{ __html: vacancy.recruitment_process }} 
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Application Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-32">
                                <div className="bg-[#004D5C] dark:bg-slate-900 p-10 rounded-[60px] shadow-2xl relative overflow-hidden text-white transition-colors duration-500">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                                    
                                    {!auth.user && (
                                        <div className="bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[10px] font-black uppercase tracking-widest px-4 py-3 rounded-2xl mb-8 text-center relative z-10">
                                            Bạn cần <Link href="/login" className="underline hover:text-white">đăng nhập</Link> để nộp hồ sơ
                                        </div>
                                    )}

                                    {wasSuccessful ? (
                                        <div className="bg-white/10 p-8 rounded-[32px] text-center border border-white/20 animate-in zoom-in duration-500">
                                            <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center text-[#004D5C] mx-auto mb-6 shadow-xl">
                                                <CheckCircle className="h-8 w-8" />
                                            </div>
                                            <h3 className="text-xl font-black mb-2">Gửi hồ sơ thành công!</h3>
                                            <p className="text-white/60 text-sm font-medium italic">Chúng tôi sẽ liên hệ với bạn trong vòng 2-3 ngày làm việc.</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={submit} className="space-y-4">
                                            {/* Họ và tên */}
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 block opacity-60">Họ và tên *</label>
                                                <input 
                                                    type="text"
                                                    required
                                                    value={data.name}
                                                    onChange={e => setData('name', e.target.value)}
                                                    className="w-full bg-white/10 border border-white/20 rounded-2xl p-3.5 focus:ring-2 focus:ring-white/20 transition placeholder:text-white/20 font-bold text-sm"
                                                    placeholder="Nguyễn Văn A"
                                                />
                                                {errors.name && <div className="text-rose-400 text-[10px] mt-1 font-black">{errors.name}</div>}
                                            </div>

                                            {/* Tuổi */}
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 block opacity-60">Tuổi *</label>
                                                <input 
                                                    type="number"
                                                    required
                                                    min="16" max="70"
                                                    value={data.age}
                                                    onChange={e => setData('age', e.target.value)}
                                                    className="w-full bg-white/10 border border-white/20 rounded-2xl p-3.5 focus:ring-2 focus:ring-white/20 transition placeholder:text-white/20 font-bold text-sm"
                                                    placeholder="25"
                                                />
                                                {errors.age && <div className="text-rose-400 text-[10px] mt-1 font-black">{errors.age}</div>}
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 block opacity-60">Email liên hệ *</label>
                                                <input 
                                                    type="email"
                                                    required
                                                    value={data.email}
                                                    onChange={e => setData('email', e.target.value)}
                                                    className="w-full bg-white/10 border border-white/20 rounded-2xl p-3.5 focus:ring-2 focus:ring-white/20 transition placeholder:text-white/20 font-bold text-sm"
                                                    placeholder="example@email.com"
                                                />
                                                {errors.email && <div className="text-rose-400 text-[10px] mt-1 font-black">{errors.email}</div>}
                                            </div>

                                            {/* Số điện thoại */}
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 block opacity-60">Số điện thoại *</label>
                                                <input 
                                                    type="tel"
                                                    required
                                                    value={data.phone}
                                                    onChange={e => setData('phone', e.target.value)}
                                                    className="w-full bg-white/10 border border-white/20 rounded-2xl p-3.5 focus:ring-2 focus:ring-white/20 transition placeholder:text-white/20 font-bold text-sm"
                                                    placeholder="0901 234 567"
                                                />
                                                {errors.phone && <div className="text-rose-400 text-[10px] mt-1 font-black">{errors.phone}</div>}
                                            </div>

                                            {/* Địa chỉ */}
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 block opacity-60">Địa chỉ *</label>
                                                <input 
                                                    type="text"
                                                    required
                                                    value={data.address}
                                                    onChange={e => setData('address', e.target.value)}
                                                    className="w-full bg-white/10 border border-white/20 rounded-2xl p-3.5 focus:ring-2 focus:ring-white/20 transition placeholder:text-white/20 font-bold text-sm"
                                                    placeholder="TP. Hồ Chí Minh"
                                                />
                                                {errors.address && <div className="text-rose-400 text-[10px] mt-1 font-black">{errors.address}</div>}
                                            </div>

                                            {/* Vị trí ứng tuyển (readonly) */}
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 block opacity-60">Vị trí ứng tuyển</label>
                                                <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-3.5 font-bold text-sm text-white/70 italic">
                                                    {vacancy.title}
                                                </div>
                                            </div>

                                            {/* Ngày có thể đi làm */}
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 block opacity-60">Ngày có thể bắt đầu *</label>
                                                <input 
                                                    type="date"
                                                    required
                                                    value={data.start_date}
                                                    min={new Date().toISOString().split('T')[0]}
                                                    onChange={e => setData('start_date', e.target.value)}
                                                    className="w-full bg-white/10 border border-white/20 rounded-2xl p-3.5 focus:ring-2 focus:ring-white/20 transition font-bold text-sm text-white [color-scheme:dark]"
                                                />
                                                {errors.start_date && <div className="text-rose-400 text-[10px] mt-1 font-black">{errors.start_date}</div>}
                                            </div>

                                            {/* Thư giới thiệu */}
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 block opacity-60">Thư giới thiệu</label>
                                                <textarea 
                                                    value={data.cover_letter}
                                                    onChange={e => setData('cover_letter', e.target.value)}
                                                    className="w-full bg-white/10 border border-white/20 rounded-2xl p-3.5 h-24 focus:ring-2 focus:ring-white/20 transition placeholder:text-white/20 font-bold text-sm italic"
                                                    placeholder="Hãy cho chúng tôi biết tại sao bạn là lựa chọn phù hợp..."
                                                ></textarea>
                                                {errors.cover_letter && <div className="text-rose-400 text-[10px] mt-1 font-black">{errors.cover_letter}</div>}
                                            </div>

                                            {/* CV */}
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 block opacity-60">Hồ sơ CV (PDF)</label>
                                                <input 
                                                    type="file"
                                                    accept=".pdf,.doc,.docx"
                                                    onChange={e => setData('cv', e.target.files[0])}
                                                    className="w-full text-xs text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer"
                                                />
                                                {errors.cv && <div className="text-rose-400 text-[10px] mt-1 font-black">{errors.cv}</div>}
                                            </div>
                                            
                                            <button 
                                                type="submit"
                                                disabled={processing || !auth.user}
                                                className="w-full bg-white text-[#004D5C] py-5 rounded-[24px] font-black uppercase tracking-[0.2em] shadow-xl hover:translate-y-[-4px] active:scale-95 transition flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                                            >
                                                <Send className="h-5 w-5" /> {processing ? 'ĐANG GỬI...' : 'GỬI HỒ SƠ'}
                                            </button>

                                            {Object.keys(errors).length > 0 && (
                                                <div className="bg-rose-500/20 border border-rose-500/50 p-4 rounded-2xl text-[10px] text-white font-bold italic text-center">
                                                    Vui lòng kiểm tra lại thông tin hồ sơ của bạn.
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
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tuyển dụng</div>
                                        <div className="text-lg font-black text-[#004D5C] dark:text-[#CCEBF0] italic">HR Division - Almus Tech</div>
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
