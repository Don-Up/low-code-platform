import {CompType} from "@/app/components/Canvas/components/type";

export type ButtonPropCompProp = {
    id: string;
    type?: CompType;

    text?: string;
    textColor?: string;
    textSize?: number;
    width?: number;
    height?: number;
    btnType?: "default" | "primary" | "dashed" | "text" | "link"; // Ant Design 按钮类型
    bgColor?: string; // 自定义颜色
    disabled?: boolean;
};

export const ButtonPropCompDefaultProp: ButtonPropCompProp = {
    id: "",
    type: "button",
    text: "Button",
    textColor: "#ffffff",
    textSize: 16,
    width: 150,
    height: 80,
    btnType: "default", // 默认 Ant Design 按钮类型
    bgColor: "#1890ff", // 默认蓝色
    disabled: false,
};