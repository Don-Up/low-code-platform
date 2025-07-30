import {CompType} from "@/app/components/Canvas/components/type";

export type ButtonPropCompProp = {
    id?: string | null;
    type?: CompType;

    text?: string;
    width?: number;
    height?: number;
}

export const ButtonPropCompDefaultProp: ButtonPropCompProp = {
    type: "button",
    text: "Button",
    width: 150,
    height: 80
}