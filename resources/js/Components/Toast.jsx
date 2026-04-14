import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const icons = {
        success: <CheckCircle className="h-5 w-5 text-emerald-500" />,
        error: <XCircle className="h-5 w-5 text-rose-500" />,
        warning: <AlertCircle className="h-5 w-5 text-amber-500" />,
        info: <Info className="h-5 w-5 text-indigo-500" />,
    };

    const styles = {
        success: 'border-emerald-500/20 bg-emerald-50/80 dark:bg-emerald-900/20',
        error: 'border-rose-500/20 bg-rose-50/80 dark:bg-rose-900/20',
        warning: 'border-amber-500/20 bg-amber-50/80 dark:bg-amber-900/20',
        info: 'border-indigo-500/20 bg-indigo-50/80 dark:bg-indigo-900/20',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`flex items-center gap-4 px-6 py-4 rounded-[24px] border backdrop-blur-xl shadow-2xl pointer-events-auto min-w-[300px] ${styles[type]}`}
        >
            <div className="flex-shrink-0">
                {icons[type]}
            </div>
            <div className="flex-1">
                <p className="text-[11px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-200">
                    {message}
                </p>
            </div>
            <button 
                onClick={onClose}
                className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
            >
                <X className="h-4 w-4 text-slate-400" />
            </button>
        </motion.div>
    );
}

export function ToastContainer({ flashes }) {
    return (
        <div className="fixed bottom-10 right-10 z-[200] flex flex-col gap-4 pointer-events-none">
            <AnimatePresence>
                {flashes.map((flash, idx) => flash.message && (
                    <Toast 
                        key={`${flash.type}-${idx}`} 
                        message={flash.message} 
                        type={flash.type} 
                        onClose={flash.onClose} 
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}
