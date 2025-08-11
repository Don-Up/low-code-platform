import { Meta, StoryObj } from '@storybook/nextjs';
import ButtonComp from './index';
import { ButtonPropCompProp } from './ButtonPropCompProp';
// 导入 Redux 相关依赖
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import componentSlice from '@/store/componentSlice'; // 导入你的 slice

// 创建一个测试用的 store
const store = configureStore({
    reducer: {
        components: componentSlice, // 使用你的 slice 名称
    },
});

// 元数据配置
const meta: Meta<typeof ButtonComp> = {
    title: 'Components/ButtonComp',
    component: ButtonComp,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        text: {
            control: 'text',
            description: '按钮显示的文本内容'
        },
        textColor: {
            control: 'color',
            description: '按钮文本颜色'
        },
        textSize: {
            control: 'number',
            description: '按钮文本大小(px)',
            min: 12,
            max: 24
        },
        width: {
            control: 'number',
            description: '按钮宽度(px)',
            min: 40,
            max: 300
        },
        height: {
            control: 'number',
            description: '按钮高度(px)',
            min: 32,
            max: 100
        },
        bgColor: {
            control: 'color',
            description: '按钮背景颜色'
        },
        disabled: {
            control: 'boolean',
            description: '是否禁用按钮'
        },
        id: {
            control: 'text',
            description: '按钮组件的唯一标识'
        }
    },
    // 全局包装器：为所有故事添加 Redux Provider
    decorators: [
        (Story) => (
            <Provider store={store}>
                <Story />
            </Provider>
        ),
    ],
};

export default meta;
type Story = StoryObj<ButtonPropCompProp>;

// 默认故事
export const Default: Story = {
    args: {
        text: '默认按钮',
        textSize: 16,
        width: 120,
        height: 40,
        disabled: false,
        id: 'default-button'
    },
};

// 其他故事保持不变...
export const PrimaryButton: Story = {
    args: {
        text: '主要按钮',
        textSize: 16,
        textColor: '#ffffff',
        bgColor: '#1677ff',
        width: 140,
        height: 44,
        id: 'primary-button'
    },
};

export const DisabledButton: Story = {
    args: {
        text: '禁用按钮',
        textSize: 16,
        width: 120,
        height: 40,
        disabled: true,
        id: 'disabled-button'
    },
};