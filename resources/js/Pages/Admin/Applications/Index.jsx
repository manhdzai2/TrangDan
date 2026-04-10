import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Search, Filter, Eye, CheckCircle, XCircle, Clock, Download, X, Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Index({ applications }) {
    const [selectedApp, setSelectedApp] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const openDetails = (app) => {
        setSelectedApp(app);
        setShowModal(true);
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

    const mapStatusClass = (status) => {
        switch(status) {
            case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'reviewed': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
            case 'accepted': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'rejected': return 'bg-rose-50 text-rose-600 border-rose-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    const mapStatusText = (status) => {
        switch(status) {
            case 'pending': return 'Chờ duyệt';
            case 'reviewed': return 'Đã xem';
            case 'accepted': return 'Đã tuyển';
            case 'rejected': return 'Từ chối';
            default: return status;
        }
    };

    return (
        <AdminLayout>
            <Head title="Quản lý Hồ sơ ứng viên" />
            
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center mb-10"
            >
                <div>
                    <h1 className="text-4xl font-black text-[#004D5C] tracking-tighter mb-2 italic">Hồ sơ ứng viên</h1>
                    <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Theo dõi và đánh giá tiến trình của các ứng viên</p>
                </div>
                <motion.button 
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white border border-slate-100 text-[#004D5C] font-black py-4 px-8 rounded-2xl flex items-center gap-2 shadow-2xl shadow-slate-200/50 transition-all group"
                >
                    <Download className="h-5 w-5 group-hover:translate-y-1 transition-transform" /> XUẤT BÁO CÁO
                </motion.button>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-[40px] shadow-sm border border-white/50 overflow-hidden mb-12"
            >
                <div className="p-8 border-b border-slate-50 flex gap-6 bg-slate-50/20">
                    <div className="relative flex-1">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                        <input 
                            type="text" 
                            placeholder="Tìm kiếm ứng viên, công việc..." 
                            className="w-full bg-white border-none rounded-2xl pl-16 pr-6 py-4 text-[11px] font-black uppercase tracking-wider focus:ring-2 focus:ring-[#006D7E] transition-all shadow-sm text-[#004D5C] placeholder:text-slate-300" 
                        />
                    </div>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-5 bg-white rounded-2xl text-slate-400 hover:text-[#004D5C] transition-all shadow-sm border border-slate-100"
                    >
                        <Filter className="h-6 w-6" />
                    </motion.button>
                </div>

                <div className="overflow-x-auto px-6 pb-6 pt-2">
                    <table className="w-full text-left border-separate border-spacing-y-4">
                        <thead>
                            <tr className="text-slate-300 text-[10px] font-black uppercase tracking-[0.3em]">
                                <th className="px-10 py-4">Ứng viên & Nguồn</th>
                                <th className="px-10 py-4">Vị trí ứng tuyển</th>
                                <th className="px-10 py-4">Ngày nộp</th>
                                <th className="px-10 py-4 text-center">Trạng thái</th>
                                <th className="px-10 py-4 text-right pr-12">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app, index) => (
                                <motion.tr 
                                    key={app.id} 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="hover:bg-[#F3F7F8]/80 transition duration-500 group cursor-default"
                                >
                                    <td className="px-10 py-6 rounded-l-[32px] bg-white group-hover:bg-transparent transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 bg-[#EEF8F9] rounded-2xl flex items-center justify-center text-[#006D7E] font-black group-hover:bg-[#004D5C] group-hover:text-white transition-all duration-500 text-lg shadow-inner border border-[#006D7E]/5">
                                                {app.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-black text-[#004D5C] tracking-tight mb-1.5 italic transition-colors group-hover:text-[#004D5C]">{app.name}</div>
                                                <div className="text-[9px] text-slate-300 font-black tracking-widest uppercase">{app.source || 'Trực tiếp'} • {app.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-6 bg-white group-hover:bg-transparent transition-colors">
                                        <div className="text-[#004D5C] font-black text-sm italic">{app.vacancy?.title || 'N/A'}</div>
                                        <div className="text-[9px] text-slate-300 font-black uppercase tracking-widest mt-1">ID: APP-{100 + app.id}</div>
                                    </td>
                                    <td className="px-10 py-6 text-slate-400 text-[10px] font-black tracking-widest uppercase bg-white group-hover:bg-transparent transition-colors">
                                        {new Date(app.created_at).toLocaleDateString('vi-VN')}
                                    </td>
                                    <td className="px-10 py-6 text-center bg-white group-hover:bg-transparent transition-colors">
                                        <span className={`inline-flex px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm border ${mapStatusClass(app.status)}`}>
                                            {mapStatusText(app.status)}
                                        </span>
                                    </td>
                                    <td className="px-10 py-6 rounded-r-[32px] text-right pr-12 bg-white group-hover:bg-transparent transition-colors">
                                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                                            <motion.button 
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => openDetails(app)}
                                                className="p-3 text-slate-300 hover:text-[#006D7E] hover:bg-[#EEF8F9] rounded-2xl transition-all shadow-sm bg-white border border-slate-50"
                                            >
                                                <Eye className="h-5 w-5" />
                                            </motion.button>
                                            <motion.button 
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => {
                                                    if (confirm('Chấp nhận ứng viên này?')) {
                                                        updateStatus(app.id, 'accepted');
                                                    }
                                                }}
                                                className="p-3 text-slate-300 hover:text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all shadow-sm bg-white border border-slate-50"
                                            >
                                                <CheckCircle className="h-5 w-5" />
                                            </motion.button>
                                            <motion.button 
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => {
                                                    if (confirm('Từ chối ứng viên này?')) {
                                                        updateStatus(app.id, 'rejected');
                                                    }
                                                }}
                                                className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all shadow-sm bg-white border border-slate-50"
                                            >
                                                <XCircle className="h-5 w-5" />
                                            </motion.button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
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
                            className="absolute inset-0 bg-[#004D5C]/60 backdrop-blur-md" 
                            onClick={() => setShowModal(false)}
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-white rounded-[40px] w-full max-w-4xl relative z-10 shadow-2xl overflow-hidden flex flex-col md:flex-row h-[85vh] md:h-[80vh]"
                        >
                            {/* Left Panel: Profile */}
                            <div className="w-full md:w-80 bg-slate-50 p-10 flex flex-col border-r border-slate-100">
                                <div className="text-center mb-10">
                                    <div className="h-24 w-24 bg-[#004D5C] text-white rounded-[32px] flex items-center justify-center text-4xl font-black mx-auto mb-6 shadow-2xl shadow-[#004d5c]/20 italic">
                                        {selectedApp.name.charAt(0)}
                                    </div>
                                    <h3 className="text-2xl font-black text-[#004D5C] tracking-tight italic mb-1">{selectedApp.name}</h3>
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Ứng viên tiềm năng</p>
                                </div>

                                <div className="space-y-6 flex-1">
                                    <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                                        <Mail className="h-5 w-5 text-[#006D7E] shrink-0" />
                                        <div className="overflow-hidden">
                                            <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Email</div>
                                            <div className="text-[11px] font-black text-[#004D5C] truncate">{selectedApp.email}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                                        <Phone className="h-5 w-5 text-[#006D7E] shrink-0" />
                                        <div>
                                            <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Điện thoại</div>
                                            <div className="text-[11px] font-black text-[#004D5C]">{selectedApp.phone || 'Chưa cập nhật'}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                                        <MapPin className="h-5 w-5 text-[#006D7E] shrink-0" />
                                        <div>
                                            <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Địa chỉ</div>
                                            <div className="text-[11px] font-black text-[#004D5C]">Hà Nội, Việt Nam</div>
                                        </div>
                                    </div>
                                </div>

                                <motion.a 
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    href={`/storage/${selectedApp.cv_path}`} 
                                    target="_blank"
                                    className="mt-10 bg-[#006D7E] text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:shadow-[#006d7e]/30 transition-all text-[11px] uppercase tracking-widest"
                                >
                                    <Download className="h-5 w-5" /> XEM CV (PDF)
                                </motion.a>
                            </div>

                            {/* Right Panel: Content & Actions */}
                            <div className="flex-1 p-12 flex flex-col overflow-hidden">
                                <div className="flex justify-between items-start mb-12">
                                    <div>
                                        <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-2">Vị trí ứng tuyển</div>
                                        <h2 className="text-3xl font-black text-[#004D5C] tracking-tight italic">{selectedApp.vacancy?.title}</h2>
                                    </div>
                                    <motion.button 
                                        whileHover={{ rotate: 90, scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setShowModal(false)} 
                                        className="p-4 bg-slate-50 rounded-2xl text-slate-300 hover:text-rose-500 transition border border-slate-100"
                                    >
                                        <X className="h-6 w-6" />
                                    </motion.button>
                                </div>

                                <div className="flex-1 overflow-y-auto custom-scrollbar pr-6">
                                    <div className="mb-10">
                                        <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4">Thư giới thiệu</div>
                                        <div className="bg-slate-50 p-8 rounded-[32px] text-sm font-medium text-[#004D5C] leading-relaxed italic border border-slate-100">
                                            {selectedApp.cover_letter || 'Người ứng tuyển không để lại thư giới thiệu.'}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-6">Thay đổi trạng thái</div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {[
                                                { status: 'reviewed', label: 'Đã xem', icon: <Eye className="h-4 w-4" />, color: 'indigo' },
                                                { status: 'pending', label: 'Chờ duyệt', icon: <Clock className="h-4 w-4" />, color: 'amber' },
                                                { status: 'accepted', label: 'Đã tuyển', icon: <CheckCircle className="h-4 w-4" />, color: 'emerald' },
                                                { status: 'rejected', label: 'Từ chối', icon: <XCircle className="h-4 w-4" />, color: 'rose' }
                                            ].map((btn) => (
                                                <motion.button
                                                    key={btn.status}
                                                    whileHover={{ scale: 1.02, y: -2 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => updateStatus(selectedApp.id, btn.status)}
                                                    className={`p-5 rounded-2xl flex items-center gap-3 transition-all border font-black text-[10px] uppercase tracking-widest ${
                                                        selectedApp.status === btn.status 
                                                        ? `bg-${btn.color}-50 text-${btn.color}-600 border-${btn.color}-200 shadow-lg shadow-${btn.color}-500/10` 
                                                        : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
                                                    }`}
                                                >
                                                    {btn.icon} {btn.label}
                                                </motion.button>
                                            ))}
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
