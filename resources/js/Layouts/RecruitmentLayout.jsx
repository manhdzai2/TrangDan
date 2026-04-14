import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Facebook, Twitter, Instagram, Linkedin, 
    ArrowUpRight, Sparkles, User, LogOut, Sun, Moon
} from 'lucide-react';


import LanguageSwitcher from '@/Components/LanguageSwitcher';
import { ToastContainer } from '@/Components/Toast';


export const TranslationContext = React.createContext();

export default function RecruitmentLayout({ children }) {
    const { auth, translations, flash } = usePage().props;
    const { url } = usePage();
    const [toasts, setToasts] = React.useState([]);

    React.useEffect(() => {
        if (flash.success) {
            addToast(flash.success, 'success');
        }
        if (flash.error) {
            addToast(flash.error, 'error');
        }
    }, [flash]);

    const addToast = (message, type) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type, onClose: () => removeToast(id) }]);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };
    
    // Helper to translate
    const __ = (key) => translations[key] || key;

    const [isDark, setIsDark] = React.useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark' || 
                   (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });

    React.useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark(!isDark);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-inter selection:bg-[#006D7E] selection:text-white transition-colors duration-500">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-6 md:px-12 pointer-events-none">
                <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Link href="/" className="text-2xl font-black tracking-tighter text-[#006D7E] flex items-center gap-2 group">
                            Almus<span className="text-slate-900 group-hover:text-[#006D7E] transition-colors duration-500">Tech</span>
                        </Link>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        className="hidden md:flex items-center gap-1 bg-white/80 backdrop-blur-2xl px-2 py-2 rounded-full border border-white shadow-2xl shadow-[#006D7E]/5"
                    >
                        {[
                            { name: __('Home'), href: '/' },
                            { name: __('About Us'), href: '/about' },
                            { name: __('Vacancies'), href: '/jobs' }
                        ].map((item) => (
                            <Link 
                                key={item.name}
                                href={item.href}
                                className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
                                    url === item.href || (item.href !== '/' && url.startsWith(item.href))
                                    ? 'bg-[#006D7E] text-white shadow-xl shadow-[#006D7E]/20' 
                                    : 'text-slate-400 hover:text-[#006D7E] hover:bg-[#EEF8F9]'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="flex items-center gap-4"
                    >
                        {/* Language Switcher */}
                        <div className="pointer-events-auto">
                            <LanguageSwitcher />
                        </div>

                        {/* Theme Toggle Button */}
                        <motion.button
                            onClick={toggleTheme}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-sm text-slate-400 hover:text-[#006D7E] dark:hover:text-amber-400 hover:shadow-xl transition-all border border-white dark:border-white/5 pointer-events-auto"
                        >
                            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </motion.button>

                        {auth?.user ? (
                            <div className="flex items-center gap-4 pointer-events-auto">
                                <Link 
                                    href={route('my.applications')}
                                    className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 border ${
                                        url.startsWith('/my-applications')
                                        ? 'bg-[#006D7E] text-white border-[#006D7E] shadow-xl' 
                                        : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/5 hover:border-[#006D7E] hover:text-[#006D7E]'
                                    }`}
                                >
                                    {__('My Applications')}
                                </Link>
                                <Link 
                                    href={route('logout')} 
                                    method="post" 
                                    as="button"
                                    className="px-8 py-3 bg-[#004D5C] text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:shadow-2xl hover:shadow-[#004D5C]/30 hover:translate-y-[-2px] transition-all duration-500"
                                >
                                    {__('Logout')}
                                </Link>
                            </div>
                        ) : (
                            <Link 
                                href="/login" 
                                className="px-8 py-3 bg-[#006D7E] text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:shadow-2xl hover:shadow-[#006D7E]/30 hover:translate-y-[-2px] transition-all duration-500 flex items-center gap-2 pointer-events-auto"
                            >
                                <User className="h-4 w-4" /> {__('Login')}
                            </Link>
                        )}
                    </motion.div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={url}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-slate-950 pt-32 pb-16 relative overflow-hidden border-t border-slate-50 dark:border-white/5 transition-colors duration-500">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#006D7E]/10 to-transparent"></div>
                <div className="max-w-7xl mx-auto px-12 grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
                    <div className="md:col-span-2">
                        <Link href="/" className="text-4xl font-black tracking-tighter text-[#006D7E] mb-8 block">
                            Almus<span className="text-slate-900 dark:text-white">Tech</span>
                        </Link>
                        <p className="text-slate-400 dark:text-slate-500 font-medium italic max-w-sm mb-10 leading-loose">
                            {__('Footer Description')}
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="h-12 w-12 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-[#006D7E] hover:text-white hover:shadow-xl hover:translate-y-[-4px] transition-all duration-500">
                                    <Icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="text-[10px] font-black text-slate-900 dark:text-white tracking-[0.2em] uppercase mb-8">{__('Footer Pages')}</h4>
                        <ul className="space-y-4">
                            <li><Link href="/about" className="text-slate-400 dark:text-slate-500 text-sm font-bold hover:text-[#006D7E] transition-all duration-300 italic group flex items-center gap-2">
                                {__('About Us')} <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                            </Link></li>
                            <li><Link href="/jobs" className="text-slate-400 dark:text-slate-500 text-sm font-bold hover:text-[#006D7E] transition-all duration-300 italic group flex items-center gap-2">
                                {__('Vacancies')} <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                            </Link></li>
                            <li><Link href="/culture" className="text-slate-400 dark:text-slate-500 text-sm font-bold hover:text-[#006D7E] transition-all duration-300 italic group flex items-center gap-2">
                                {__('Culture')} <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                            </Link></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="text-[10px] font-black text-slate-900 dark:text-white tracking-[0.2em] uppercase mb-8">{__('Footer Connect')}</h4>
                        <div className="bg-[#EEF8F9] dark:bg-[#002B33] p-8 rounded-[40px] border border-[#006D7E]/10 flex flex-col items-center text-center">
                            <Sparkles className="h-8 w-8 text-[#006D7E] mb-4 animate-pulse" />
                            <div className="text-[10px] font-black text-[#006D7E] uppercase tracking-widest mb-2">{__('Vacancies')}</div>
                            <div className="text-sm font-black text-[#004D5C] dark:text-[#CCEBF0] italic">hr@amt-solutions.vn</div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-12 mt-24 pt-8 border-t border-slate-50 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-slate-300 dark:text-slate-800 text-[10px] font-black uppercase tracking-[0.2em]">© 2026 ALMUS TECH. {__('All Rights Reserved')}</p>
                    <p className="text-slate-300 dark:text-slate-800 text-[10px] font-black uppercase tracking-[0.2em]">{__('Recruitment System')}</p>
                </div>
            </footer>

            <ToastContainer flashes={toasts} />
        </div>
    );
}
