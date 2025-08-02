import { CompType } from "@/app/components/Canvas/components/type";

export type TextPropCompProp = {
    id: string;
    type?: CompType;

    text?: string;
    color?: string;
    fontSize?: number;
    textAlign?: "left" | "center" | "right";
    fontWeight?: "normal" | "bold";
    disabled?: boolean;
};

export const TextPropCompDefaultProp: TextPropCompProp = {
    id: "",
    type: "text",
    text: "Default Text",
    color: "#000000",
    fontSize: 16,
    textAlign: "left",
    fontWeight: "normal",
    disabled: false,
};