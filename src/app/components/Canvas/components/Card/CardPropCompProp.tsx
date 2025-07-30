import {CompType} from "@/app/components/Canvas/components/type";

export type CardPropCompProp = {
    id?: string | null;
    type?: CompType;

    title?: string;
    content?: string;
}

export const CardPropCompDefaultProp: CardPropCompProp = {
    type: "card",
    title: "Default Title",
    content: "Default Content"
}