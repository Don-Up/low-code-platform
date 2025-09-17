"use client"
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import TextPropComp from "@/app/components/Canvas/components/Text/TextPropComp";
import {removeComponent, updateComponent, updateFormData} from "@/store/componentSlice";
import {Comp} from "@/app/components/Canvas/components/type";
import ImagePropComp from "@/app/components/Canvas/components/Image/ImagePropComp";
import ButtonPropComp from "@/app/components/Canvas/components/Button/ButtonPropComp";
import InputPropComp from "@/app/components/Canvas/components/Input/InputPropComp";
import CardPropComp from "@/app/components/Canvas/components/Card/CardPropComp";
import {Button} from "antd";
import {useTranslation} from "@/hooks/useTranslation";
import {ContainerPropCompProp} from "@/app/components/Canvas/components/Container/ContainerPropCompProp";
import ContainerPropComp from "@/app/components/Canvas/components/Container/ContainerPropComp";
import {InputPropCompProp} from "@/app/components/Canvas/components/Input/InputPropCompProp";

export default function PropertyPanel() {


    const dispatch = useAppDispatch();
    const {selectedComponentId, components} = useAppSelector((state) => state.comp.present);
    const {t} = useTranslation()

    const {isPreviewMode} = useAppSelector((state) => state.comp.present)

    if (isPreviewMode) {
        return null
    }

    if (selectedComponentId === null) {
        return <div className={"flex-1 p-4 bg-white h-[calc(100vh-96px)] mx-2 my-2 round"}>
            <div className="text-2xl font-bold mb-4">{t("property")}</div>
            <div>{t("noComponentSelected")}</div>
        </div>
    }

    const findComponent = (comps: Comp[], id: string | null): Comp | undefined => {
        for (const comp of comps) {
            if (comp.id === id) return comp;
            if (comp.type === "container" && (comp as ContainerPropCompProp).children) {
                const found = findComponent((comp as ContainerPropCompProp).children || [], id);
                if (found) return found;
            }
        }
        return undefined;
    };

    const selectedComponent = findComponent(components, selectedComponentId);

    // const selectedComponent = components.find((component) => component.id === selectedComponentId);


    function handleCompChange(values: Comp) {
        dispatch(updateComponent({...selectedComponent, ...values}))
    }

    function getComp(selectedComponent: Comp | undefined) {
        if (selectedComponent !== undefined) {
            switch (selectedComponent.type) {
                case "text":
                    return <TextPropComp {...selectedComponent} onChange={handleCompChange}/>
                case "image":
                    return <ImagePropComp {...selectedComponent} onChange={handleCompChange}/>
                case "button":
                    return <ButtonPropComp {...selectedComponent} onChange={handleCompChange}/>
                case "input":
                    return <InputPropComp {...selectedComponent} onChange={(values: InputPropCompProp) => {
                        dispatch(updateFormData({id: values.id, value: values.value || ""}))
                        handleCompChange(values)
                    }}/>
                case "card":
                    return <CardPropComp {...selectedComponent} onChange={handleCompChange}/>
                case "container":
                    return <ContainerPropComp {...selectedComponent} onChange={handleCompChange}/>
            }
        }
        return <div>div</div>
    }

    function handleDelete() {
        dispatch(removeComponent(selectedComponentId!))
    }

    return (
        <div className="flex-1 p-4 bg-white h-[calc(100vh-96px)] mx-2 my-2 round">
            <div className="text-2xl font-bold">{t("property")}</div>
            <div>
                {getComp(selectedComponent)}
                <Button type={"primary"} danger onClick={handleDelete}>Delete</Button>
            </div>
        </div>
    );
}