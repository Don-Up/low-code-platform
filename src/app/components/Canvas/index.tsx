"use client"
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {Comp} from "@/app/components/Canvas/components/type";
import TextComp from "@/app/components/Canvas/components/Text";
import {useEffect} from "react";
import {addComponent, clearComponents, swapComponent} from "@/store/componentSlice";
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

export default function Canvas() {


    useEffect(() => {
        dispatch(clearComponents())
    }, []);

    const dispatch = useAppDispatch();
    const components = useAppSelector((state) => state.comp.present.components);
    const {t} = useTranslation();

    function getComp(comp: Comp) {
        switch (comp.type) {
            case "text":
                return <TextComp {...comp}/>
            case "image":
                return <ImageComp {...comp}/>
            case "button":
                return <ButtonComp {...comp}/>
            case "input":
                return <InputComp  {...comp}/>
            case "card":
                return <CardComp {...comp}/>
        }
        return <div>null</div>
    }

    function handleDragEnd(oldIndex: number, newIndex: number) {
        // Swap the component
        dispatch(swapComponent({oldIndex, newIndex}))
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // 允许放下
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
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
            default:
                return;
        }
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
                            {getComp(comp)}
                        </SortableItem>
                    </div>)}
                </div>
            </div>
        </SortableContainer>
    );
}