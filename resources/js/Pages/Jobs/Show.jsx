import RecruitmentLayout from '@/Layouts/RecruitmentLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { 
    ChevronLeft, MapPin, Clock, Briefcase, 
    CheckCircle, FileText, Send, Sparkles 
} from 'lucide-react';

export default function Show({ vacancy }) {
    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        name: '',
        email: '',
        resume: null,
        cover_letter: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('jobs.apply', vacancy.id), {
            onSuccess: () => reset(),
        });
    };

    return (
        <RecruitmentLayout>
            <Head title={`${vacancy.title} | AMT SOLUTIONS`} />

            <section className="pt-32 pb-20 bg-slate-50 relative overflow-hidden">
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
                            <div className="bg-white p-12 md:p-16 rounded-[60px] shadow-sm border border-white/50 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-12 hidden md:block">
                                    <div className="h-20 w-20 bg-[#EEF8F9] rounded-[32px] flex items-center justify-center text-[#006D7E] text-4xl font-black italic shadow-inner">
                                        {vacancy.title.charAt(0)}
                                    </div>
                                </div>

                                <div className="max-w-2xl">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#EEF8F9] text-[#006D7E] rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-[#006D7E]/10">
                                        <Sparkles className="h-3 w-3 fill-current" /> TUYỂN DỤNG 2026
                                    </div>
                                    <h1 className="text-5xl md:text-6xl font-black text-[#004D5C] tracking-tighter italic leading-none mb-10">
                                        {vacancy.title}
                                    </h1>
                                    
                                    <div className="flex flex-wrap gap-8 text-slate-400 font-bold text-sm italic mb-12">
                                        <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-[#006D7E]" /> {vacancy.location}</div>
                                        <div className="flex items-center gap-3"><Clock className="h-5 w-5 text-[#006D7E]" /> {vacancy.type}</div>
                                        <div className="flex items-center gap-3"><Briefcase className="h-5 w-5 text-[#006D7E]" /> {vacancy.salary || 'Thỏa thuận'}</div>
                                    </div>
                                </div>

                                <div className="prose prose-slate prose-lg max-w-none prose-headings:text-[#004D5C] prose-headings:font-black prose-headings:italic prose-p:text-slate-500 prose-p:italic prose-p:font-medium">
                                    <h3 className="text-2xl mb-6">Mô tả công việc</h3>
                                    <p className="whitespace-pre-wrap leading-loose mb-10">
                                        {vacancy.description || 'Chúng tôi đang tìm kiếm một tài năng đam mê để gia nhập đội ngũ AMT. Bạn sẽ tham gia vào các dự án quy mô lớn, áp dụng các công nghệ tiên tiến nhất để giải quyết những bài toán hóc búa...'}
                                    </p>

                                    <h3 className="text-2xl mb-6">Yêu cầu ứng viên</h3>
                                    <p className="whitespace-pre-wrap leading-loose mb-10">
                                        {vacancy.requirements || '- Tối thiểu 2 năm kinh nghiệm trong lĩnh vực liên quan.\n- Tư duy giải quyết vấn đề tốt.\n- Khả năng làm việc nhóm và chịu được áp lực cao.'}
                                    </p>
                                    
                                    <h3 className="text-2xl mb-6">Quyền lợi</h3>
                                    <p className="whitespace-pre-wrap leading-loose">
                                        {vacancy.benefits || '- Lương thưởng cạnh tranh theo năng lực.\n- Môi trường làm việc hiện đại, chuyên nghiệp.\n- Bảo hiểm cao cấp và các khóa đào tạo chuyên sâu.'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Application Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-32">
                                <div className="bg-[#004D5C] p-12 rounded-[60px] shadow-2xl relative overflow-hidden text-white">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                                    
                                    <h2 className="text-3xl font-black italic mb-8 tracking-tighter">Đăng ký ngay</h2>

                                    {wasSuccessful ? (
                                        <div className="bg-white/10 p-8 rounded-[32px] text-center border border-white/20 animate-in zoom-in duration-500">
                                            <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center text-[#004D5C] mx-auto mb-6 shadow-xl">
                                                <CheckCircle className="h-8 w-8" />
                                            </div>
                                            <h3 className="text-xl font-black mb-2">Gửi hồ sơ thành công!</h3>
                                            <p className="text-white/60 text-sm font-medium italic">Chúng tôi sẽ liên hệ với bạn trong vòng 2-3 ngày làm việc.</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={submit} className="space-y-6">
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 block opacity-60">Họ và tên</label>
                                                <input 
                                                    type="text" 
                                                    required
                                                    value={data.name}
                                                    onChange={e => setData('name', e.target.value)}
                                                    className="w-full bg-white/10 border-white/20 rounded-2xl p-4 focus:ring-4 focus:ring-white/10 transition placeholder:text-white/20 font-bold"
                                                    placeholder="Nguyễn Văn A"
                                                />
                                                {errors.name && <div className="text-rose-400 text-[10px] mt-1 font-black">{errors.name}</div>}
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 block opacity-60">Email liên hệ</label>
                                                <input 
                                                    type="email" 
                                                    required
                                                    value={data.email}
                                                    onChange={e => setData('email', e.target.value)}
                                                    className="w-full bg-white/10 border-white/20 rounded-2xl p-4 focus:ring-4 focus:ring-white/10 transition placeholder:text-white/20 font-bold"
                                                    placeholder="example@email.com"
                                                />
                                                {errors.email && <div className="text-rose-400 text-[10px] mt-1 font-black">{errors.email}</div>}
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 block opacity-60">Thư giới thiệu</label>
                                                <textarea 
                                                    value={data.cover_letter}
                                                    onChange={e => setData('cover_letter', e.target.value)}
                                                    className="w-full bg-white/10 border-white/20 rounded-2xl p-4 h-32 focus:ring-4 focus:ring-white/10 transition placeholder:text-white/20 font-bold text-sm italic"
                                                    placeholder="Hãy cho chúng tôi biết tại sao bạn là mảnh ghép hoàn hảo..."
                                                ></textarea>
                                            </div>
                                            
                                            <button 
                                                disabled={processing}
                                                className="w-full bg-white text-[#004D5C] py-6 rounded-[24px] font-black uppercase tracking-[0.2em] shadow-xl hover:translate-y-[-4px] active:scale-95 transition flex items-center justify-center gap-3 disabled:opacity-50"
                                            >
                                                <Send className="h-5 w-5" /> GỬI HỒ SƠ CỦA BẠN
                                            </button>
                                        </form>
                                    )}
                                </div>

                                <div className="mt-10 p-10 bg-white rounded-[40px] shadow-sm border border-slate-100 flex items-center gap-6">
                                    <div className="h-12 w-12 bg-[#EEF8F9] rounded-2xl flex items-center justify-center text-[#006D7E]">
                                        <FileText className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tuyển dụng</div>
                                        <div className="text-lg font-black text-[#004D5C] italic">HR Division - AMT</div>
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
