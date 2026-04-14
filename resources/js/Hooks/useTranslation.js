import { usePage } from '@inertiajs/react';

export function useTranslation() {
    const { translations } = usePage().props;

    const __ = (key) => {
        return translations[key] || key;
    };

    return { __ };
}
