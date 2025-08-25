"use client"
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {Comp} from "@/app/components/Canvas/components/type";
import TextComp from "@/app/components/Canvas/components/Text";
import {addComponent, swapComponent} from "@/store/componentSlice";
import ImageComp from "@/app/components/Canvas/components/Image";
import ButtonComp from "@/app/components/Canvas/components/Button";
import InputComp from "@/app/components/Canvas/components/Input";
import CardComp from "@/app/components/Canvas/components/Card";
import SortableContainer from "@/app/components/DragSort/SortableContainer";
import SortableItem from "@/app/components/DragSort/SortableItem";
import {TextPropCompDefaultProp} from "@/app/components/Canvas/components/Text/TextPropCompProp";
import {nanoid} from "nanoid";
import {ImagePropCompDefaultProp} from "@/app/components/Canvas/components/Image/ImagePropCompProp";
import {ButtonPropCompDefaultProp} from "@/app/components/Canvas/components/Button/ButtonPropCompProp";
import {InputPropCompDefaultProp} from "@/app/components/Canvas/components/Input/InputPropCompProp";
import {CardPropCompDefaultProp} from "@/app/components/Canvas/components/Card/CardPropCompProp";
import {useTranslation} from "@/hooks/useTranslation";
import Container from "@/app/components/Canvas/components/Container";
import {
    ContainerPropCompDefaultProp,
    ContainerPropCompProp
} from "@/app/components/Canvas/components/Container/ContainerPropCompProp";

export function getComp(comp: Comp, isSelected: boolean = false) {
    const commonProps = { ...comp, isSelected }; // Pass isSelected to indicate selection
    switch (comp.type) {
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
    }
}

export default function Canvas() {

    const dispatch = useAppDispatch();
    const {components, isPreviewMode, selectedComponentId} = useAppSelector((state) => state.comp.present);
    const {t} = useTranslation();

    function handleDragEnd(oldIndex: number, newIndex: number) {
        // Swap the component
        if (!isPreviewMode)
            dispatch(swapComponent({oldIndex, newIndex}))
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        if (!isPreviewMode)
            e.preventDefault(); // 允许放下
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        if (!isPreviewMode) {
            e.preventDefault();

            const componentType = e.dataTransfer.getData('componentType');
            // 根据拖拽类型添加对应组件
            switch (componentType) {
                case 'Text':
                    // 添加到 Canvas（这里可根据鼠标位置设置 x, y）
                    dispatch(addComponent({...TextPropCompDefaultProp, id: nanoid(8)}))
                    break;
                case 'Image':
                    dispatch(addComponent({...ImagePropCompDefaultProp, id: nanoid(8)}))
                    break;
                case 'Button':
                    dispatch(addComponent({...ButtonPropCompDefaultProp, id: nanoid(8)}))
                    break;
                case 'Input':
                    dispatch(addComponent({...InputPropCompDefaultProp, id: nanoid(8)}))
                    break;
                case 'Card':
                    dispatch(addComponent({...CardPropCompDefaultProp, id: nanoid(8)}))
                    break;
                case "Container":
                    dispatch(addComponent({...ContainerPropCompDefaultProp, id: nanoid(8)}))
                    break;
                default:
                    return;
            }
        }
        // if (!isPreviewMode) {
        //     e.preventDefault();
        //     //💡=== Check if drop target is not a Container by inspecting the target element
        //     const target = e.target as HTMLElement;
        //     const isInsideContainer = target.closest(".border-dashed") !== null; // Check if inside a Container's dashed border
        //     if (isInsideContainer) return; // Do nothing if dropped inside a Container
        //
        //     const componentType = e.dataTransfer.getData("componentType");
        //     //💡=== Add component only if dropped on Canvas (not Container)
        //     let newComp: Comp;
        //     switch (componentType) {
        //         case "Text":
        //             newComp = {...TextPropCompDefaultProp, id: nanoid(8)};
        //             break;
        //         case "Image":
        //             newComp = {...ImagePropCompDefaultProp, id: nanoid(8)};
        //             break;
        //         case "Button":
        //             newComp = {...ButtonPropCompDefaultProp, id: nanoid(8)};
        //             break;
        //         case "Input":
        //             newComp = {...InputPropCompDefaultProp, id: nanoid(8)};
        //             break;
        //         case "Card":
        //             newComp = {...CardPropCompDefaultProp, id: nanoid(8)};
        //             break;
        //         case "Container":
        //             newComp = {...ContainerPropCompDefaultProp, id: nanoid(8)};
        //             break;
        //         default:
        //             return;
        //     }
        //     dispatch(addComponent(newComp)); // Add to root level only
        // }
    };

    const renderNestedComponents = (comp: Comp) => {
        // if (comp.type === "container") {
        //     const children = (comp as ContainerPropCompProp).children
        //     return (
        //         <Container {...comp}>
        //             {children}
        //         </Container>
        //     );
        // }
        // return getComp(comp);
        const isSelected = comp.id === selectedComponentId; // Check if this component is selected
        if (comp.type === "container" && (comp as ContainerPropCompProp).children) {
            return (
                <Container {...comp} isSelected={isSelected}>
                    {(comp as ContainerPropCompProp).children}
                </Container>
            );
        }
        return getComp(comp, isSelected); // Pass isSelected to leaf components
    };

    return (
        <SortableContainer items={components} onDragEnd={handleDragEnd}>
            <div className="flex-2 p-4 bg-white h-[calc(100vh-96px)] overflow-auto custom-scrollbar mx-2 my-2 round"
                 onDragOver={handleDragOver}
                 onDrop={handleDrop}>
                <div className="text-2xl font-bold">{t("canvas")}</div>
                <div className={"flex flex-col gap-2 mt-5"}>
                    {components.map(comp => <div key={comp.id}>
                        <SortableItem id={comp.id} key={comp.id}>
                            {/*{getComp(comp)}*/}
                            {renderNestedComponents(comp)}
                        </SortableItem>
                    </div>)}
                </div>
            </div>
        </SortableContainer>
    );
}