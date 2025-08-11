// LanguageSwitcher.tsx
'use client';
import React from "react";
import { useTranslation as defaultUseTranslation } from '@/hooks/useTranslation';

interface LanguageSwitcherProps {
    // 允许传入自定义的 useTranslation 实现（方便测试/Storybook）
    useTranslationImpl?: typeof defaultUseTranslation;
}


const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
                                                               useTranslationImpl = defaultUseTranslation,
                                                           }) => {
    const { locale, changeLanguage, supportedLocales, t } = useTranslationImpl();

    return (
        <div className="flex items-center gap-2 mr-4">
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

export default LanguageSwitcher
