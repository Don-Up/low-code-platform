import { Meta, StoryObj } from '@storybook/nextjs';
import CardComp from './index';
import { CardPropCompProp } from '@/app/components/Canvas/components/Card/CardPropCompProp';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import componentSlice from '@/store/componentSlice';

// 创建测试用的 Redux store
const store = configureStore({
    reducer: {
        components: componentSlice,
    },
});

const meta: Meta<typeof CardComp> = {
    title: 'Components/CardComp',
    component: CardComp,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        title: {
            control: 'text',
            description: '卡片标题'
        },
        content: {
            control: 'text',
            description: '卡片内容'
        },
        width: {
            control: 'number',
            description: '卡片宽度(px)，不设置则默认100%',
            min: 200,
            max: 800
        },
        height: {
            control: 'number',
            description: '卡片高度(px)，不设置则自适应内容',
            min: 100,
            max: 600
        },
        backgroundColor: {
            control: 'color',
            description: '卡片背景颜色'
        },
        bordered: {
            control: 'boolean',
            description: '是否显示卡片边框'
        },
        id: {
            control: 'text',
            description: '卡片组件的唯一标识'
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
type Story = StoryObj<CardPropCompProp>;

// 默认故事 - 基础卡片
export const Default: Story = {
    args: {
        title: '默认卡片',
        content: '这是一张默认样式的卡片，包含标题和内容区域。',
        width: 500,
        bordered: true,
        id: 'default-card'
    },
};

// 无标题卡片
export const WithoutTitle: Story = {
    args: {
        title: '',
        content: '这是一张没有标题的卡片，只有内容区域。',
        width: 400,
        bordered: true,
        id: 'card-without-title'
    },
};

// 自定义背景色卡片
export const CustomBackground: Story = {
    args: {
        title: '自定义背景',
        content: '这是一张带有自定义背景色的卡片',
        width: 450,
        backgroundColor: '#f0f2f5',
        bordered: true,
        id: 'custom-bg-card'
    },
};

// 无边框卡片
export const Borderless: Story = {
    args: {
        title: '无边框卡片',
        content: '这是一张没有边框的卡片，视觉上更简洁',
        width: 400,
        bordered: false,
        id: 'borderless-card'
    },
};

// 固定高度卡片
export const FixedHeight: Story = {
    args: {
        title: '固定高度',
        content: '这是一张固定高度的卡片，内容会在固定区域内显示。即使内容较多，也会在设定的高度内展示。',
        width: 500,
        height: 200,
        bordered: true,
        id: 'fixed-height-card'
    },
};

// 大型卡片
export const LargeCard: Story = {
    args: {
        title: '大型卡片',
        content: '这是一张尺寸较大的卡片，适合展示更多内容。可以用于展示详细信息、列表数据或复杂内容结构。',
        width: 700,
        height: 300,
        bordered: true,
        id: 'large-card'
    },
};
