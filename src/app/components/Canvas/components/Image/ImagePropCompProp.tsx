import {BaseCompProp} from "@/app/components/Canvas/components/type";

export type ImagePropCompProp = BaseCompProp & {
    src?: string;
    width?: number;
    height?: number;
    disabled?: boolean; // 添加 disabled 支持
};

export const ImagePropCompDefaultProp: ImagePropCompProp = {
    id: "",
    type: "image",
    src: "/images/image.svg",
    width: 200,
    height: 0,
    disabled: false,
};