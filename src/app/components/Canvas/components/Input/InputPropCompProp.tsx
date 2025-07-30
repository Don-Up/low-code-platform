import {CompType} from "@/app/components/Canvas/components/type";

export type InputPropCompProp = {
    id: string;
    type?: CompType;

    value?: string;
    placeholder?: string;
}

export const InputPropCompDefaultProp: InputPropCompProp = {
    id: "",
    type: "input",
    value: "",
    placeholder: "Input Text",
}