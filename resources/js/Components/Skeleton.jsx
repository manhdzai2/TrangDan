import { motion } from 'framer-motion';

export default function Skeleton({ className, circle = false }) {
    return (
        <div className={`relative overflow-hidden ${className} ${circle ? 'rounded-full' : 'rounded-2xl'} bg-slate-200 dark:bg-slate-800`}>
            <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "linear",
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent skew-x-12"
            />
        </div>
    );
}

export function JobCardSkeleton() {
    return (
        <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[48px] border border-slate-50 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-8 animate-pulse">
            <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-10 w-3/4 mb-6" />
                <div className="flex flex-wrap gap-8">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-32" />
                </div>
            </div>
            <Skeleton className="h-20 w-20" circle={true} />
        </div>
    );
}
