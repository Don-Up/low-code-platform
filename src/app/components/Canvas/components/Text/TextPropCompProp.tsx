import {CompType} from "@/app/components/Canvas/components/type";

export type TextPropCompProp = {
    id?: string | null;
    type?: CompType;

    text?: string;
    level?: number;
    isCenter?: boolean;
    disabled?: boolean;
}

export const TextPropCompDefaultProp: TextPropCompProp = {
    text: "Default Text",
    level: 3,
    isCenter: false,
    disabled: false,
    type: "text"
}