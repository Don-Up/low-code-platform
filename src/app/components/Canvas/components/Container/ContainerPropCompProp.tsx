import {BaseCompProp, Comp} from "@/app/components/Canvas/components/type";

export type ContainerPropCompProp = BaseCompProp & {
    children?: Comp[];
    style?: React.CSSProperties;
};

export const ContainerPropCompDefaultProp: ContainerPropCompProp = {
    id: "",
    type: "container",
    children: [],
    style: {},
};