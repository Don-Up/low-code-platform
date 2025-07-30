import {CompType} from "@/app/components/Canvas/components/type";

export type InputPropCompProp = {
    id?: string | null;
    type?: CompType;

    value?: string;
    placeholder?: string;
}

export const InputPropCompDefaultProp: InputPropCompProp = {
    type: "input",
    value: "",
    placeholder: "Input Text",
}