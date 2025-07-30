import {CompType} from "@/app/components/Canvas/components/type";

export type ImagePropCompProp = {
    id?: string | null;
    type?: CompType;

    src?: string;
    width?: number;
    height?: number;
}

export const ImagePropCompDefaultProp: ImagePropCompProp = {
    type: "image",
    src: "/images/image.svg",
    width: 200,
    height: 0
}