'use client';

import {useTranslation} from '@/hooks/useTranslation';

export default function LanguageSwitcher() {
    const {locale, changeLanguage, supportedLocales, t} = useTranslation();

    return (
        <div className="flex items-center gap-2">
            {supportedLocales.map((lang) => (
                <button
                    key={lang}
                    onClick={() => changeLanguage(lang)}
                    disabled={locale === lang}
                    className={`px-3 py-1 rounded text-sm ${
                        locale === lang
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                >
                    {lang.toUpperCase()}
                </button>
            ))}
        </div>
    );
}
