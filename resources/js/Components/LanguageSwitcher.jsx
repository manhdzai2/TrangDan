import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Languages, ChevronDown } from 'lucide-react';
import { Menu, Transition } from '@headlessui/react';

const LanguageSwitcher = () => {
    const { locale } = usePage().props;

    const languages = [
        { name: 'Vietnamese', code: 'vi', label: 'Tiếng Việt' },
        { name: 'English', code: 'en', label: 'English' }
    ];

    const currentLang = languages.find(lang => lang.code === locale) || languages[0];

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex items-center gap-x-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/20 transition-all">
                    <Languages className="w-4 h-4" />
                    <span className="hidden sm:inline-block">{currentLang.label}</span>
                    <ChevronDown className="w-3 h-3 opacity-50" />
                </Menu.Button>
            </div>

            <Transition
                as={React.Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden">
                    <div className="py-1">
                        {languages.map((lang) => (
                            <Menu.Item key={lang.code}>
                                {({ active }) => (
                                    <Link
                                        href={route('language.switch', lang.code)}
                                        className={`${
                                            active ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'
                                        } flex items-center px-4 py-2.5 text-sm font-medium transition-colors`}
                                    >
                                        <span className={`w-2 h-2 rounded-full mr-3 ${locale === lang.code ? 'bg-indigo-500' : 'bg-transparent'}`} />
                                        {lang.label}
                                    </Link>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default LanguageSwitcher;
