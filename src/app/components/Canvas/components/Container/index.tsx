import React from "react";
import { useAppDispatch } from "@/store/hooks";
import { addComponent } from "@/store/componentSlice";
import { nanoid } from "nanoid";
import { Comp } from "@/app/components/Canvas/components/type";
import {
    ContainerPropCompDefaultProp,
    ContainerPropCompProp,
} from "@/app/components/Canvas/components/Container/ContainerPropCompProp";
import { TextPropCompDefaultProp } from "@/app/components/Canvas/components/Text/TextPropCompProp";
import { ImagePropCompDefaultProp } from "@/app/components/Canvas/components/Image/ImagePropCompProp";
import { ButtonPropCompDefaultProp } from "@/app/components/Canvas/components/Button/ButtonPropCompProp";
import { InputPropCompDefaultProp } from "@/app/components/Canvas/components/Input/InputPropCompProp";
import { CardPropCompDefaultProp } from "@/app/components/Canvas/components/Card/CardPropCompProp";
import TextComp from "@/app/components/Canvas/components/Text"; //💡 Replaced getComp with direct imports
import ImageComp from "@/app/components/Canvas/components/Image";
import ButtonComp from "@/app/components/Canvas/components/Button";
import InputComp from "@/app/components/Canvas/components/Input";
import CardComp from "@/app/components/Canvas/components/Card";

interface ContainerProps extends ContainerPropCompProp {
    isSelected?: boolean; //💡 Added for selection support
}

export default function Container({ id, children, style, isSelected }: ContainerProps) {
    const dispatch = useAppDispatch();

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // Allow drop
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const componentType = e.dataTransfer.getData("componentType");
        let newComp: Comp;
        //💡===
        switch (componentType) {
            case "Text":
                newComp = { ...TextPropCompDefaultProp, id: nanoid(8) };
                break;
            case "Image":
                newComp = { ...ImagePropCompDefaultProp, id: nanoid(8) };
                break;
            case "Button":
                newComp = { ...ButtonPropCompDefaultProp, id: nanoid(8) };
                break;
            case "Input":
                newComp = { ...InputPropCompDefaultProp, id: nanoid(8) };
                break;
            case "Card":
                newComp = { ...CardPropCompDefaultProp, id: nanoid(8) };
                break;
            case "Container":
                newComp = { ...ContainerPropCompDefaultProp, id: nanoid(8) };
                break;
            default:
                return;
        }
        dispatch(addComponent({ ...newComp, parentId: id })); // Add with parentId to nest
        //💡---
    };

    //💡===
    // const renderChild = (child: Comp, isSelected: boolean = false) => {
    //     const commonProps = { ...child, isSelected };
    //     switch (child.type) {
    //         case "text":
    //             return <TextComp {...commonProps} />;
    //         case "image":
    //             return <ImageComp {...commonProps} />;
    //         case "button":
    //             return <ButtonComp {...commonProps} />;
    //         case "input":
    //             return <InputComp {...commonProps} />;
    //         case "card":
    //             return <CardComp {...commonProps} />;
    //         case "container":
    //             return <Container {...commonProps} />;
    //         default:
    //             return null;
    //     }
    // };
    const renderChild = (child: Comp, isParentSelected: boolean = false) => {
        // //💡===
        // const isSelected = child.id === child.parentId && isParentSelected ? isParentSelected : child.id === (child as any).selectedId; // Fallback check
        // const commonProps = { ...child, isSelected };
        // switch (child.type) {
        //     case "text":
        //         return <TextComp {...commonProps} />;
        //     case "image":
        //         return <ImageComp {...commonProps} />;
        //     case "button":
        //         return <ButtonComp {...commonProps} />;
        //     case "input":
        //         return <InputComp {...commonProps} />;
        //     case "card":
        //         return <CardComp {...commonProps} />;
        //     case "container":
        //         return <Container {...commonProps} />;
        //     default:
        //         return null;
        // }
        // //💡---
        const isSelected = child.id === child.parentId && isParentSelected ? isParentSelected : child.id === (child as any).selectedId; // Fallback check
        const commonProps = { ...child, isSelected };
        switch (child.type) {
            case "text":
                return <TextComp {...commonProps} />;
            case "image":
                return <ImageComp {...commonProps} />;
            case "button":
                return <ButtonComp {...commonProps} />;
            case "input":
                return <InputComp {...commonProps} />;
            case "card":
                return <CardComp {...commonProps} />;
            case "container":
                return <Container {...commonProps} />;
            default:
                return null;
        }
    };

    return (
        <div
            className={`border border-dashed border-gray-400 p-2 mb-2 ${isSelected ? "border-2 border-blue-500" : ""}`} //💡 Highlight when selected
            style={style}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {children && Array.isArray(children) ? children.map((child) => <div key={child.id}>renderChild(child)</div>) : null}
        </div>
    );
    //💡---
    //🚫===
    //{children?.map((child) => (getComp(child)))}
    //🚫---
}