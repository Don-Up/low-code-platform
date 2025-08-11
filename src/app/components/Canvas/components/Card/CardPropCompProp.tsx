import { CompType } from "@/app/components/Canvas/components/type";

export type CardPropCompProp = {
    id: string;
    type?: CompType;

    title?: string;
    content?: string;
    width?: number;
    height?: number;
    backgroundColor?: string;
    bordered?: boolean;
};

export const CardPropCompDefaultProp: CardPropCompProp = {
    id: "",
    type: "card",
    title: "Default Title",
    content: "Default Content",
    width: 300,
    height: 200,
    backgroundColor: "#ffffff",
    bordered: true,
};