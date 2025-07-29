"use client"
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import TextPropComp from "@/app/components/Canvas/components/Text/TextPropComp";
import {TextPropCompProp} from "@/app/components/Canvas/components/Text/TextPropCompProp";
import {updateComponent} from "@/store/componentSlice";
import {Comp} from "@/app/components/Canvas/components/type";

export default function PropertyPanel() {

    const dispatch = useAppDispatch();
    const { selectedComponentId, components} = useAppSelector((state) => state.comp);

    if(selectedComponentId === null) {
        return <div className={"flex-1 p-4 bg-white h-[calc(100vh-96px)] mx-2 my-2 round"}>
            <div className="text-2xl font-bold mb-4">Property</div>
            <div>No Component Selected</div>
        </div>
    }

    const selectedComponent = components.find((component) => component.id === selectedComponentId);


    function handleTextChange(values: TextPropCompProp) {
        dispatch(updateComponent({...selectedComponent, ...values}))
    }

    function getComp(selectedComponent: Comp | undefined) {
        if(selectedComponent !== undefined){
            if(selectedComponent.type === "text"){
                return <TextPropComp {...selectedComponent} onChange={handleTextChange}/>
            }
        }
        return <div>div</div>
    }

    return (
        <div className="flex-1 p-4 bg-white h-[calc(100vh-96px)] mx-2 my-2 round">
            <div className="text-2xl font-bold">Property</div>
            <div>
                {getComp(selectedComponent)}
            </div>
        </div>
    );
}