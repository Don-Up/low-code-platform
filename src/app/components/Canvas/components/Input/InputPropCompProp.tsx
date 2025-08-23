import {BaseCompProp} from "@/app/components/Canvas/components/type";

export type InputPropCompProp = BaseCompProp & {
    value?: string;
    placeholder?: string;
    inputType?: "text" | "password" | "number"; // 输入框类型
    width?: number;
    disabled?: boolean;
    size?: "small" | "middle" | "large"; // Ant Design 尺寸
    allowClear?: boolean;
};

export const InputPropCompDefaultProp: InputPropCompProp = {
    id: "",
    type: "input",
    value: "",
    placeholder: "Input Text",
    inputType: "text",
    width: 200,
    disabled: false,
    size: "middle",
    allowClear: false,
};