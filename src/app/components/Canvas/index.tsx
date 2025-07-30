"use client"
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {Comp} from "@/app/components/Canvas/components/type";
import TextComp from "@/app/components/Canvas/components/Text";
import {useEffect, useRef} from "react";
import {clearComponents} from "@/store/componentSlice";
import ImageComp from "@/app/components/Canvas/components/Image";
import ButtonComp from "@/app/components/Canvas/components/Button";
import InputComp from "@/app/components/Canvas/components/Input";
import CardComp from "@/app/components/Canvas/components/Card";

export default function Canvas() {

    useEffect(() => {
        dispatch(clearComponents())
    }, []);

    const dispatch = useAppDispatch();
    const components = useAppSelector((state) => state.comp.components);

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

    return (
        <div className="flex-2 p-4 bg-white h-[calc(100vh-96px)] mx-2 my-2 round">
            <div className="text-2xl font-bold">Canvas</div>
            <div className={"flex flex-col gap-2 mt-5"}>
                {components.map(comp => <div key={comp.id}>
                    {getComp(comp)}
                </div>)}
            </div>
        </div>
    );
}