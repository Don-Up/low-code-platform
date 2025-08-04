'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Locale, supportedLocales, translations, TranslationKeys, defaultLocale } from '@/lib/locale';
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {setLang} from "@/store/langSlice";

export function useTranslation() {
    // 从 document cookies 初始化语言
    const [locale, setLocale] = useState<Locale>(defaultLocale);
    const {lang} = useAppSelector(state => state.lang)

    const router = useRouter();
    const dispatch = useAppDispatch()

    // 当外部语言变化时更新本地状态
    useEffect(() => {
        setLocale(lang);
    }, [lang]);

    // 初始化：从 cookies 读取语言设置
    useEffect(() => {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('locale='))
            ?.split('=')[1];

        if (cookieValue && supportedLocales.includes(cookieValue as Locale)) {
            setLocale(cookieValue as Locale);
        }
    }, []);

    // 翻译函数
    const t = (key: TranslationKeys): string => {
        return translations[locale][key] || key;
    };

    // 切换语言函数
    const changeLanguage = (newLocale: Locale) => {
        if (!supportedLocales.includes(newLocale) || newLocale === locale) {
            return;
        }

        dispatch(setLang(newLocale))

        // 设置 cookie，有效期 365 天
        document.cookie = `locale=${newLocale}; path=/; max-age=${365 * 24 * 60 * 60}`;

        // 更新状态
        setLocale(newLocale);

        // 重新加载页面以更新服务端组件
        router.refresh();
    };

    return {
        t,
        locale,
        changeLanguage,
        supportedLocales,
        setLocale
    };
}