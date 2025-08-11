import { Meta, StoryObj } from '@storybook/nextjs';
import InputComp from './index';
import { InputPropCompProp } from './InputPropCompProp';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import componentSlice from '@/store/componentSlice';

// 创建测试用的 Redux store
const store = configureStore({
    reducer: {
        components: componentSlice,
    },
});

const meta: Meta<typeof InputComp> = {
    title: 'Components/InputComp',
    component: InputComp,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        value: {
            control: 'text',
            description: '输入框的默认值'
        },
        placeholder: {
            control: 'text',
            description: '输入框的占位文本'
        },
        inputType: {
            control: {
                type: 'select',
                options: ['text', 'password', 'number', 'email', 'tel']
            },
            description: '输入框的类型'
        },
        width: {
            control: 'number',
            description: '输入框宽度(px)，不设置则默认100%',
            min: 100,
            max: 600
        },
        disabled: {
            control: 'boolean',
            description: '是否禁用输入框'
        },
        size: {
            control: {
                type: 'select',
                options: ['small', 'middle', 'large']
            },
            description: '输入框的尺寸'
        },
        allowClear: {
            control: 'boolean',
            description: '是否显示清除按钮'
        },
        id: {
            control: 'text',
            description: '输入框组件的唯一标识'
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
type Story = StoryObj<InputPropCompProp>;

// 默认故事 - 基础文本输入框
export const Default: Story = {
    args: {
        value: '',
        placeholder: '请输入内容',
        inputType: 'text',
        size: 'middle',
        allowClear: false,
        id: 'default-input'
    },
};

// 带初始值的输入框
export const WithValue: Story = {
    args: {
        value: '初始内容',
        placeholder: '请输入内容',
        inputType: 'text',
        size: 'middle',
        allowClear: true,
        id: 'input-with-value'
    },
};

// 密码输入框
export const PasswordInput: Story = {
    args: {
        value: '',
        placeholder: '请输入密码',
        inputType: 'password',
        width: 300,
        size: 'middle',
        allowClear: false,
        id: 'password-input'
    },
};

// 禁用状态输入框
export const DisabledInput: Story = {
    args: {
        value: '不可编辑内容',
        placeholder: '请输入内容',
        inputType: 'text',
        width: 300,
        disabled: true,
        size: 'middle',
        id: 'disabled-input'
    },
};

// 大尺寸输入框
export const LargeInput: Story = {
    args: {
        value: '',
        placeholder: '大尺寸输入框',
        inputType: 'text',
        width: 400,
        size: 'large',
        allowClear: true,
        id: 'large-input'
    },
};