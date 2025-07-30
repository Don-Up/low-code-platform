import {CompType} from "@/app/components/Canvas/components/type";

export type CardPropCompProp = {
    id: string;
    type?: CompType;

    title?: string;
    content?: string;
}

export const CardPropCompDefaultProp: CardPropCompProp = {
    id: "",
    type: "card",
    title: "Default Title",
    content: "Default Content"
}