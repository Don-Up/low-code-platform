// LanguageSwitcher.stories.tsx
import type { Meta, StoryObj } from '@storybook/nextjs';
import LanguageSwitcher from './index';
import type { Locale, TranslationKeys } from '@/lib/locale';
import { useTranslation } from '@/hooks/useTranslation';

const mockLocales: Locale[] = ['en', 'zh'];

const meta: Meta<typeof LanguageSwitcher> = {
    title: 'Components/LanguageSwitcher',
    component: LanguageSwitcher,
    parameters: {
        controls: { disable: true },
    },
};
export default meta;

type Story = StoryObj<typeof LanguageSwitcher>;

export const Default: Story = {
    args: {
        useTranslationImpl: (): ReturnType<typeof useTranslation> => ({
            locale: 'en',
            changeLanguage: (lang: Locale) => alert(`Language changed to ${lang}`),
            supportedLocales: mockLocales,
            t: (key: TranslationKeys) => key,
            setLocale: () => {},
        }),
    },
};

export const ChineseSelected: Story = {
    args: {
        useTranslationImpl: (): ReturnType<typeof useTranslation> => ({
            locale: 'zh',
            changeLanguage: (lang: Locale) => alert(`Language changed to ${lang}`),
            supportedLocales: mockLocales,
            t: (key: TranslationKeys) => key,
            setLocale: () => {},
        }),
    },
};

export const Interaction: Story = {
    args: {
        useTranslationImpl: (): ReturnType<typeof useTranslation> => {
            const mockChangeLanguage = (lang: Locale) =>
                alert(`Language changed to ${lang}`);
            return {
                locale: 'en',
                changeLanguage: mockChangeLanguage,
                supportedLocales: mockLocales,
                t: (key: TranslationKeys) => key,
                setLocale: () => {},
            };
        },
    },
};
