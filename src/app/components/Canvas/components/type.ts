import {TextPropCompProp} from "@/app/components/Canvas/components/Text/TextPropCompProp";
import {ImagePropCompProp} from "@/app/components/Canvas/components/Image/ImagePropCompProp";
import {ButtonPropCompProp} from "@/app/components/Canvas/components/Button/ButtonPropCompProp";

export type Comp = TextPropCompProp | ImagePropCompProp | ButtonPropCompProp;

export type CompType = "text" | "button" | "image" | "card" | "input" | "container"