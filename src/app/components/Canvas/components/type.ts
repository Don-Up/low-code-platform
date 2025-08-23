import {TextPropCompProp} from "@/app/components/Canvas/components/Text/TextPropCompProp";
import {ImagePropCompProp} from "@/app/components/Canvas/components/Image/ImagePropCompProp";
import {ButtonPropCompProp} from "@/app/components/Canvas/components/Button/ButtonPropCompProp";
import {CardPropCompProp} from "@/app/components/Canvas/components/Card/CardPropCompProp";
import {InputPropCompProp} from "@/app/components/Canvas/components/Input/InputPropCompProp";
import {ContainerPropCompProp} from "@/app/components/Canvas/components/Container/ContainerPropCompProp";

export interface BaseCompProp {
    id: string;
    type: CompType;
    parentId?: string; //💡 New field for nesting
}

export type Comp = TextPropCompProp | ImagePropCompProp | ButtonPropCompProp | CardPropCompProp | InputPropCompProp | ContainerPropCompProp;

export type CompType = "text" | "button" | "image" | "card" | "input" | "container"