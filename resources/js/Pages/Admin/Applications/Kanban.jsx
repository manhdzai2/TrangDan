import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, Link } from '@inertiajs/react';
import { 
    DndContext, 
    closestCorners, 
    KeyboardSensor, 
    PointerSensor, 
    useSensor, 
    useSensors,
    DragOverlay,
    defaultDropAnimationSideEffects
} from '@dnd-kit/core';
import { 
    arrayMove, 
    SortableContext, 
    sortableKeyboardCoordinates, 
    verticalListSortingStrategy 
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
    LayoutGrid, List, MessageSquare, Clock, CheckCircle, XCircle, Eye, 
    MoreVertical, User, Calendar, MapPin, Briefcase 
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- Components ---

const KanbanCard = ({ app, isOverlay = false }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: app.id });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
    };

    const statusColors = {
        pending: 'border-amber-500/20 text-amber-600 dark:text-amber-400',
        reviewed: 'border-indigo-500/20 text-indigo-600 dark:text-indigo-400',
        accepted: 'border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
        rejected: 'border-rose-500/20 text-rose-600 dark:text-rose-400',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm border border-slate-100 dark:border-white/5 cursor-grab active:cursor-grabbing hover:shadow-xl transition-all group mb-4 ${isOverlay ? 'shadow-2xl ring-2 ring-[#006D7E]/20' : ''}`}
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-[#EEF8F9] dark:bg-slate-800 rounded-2xl flex items-center justify-center text-[#006D7E] font-black italic shadow-inner">
                        {app.name.charAt(0)}
                    </div>
                    <div>
                        <h4 className="text-sm font-black text-[#004D5C] dark:text-white tracking-tight italic">{app.name}</h4>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{app.source || 'Trực tiếp'}</p>
                    </div>
                </div>
                <button className="text-slate-300 hover:text-slate-500">
                    <MoreVertical className="w-4 h-4" />
                </button>
            </div>

            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
                    <Briefcase className="w-3 h-3 text-[#006D7E]" />
                    <span className="truncate">{app.vacancy?.title}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(app.created_at).toLocaleDateString('vi-VN')}</span>
                </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-50 dark:border-white/5">
                <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[8px] font-bold">
                        {app.name.charAt(0)}
                    </div>
                </div>
                <div className="flex gap-1">
                    <Link 
                        href={route('admin.applications.show', app.id)}
                        className="p-1.5 text-slate-300 hover:text-[#006D7E] transition-colors"
                    >
                        <Eye className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

const KanbanColumn = ({ id, title, applications, icon, color }) => {
    return (
        <div className="flex flex-col h-full min-w-[320px] bg-slate-50/50 dark:bg-black/20 rounded-[40px] p-4">
            <div className="flex items-center justify-between mb-6 px-4 pt-2">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-black/5 ${color}`}>
                        {icon}
                    </div>
                    <div>
                        <h3 className="text-xs font-black text-[#004D5C] dark:text-white uppercase tracking-widest">{title}</h3>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{applications.length} ứng viên</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar px-2">
                <SortableContext 
                    id={id}
                    items={applications.map(app => app.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {applications.map(app => (
                        <KanbanCard key={app.id} app={app} />
                    ))}
                </SortableContext>
                
                {applications.length === 0 && (
                    <div className="border-2 border-dashed border-slate-200 dark:border-white/5 rounded-3xl p-8 text-center">
                        <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest italic">Trống</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Main Page ---

export default function Kanban({ applications }) {
    const [apps, setApps] = useState(applications);
    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const columns = [
        { id: 'pending', title: 'Mới ứng tuyển', icon: <Clock className="w-4 h-4" />, color: 'text-amber-500' },
        { id: 'reviewed', title: 'Đang xem xét', icon: <Eye className="w-4 h-4" />, color: 'text-indigo-500' },
        { id: 'accepted', title: 'Chấp nhận', icon: <CheckCircle className="w-4 h-4" />, color: 'text-emerald-500' },
        { id: 'rejected', title: 'Từ chối', icon: <XCircle className="w-4 h-4" />, color: 'text-rose-500' },
    ];

    const getAppsByStatus = (status) => apps.filter(app => app.status === status);

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragOver = (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        // Find the containers
        const activeContainer = active.data.current?.sortable?.containerId || findContainer(activeId);
        const overContainer = over.data.current?.sortable?.containerId || findContainer(overId);

        if (!activeContainer || !overContainer || activeContainer === overContainer) {
            return;
        }

        setApps((prev) => {
            const activeItems = prev.filter(a => a.id !== activeId);
            const activeItem = prev.find(a => a.id === activeId);
            
            // Update the status of the item
            const newItem = { ...activeItem, status: overContainer };
            
            return [...activeItems, newItem];
        });
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveId(null);

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        const activeContainer = findContainer(activeId);
        const overContainer = findContainer(overId);

        if (activeContainer && overContainer) {
            // Update on server
            const item = apps.find(a => a.id === activeId);
            if (item && item.status !== overContainer) {
                router.put(route('admin.applications.updateStatus', activeId), {
                    status: overContainer
                }, {
                    preserveScroll: true,
                    preserveState: true
                });
            }
        }
    };

    const findContainer = (id) => {
        if (columns.find(c => c.id === id)) return id;
        const app = apps.find(a => a.id === id);
        return app ? app.status : null;
    };

    const activeApp = activeId ? apps.find(a => a.id === activeId) : null;

    return (
        <AdminLayout>
            <Head title="Kanban - Quản lý ứng viên | Almus Tech" />

            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-black text-[#004D5C] dark:text-white tracking-tighter mb-2 italic uppercase">Kanban Board</h1>
                    <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Quản lý quy trình tuyển dụng trực quan</p>
                </div>
                <div className="flex gap-2">
                    <Link 
                        href={route('admin.applications.index')}
                        className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 text-slate-400 hover:text-[#006D7E] font-black py-4 px-6 rounded-2xl flex items-center gap-2 shadow-sm transition-all shadow-indigo-500/5 group"
                    >
                        <List className="h-5 w-5" />
                        <span className="hidden sm:inline">Dạng danh sách</span>
                    </Link>
                </div>
            </div>

            <div className="h-[calc(100vh-280px)] overflow-x-auto pb-6">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                >
                    <div className="flex gap-8 h-full min-w-max">
                        {columns.map(col => (
                            <KanbanColumn 
                                key={col.id}
                                id={col.id}
                                title={col.title}
                                icon={col.icon}
                                color={col.color}
                                applications={getAppsByStatus(col.id)}
                            />
                        ))}
                    </div>

                    <DragOverlay dropAnimation={{
                        sideEffects: defaultDropAnimationSideEffects({
                            styles: {
                                active: {
                                    opacity: '0.5',
                                },
                            },
                        }),
                    }}>
                        {activeId && activeApp ? (
                            <KanbanCard app={activeApp} isOverlay />
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </div>
        </AdminLayout>
    );
}
