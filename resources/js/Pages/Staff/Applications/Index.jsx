import StaffLayout from '@/Layouts/StaffLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Search, Filter, Eye, MoreVertical, 
    Briefcase, Calendar, Mail, Phone,
    CheckCircle2, XCircle, Clock, User, Plus, Users
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Index({ applications, filters }) {
    return (
        <StaffLayout>
            <Head title="Quản lý ứng viên" />

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black text-[#1E293B] tracking-tight mb-2 italic first-letter:uppercase">Quản lý ứng viên</h1>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Theo dõi và đánh giá danh sách hồ sơ ứng tuyển</p>
                </div>
            </div>

            <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden mb-12">
                <div className="p-8 border-b border-slate-50 flex flex-wrap gap-4 bg-slate-50/30">
                    <div className="relative flex-1 min-w-[300px]">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                        <input 
                            type="text" 
                            defaultValue={filters.search}
                            placeholder="Tìm kiếm tên ứng viên..." 
                            className="w-full bg-white border-slate-200 rounded-2xl pl-16 pr-6 py-4 text-sm font-medium focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm placeholder:text-slate-300" 
                        />
                    </div>
                    <div className="flex gap-4">
                        <select 
                            defaultValue={filters.status}
                            className="bg-white border-slate-200 rounded-2xl px-6 py-4 text-xs font-bold text-slate-500 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm cursor-pointer"
                        >
                            <option value="">Tất cả trạng thái</option>
                            <option value="pending">Chờ duyệt</option>
                            <option value="reviewed">Đã xem</option>
                            <option value="accepted">Tiếp nhận</option>
                            <option value="rejected">Từ chối</option>
                        </select>
                        <button className="p-5 bg-white rounded-2xl text-slate-400 hover:text-indigo-600 transition-all shadow-sm border border-slate-100">
                            <Filter className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
                                <th className="px-10 py-6">Ứng viên</th>
                                <th className="px-10 py-6">Vị trí</th>
                                <th className="px-10 py-6 text-center">Ngày ứng tuyển</th>
                                <th className="px-10 py-6 text-center">Trạng thái</th>
                                <th className="px-10 py-6 text-right pr-12">Chi tiết</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {(applications.data || []).map((app, index) => (
                                <motion.tr 
                                    key={app.id} 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.05 * index }}
                                    className="hover:bg-slate-50/80 transition duration-500 group"
                                >
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-5">
                                            <div className="h-14 w-14 bg-indigo-50 rounded-[20px] flex items-center justify-center font-black text-indigo-600 shadow-sm border border-indigo-100/50 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                                {app.candidate.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-black text-[#1E293B] italic text-xl group-hover:text-indigo-600 transition-colors">{app.candidate.name}</div>
                                                <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">
                                                    <Mail className="h-3 w-3" /> {app.candidate.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="font-bold text-slate-700 text-sm mb-1">{app.vacancy.title}</div>
                                        <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-1.5">
                                            <Briefcase className="h-3 w-3" /> {app.vacancy.type}
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-center">
                                        <div className="text-sm font-bold text-slate-600">{new Date(app.created_at).toLocaleDateString()}</div>
                                        <div className="text-[10px] text-slate-300 font-bold uppercase tracking-widest mt-1">
                                            <Clock className="h-3 w-3 inline mr-1" /> {new Date(app.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-center">
                                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm border ${
                                            app.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                            app.status === 'reviewed' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                            app.status === 'accepted' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                            'bg-rose-50 text-rose-600 border-rose-100'
                                        }`}>
                                            {app.status === 'pending' ? 'Chờ duyệt' : 
                                             app.status === 'reviewed' ? 'Đã xem' :
                                             app.status === 'accepted' ? 'Đã nhận' : 'Từ chối'}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8 text-right pr-12">
                                        <Link 
                                            href={route('staff.applications.show', app.id)}
                                            className="inline-flex p-3.5 text-slate-400 hover:text-indigo-600 bg-white border border-slate-100 rounded-2xl shadow-sm transition-all hover:scale-110 active:scale-95"
                                        >
                                            <Eye className="h-5 w-5" />
                                        </Link>
                                    </td>
                                </motion.tr>
                            ))}
                            {(applications.data || []).length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-24 text-center">
                                        <div className="h-20 w-20 bg-slate-50 rounded-[30px] flex items-center justify-center mx-auto mb-6 border border-slate-100">
                                            <Users className="h-10 w-10 text-slate-200" />
                                        </div>
                                        <h4 className="text-xl font-black text-slate-400 mb-2 italic tracking-tight">Chưa có ứng viên nào</h4>
                                        <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em]">Danh sách sẽ tự động cập nhật khi có hồ sơ mới.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </StaffLayout>
    );
}
