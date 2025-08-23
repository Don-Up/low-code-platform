import React from "react";
import {useAppDispatch} from "@/store/hooks";
import {addComponent} from "@/store/componentSlice";
import {nanoid} from "nanoid";
import {Comp} from "@/app/components/Canvas/components/type";
import {
    ContainerPropCompDefaultProp,
    ContainerPropCompProp
} from "@/app/components/Canvas/components/Container/ContainerPropCompProp";
import {TextPropCompDefaultProp} from "@/app/components/Canvas/components/Text/TextPropCompProp";
import {ImagePropCompDefaultProp} from "@/app/components/Canvas/components/Image/ImagePropCompProp";
import {ButtonPropCompDefaultProp} from "@/app/components/Canvas/components/Button/ButtonPropCompProp";
import {InputPropCompDefaultProp} from "@/app/components/Canvas/components/Input/InputPropCompProp";
import {CardPropCompDefaultProp} from "@/app/components/Canvas/components/Card/CardPropCompProp";
import {getComp} from "@/app/components/Canvas";


export default function Container({id, children, style}: ContainerPropCompProp) {
    const dispatch = useAppDispatch();

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // Allow drop
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const componentType = e.dataTransfer.getData("componentType");
        let newComp: Comp;
        switch (componentType) {
            case "Text":
                newComp = {...TextPropCompDefaultProp, id: nanoid(8)};
                break;
            case "Image":
                newComp = {...ImagePropCompDefaultProp, id: nanoid(8)};
                break;
            case "Button":
                newComp = {...ButtonPropCompDefaultProp, id: nanoid(8)};
                break;
            case "Input":
                newComp = {...InputPropCompDefaultProp, id: nanoid(8)};
                break;
            case "Card":
                newComp = {...CardPropCompDefaultProp, id: nanoid(8)};
                break;
            case "Container":
                newComp = {...ContainerPropCompDefaultProp, id: nanoid(8)};
                break;
            default:
                return;
        }
        dispatch(addComponent({...newComp, parentId: id})); // Add with parentId to nest
    };

    return (
        <div
            className="border border-dashed border-gray-400 p-2 mb-2"
            style={style}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {children?.map((child) => (getComp(child)))}
        </div>
    );
}