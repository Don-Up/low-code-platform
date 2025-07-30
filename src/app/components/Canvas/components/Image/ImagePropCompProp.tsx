import {CompType} from "@/app/components/Canvas/components/type";

export type ImagePropCompProp = {
    id: string;
    type?: CompType;

    src?: string;
    width?: number;
    height?: number;
}

export const ImagePropCompDefaultProp: ImagePropCompProp = {
    id: "",
    type: "image",
    src: "/images/image.svg",
    width: 200,
    height: 0
}