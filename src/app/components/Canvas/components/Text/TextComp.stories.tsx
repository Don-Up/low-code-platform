import { Meta, StoryObj } from '@storybook/nextjs';
import TextComp from './index';
import { TextPropCompProp } from './TextPropCompProp';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import componentSlice from '@/store/componentSlice';

// 创建测试用的 Redux store
const store = configureStore({
    reducer: {
        components: componentSlice,
    },
});

const meta: Meta<typeof TextComp> = {
    title: 'Components/TextComp',
    component: TextComp,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        text: {
            control: 'text',
            description: '文本内容'
        },
        color: {
            control: 'color',
            description: '文本颜色'
        },
        fontSize: {
            control: 'number',
            description: '文本大小(px)',
            min: 12,
            max: 48
        },
        textAlign: {
            control: {
                type: 'select',
                options: ['left', 'center', 'right']
            },
            description: '文本对齐方式'
        },
        fontWeight: {
            control: {
                type: 'select',
                options: ['normal', 'bold', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900']
            },
            description: '文本字重'
        },
        disabled: {
            control: 'boolean',
            description: '是否禁用文本（降低透明度）'
        },
        id: {
            control: 'text',
            description: '文本组件的唯一标识'
        }
    },
    // 添加 Redux Provider 确保 useAppDispatch 正常工作
    decorators: [
        (Story) => (
            <Provider store={store}>
                <Story />
            </Provider>
        ),
    ],
};

export default meta;
type Story = StoryObj<TextPropCompProp>;

// 默认故事 - 基础文本样式
export const Default: Story = {
    args: {
        text: '默认文本内容',
        fontSize: 16,
        textAlign: 'left',
        fontWeight: 'normal',
        disabled: false,
        id: 'default-text'
    },
};

// 自定义颜色文本
export const ColoredText: Story = {
    args: {
        text: '蓝色文本示例',
        color: '#1677ff',
        fontSize: 18,
        fontWeight: 'normal',
        id: 'colored-text'
    },
};

// 大号粗体文本
export const LargeBoldText: Story = {
    args: {
        text: '大号粗体标题',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        id: 'large-bold-text'
    },
};

// 禁用状态文本
export const DisabledText: Story = {
    args: {
        text: '这是禁用状态的文本',
        fontSize: 16,
        disabled: true,
        id: 'disabled-text'
    },
};

// 右对齐文本
export const RightAlignedText: Story = {
    args: {
        text: '右对齐的文本内容',
        fontSize: 16,
        textAlign: 'right',
        color: '#666666',
        id: 'right-aligned-text'
    },
};

// 自定义字重文本
export const CustomWeightText: Story = {
    args: {
        text: '700 字重的文本',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#e53e3e',
        id: 'custom-weight-text'
    },
};
