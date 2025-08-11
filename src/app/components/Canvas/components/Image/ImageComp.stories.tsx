import { Meta, StoryObj } from '@storybook/nextjs';
import ImageComp from './index';
import { ImagePropCompProp } from './ImagePropCompProp';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import componentSlice from '@/store/componentSlice';

// 创建测试用的 Redux store
const store = configureStore({
    reducer: {
        components: componentSlice,
    },
});

const meta: Meta<typeof ImageComp> = {
    title: 'Components/ImageComp',
    component: ImageComp,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        src: {
            control: 'text',
            description: '图片的源地址'
        },
        width: {
            control: 'number',
            description: '图片宽度(px)',
            min: 50,
            max: 800
        },
        height: {
            control: 'number',
            description: '图片高度(px)',
            min: 50,
            max: 600
        },
        id: {
            control: 'text',
            description: '图片组件的唯一标识'
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
type Story = StoryObj<ImagePropCompProp>;

// 默认故事 - 展示一张示例图片
export const Default: Story = {
    args: {
        src: 'https://picsum.photos/600/400',
        width: 600,
        height: 400,
        id: 'default-image'
    },
};

// 小尺寸图片
export const SmallImage: Story = {
    args: {
        src: 'https://picsum.photos/300/200',
        width: 300,
        height: 200,
        id: 'small-image'
    },
};

// 正方形图片
export const SquareImage: Story = {
    args: {
        src: 'https://picsum.photos/400/400',
        width: 400,
        height: 400,
        id: 'square-image'
    },
};

// 无图片源的状态
export const NoImage: Story = {
    args: {
        src: '',
        width: 400,
        height: 300,
        id: 'no-image'
    },
};

// 自定义尺寸图片
export const CustomSizeImage: Story = {
    args: {
        src: 'https://picsum.photos/800/500',
        width: 800,
        height: 500,
        id: 'custom-size-image'
    },
};
