import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { 
    Building, History, Target, Eye, MapPin, 
    Mail, Phone, Save, Upload, Sparkles, Check,
    Briefcase, Banknote, Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/Hooks/useTranslation';

export default function CompanyInfo({ info }) {
    const { __ } = useTranslation();
    const { data, setData, post, processing, wasSuccessful, errors } = useForm({
        _method: 'POST',
        name: info.name || '',
        history: info.history || '',
        mission: info.mission || '',
        vision: info.vision || '',
        address: info.address || '',
        email: info.email || '',
        phone: info.phone || '',
        general_job_description: info.general_job_description || '',
        salary_range: info.salary_range || '',
        benefits: info.benefits || '',
        logo: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.company.update'), {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout>
            <Head title={__('Admin Company Title')} />
            
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center mb-10"
            >
                <div>
                    <h1 className="text-4xl font-black text-[#004D5C] dark:text-white tracking-tighter mb-2 italic uppercase transition-colors">{__('Admin Company Profile')}</h1>
                    <p className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest text-[10px]">{__('Admin Company Note')}</p>
                </div>
                
                <AnimatePresence>
                    {wasSuccessful && (
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] border border-emerald-100 dark:border-emerald-800/30 flex items-center gap-2 shadow-lg transition-colors"
                        >
                            <Sparkles className="h-4 w-4" /> {__('Admin Update Success')}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10">
                    {/* Basic Info */}
                    <Section title={__('Admin Basic Info')} icon={<Building className="h-4 w-4 text-[#006D7E] dark:text-[#CCEBF0]" />}>
                        <div className="grid grid-cols-1 gap-10">
                            <InputField 
                                label={__('Admin Company Name')} 
                                value={data.name} 
                                onChange={e => setData('name', e.target.value)}
                                error={errors.name}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <InputField 
                                    label={__('Staff Email Label')} 
                                    type="email" 
                                    value={data.email} 
                                    onChange={e => setData('email', e.target.value)}
                                    error={errors.email}
                                />
                                <InputField 
                                    label={__('Staff Phone Label')} 
                                    value={data.phone} 
                                    onChange={e => setData('phone', e.target.value)}
                                    error={errors.phone}
                                />
                            </div>
                            <InputField 
                                label={__('Admin Headquarter')} 
                                value={data.address} 
                                onChange={e => setData('address', e.target.value)}
                                error={errors.address}
                                icon={<MapPin className="h-4 w-4" />}
                            />
                        </div>
                    </Section>

                    {/* Content Section */}
                    <Section title={__('Admin Introduction')} icon={<History className="h-4 w-4 text-[#006D7E] dark:text-[#CCEBF0]" />}>
                        <div className="space-y-10">
                            <TextAreaField 
                                label={__('Admin History')} 
                                value={data.history} 
                                onChange={e => setData('history', e.target.value)}
                                error={errors.history}
                                icon={<History className="h-4 w-4" />}
                            />
                            <TextAreaField 
                                label={__('Admin General Job')} 
                                value={data.general_job_description} 
                                onChange={e => setData('general_job_description', e.target.value)}
                                error={errors.general_job_description}
                                icon={<Briefcase className="h-4 w-4" />}
                                placeholder="Tham gia sản xuất, lắp ráp phụ kiện điện tử hoặc làm việc tại văn phòng"
                                helperText="Gợi ý: Tham gia sản xuất, lắp ráp phụ kiện điện tử hoặc làm việc tại văn phòng"
                            />
                            <InputField 
                                label={__('Admin Salary Range')} 
                                value={data.salary_range} 
                                onChange={e => setData('salary_range', e.target.value)}
                                error={errors.salary_range}
                                icon={<Banknote className="h-4 w-4" />}
                                placeholder="7-20 triệu/tháng (tuỳ vị trí) + thưởng + phụ cấp"
                                helperText="Gợi ý: 7-20 triệu/tháng (tuỳ vị trí) + thưởng + phụ cấp"
                            />
                            <TextAreaField 
                                label={__('Admin General Benefits')} 
                                value={data.benefits} 
                                onChange={e => setData('benefits', e.target.value)}
                                error={errors.benefits}
                                icon={<Heart className="h-4 w-4 text-rose-500" />}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <TextAreaField 
                                    label={__('Admin Mission') + " (Môi trường làm việc)"} 
                                    value={data.mission} 
                                    onChange={e => setData('mission', e.target.value)}
                                    error={errors.mission}
                                    icon={<Target className="h-4 w-4" />}
                                    placeholder="Tại Almus Tech, bạn sẽ được làm việc trong môi trường trẻ trung..."
                                    helperText="Gợi ý: Tại Almus Tech, bạn sẽ được làm việc trong môi trường trẻ trung, thân thiện, được đào tạo từ đầu (đối với người chưa có kinh nghiệm) và có lộ trình phát triển rõ ràng. Đây là cơ hội phù hợp cho những ai muốn gắn bó lâu dài và nâng cao kỹ năng."
                                />
                                <TextAreaField 
                                    label={__('Admin Vision')} 
                                    value={data.vision} 
                                    onChange={e => setData('vision', e.target.value)}
                                    error={errors.vision}
                                    icon={<Eye className="h-4 w-4" />}
                                />
                            </div>
                        </div>
                    </Section>
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-32 space-y-10">
                        {/* Logo Upload */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white dark:bg-slate-900 p-10 rounded-[50px] shadow-sm border border-white/50 dark:border-white/5 text-center transition-colors"
                        >
                            <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-600 tracking-[0.3em] uppercase mb-8">{__('Admin Logo Company')}</h3>
                            <div className="relative group mx-auto w-40 h-40 mb-8">
                                <div className="absolute inset-0 bg-[#006D7E]/5 dark:bg-white/5 rounded-3xl blur-2xl group-hover:bg-[#006D7E]/10 transition-all duration-500"></div>
                                <div className="relative w-full h-full bg-[#F3F7F8] dark:bg-slate-800 rounded-[40px] border-4 border-white dark:border-slate-800 shadow-xl flex items-center justify-center overflow-hidden group-hover:scale-105 transition-all duration-500">
                                    {info.logo ? (
                                        <img src={`/storage/${info.logo}`} alt="Logo" className="w-full h-full object-contain p-4" />
                                    ) : (
                                        <Building className="h-16 w-16 text-slate-200 dark:text-slate-700" />
                                    )}
                                </div>
                                <label className="absolute -bottom-4 -right-4 h-12 w-12 bg-[#004D5C] dark:bg-slate-700 text-white rounded-2xl flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 active:scale-95 transition-all">
                                    <Upload className="h-5 w-5" />
                                    <input type="file" className="hidden" onChange={e => setData('logo', e.target.files[0])} />
                                </label>
                            </div>
                            <p className="text-[9px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest leading-relaxed">
                                {__('Admin Logo Note')}
                            </p>
                            {errors.logo && <div className="text-rose-500 text-[9px] font-black mt-2 uppercase">{errors.logo}</div>}
                        </motion.div>

                        {/* Save Actions */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-[#004D5C] dark:bg-slate-800 p-10 rounded-[50px] shadow-2xl relative overflow-hidden text-white transition-colors"
                        >
                            <h2 className="text-3xl font-black italic mb-4 tracking-tighter">{__('Staff Save Changes')}</h2>
                            <p className="text-white/50 text-[10px] font-black uppercase tracking-widest mb-10 leading-relaxed">
                                {__('Admin Save Note')}
                            </p>
                            <motion.button 
                                onClick={submit}
                                disabled={processing}
                                whileHover={{ scale: 1.02, y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-white dark:bg-[#CCEBF0] text-[#004D5C] dark:text-slate-900 py-6 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-[11px]"
                            >
                                {processing ? (
                                    <div className="h-5 w-5 border-2 border-[#004D5C]/30 border-t-[#004D5C] rounded-full animate-spin"></div>
                                ) : (
                                    <Check className="h-5 w-5" />
                                )}
                                {__('Admin Update Button')}
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}

function Section({ title, icon, children }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 p-12 rounded-[50px] shadow-sm border border-white/50 dark:border-white/5 relative overflow-hidden transition-colors"
        >
            <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-600 tracking-[0.3em] uppercase mb-10 flex items-center gap-3 transition-colors">
                {icon} {title}
            </h3>
            <div className="relative z-10 font-bold dark:text-slate-300">
                {children}
            </div>
        </motion.div>
    );
}

function InputField({ label, value, onChange, error, type = "text", icon, placeholder, helperText }) {
    return (
        <div className="space-y-4">
            <label className="text-[10px] font-black text-[#004D5C] dark:text-white uppercase tracking-[0.2em] block ml-2 flex items-center gap-2 transition-colors">
                {icon} {label}
            </label>
            <input 
                type={type} 
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full bg-[#F3F7F8] dark:bg-slate-800 border-none rounded-[24px] p-6 text-sm font-black text-[#004D5C] dark:text-white focus:ring-4 focus:ring-[#006D7E]/10 transition-all shadow-inner italic ${error ? 'ring-2 ring-rose-500/20' : ''}`}
            />
            {helperText && <p className="text-[10px] text-slate-400 italic ml-4 leading-relaxed">{helperText}</p>}
            {error && <div className="text-rose-500 text-[10px] font-black uppercase tracking-widest ml-4">{error}</div>}
        </div>
    );
}

function TextAreaField({ label, value, onChange, error, icon, placeholder, helperText }) {
    return (
        <div className="space-y-4">
            <label className="text-[10px] font-black text-[#004D5C] dark:text-white uppercase tracking-[0.2em] block ml-2 flex items-center gap-2 transition-colors">
                {icon} {label}
            </label>
            <textarea 
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={4}
                className={`w-full bg-[#F3F7F8] dark:bg-slate-800 border-none rounded-[32px] p-8 text-sm font-black text-[#004D5C] dark:text-white focus:ring-4 focus:ring-[#006D7E]/10 transition-all shadow-inner italic leading-relaxed ${error ? 'ring-2 ring-rose-500/20' : ''}`}
            />
            {helperText && <p className="text-[10px] text-slate-400 italic ml-4 leading-relaxed">{helperText}</p>}
            {error && <div className="text-rose-500 text-[10px] font-black uppercase tracking-widest ml-4">{error}</div>}
        </div>
    );
}
