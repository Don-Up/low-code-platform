import {CompType} from "@/app/components/Canvas/components/type";

export type TextPropCompProp = {
    id: string;
    type?: CompType;

    text?: string;
    level?: number;
    isCenter?: boolean;
    disabled?: boolean;
}

export const TextPropCompDefaultProp: TextPropCompProp = {
    id: "",
    text: "Default Text",
    level: 3,
    isCenter: false,
    disabled: false,
    type: "text"
}