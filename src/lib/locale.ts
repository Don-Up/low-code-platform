// 定义支持的语言类型
export type Locale = 'en' | 'zh';

// 支持的语言列表
export const supportedLocales: Locale[] = ['en', 'zh'];

// 默认语言
export const defaultLocale: Locale = 'en';

// 从 cookies 中获取语言设置
export function getLocaleFromCookies(cookies: string | null): Locale {
    if (!cookies) return defaultLocale;

    const cookieArray = cookies.split(';');
    for (const cookie of cookieArray) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'locale' && supportedLocales.includes(value as Locale)) {
            return value as Locale;
        }
    }

    return defaultLocale;
}

// 翻译内容类型定义
export type TranslationKeys =
    | 'componentLibrary'
    | 'canvas'
    | 'property'
    | 'noComponentSelected'
    | 'button'
    | 'text'
    | 'image'
    | 'input'
    | 'card'
    | 'container'
    | 'undo'
    | 'redo'
    | 'save'
    | 'previewMode'
    | 'exitPreview'
    | "saveCanvas"
    | "enterCanvasName"
    | "cancel";

// 翻译数据
export const translations = {
    en: {
        componentLibrary: 'Component Library',
        canvas: 'Canvas',
        property: 'Property',
        noComponentSelected: 'No Component Selected',
        button: 'Button',
        text: 'Text',
        image: 'Image',
        input: 'Input',
        card: 'Card',
        container: 'Container',
        undo: 'Undo',
        redo: 'Redo',
        save: 'Save',
        previewMode: 'Preview Mode',
        exitPreview: 'Exit Preview',
        saveCanvas: "Save Canvas",
        enterCanvasName: "Enter canvas name",
        cancel: "Cancel"
    },
    zh: {
        componentLibrary: '组件库',
        canvas: '画布',
        property: '属性',
        noComponentSelected: '未选择组件',
        button: '按钮',
        text: '文本',
        image: '图片',
        input: '输入框',
        card: '卡片',
        container: '容器',
        undo: '撤销',
        redo: '重做',
        save: '保存',
        previewMode: '预览模式',
        exitPreview: '退出预览',
        saveCanvas: "保存画布",
        enterCanvasName: "输入画布名称",
        cancel: "取消"
    }
} as const;