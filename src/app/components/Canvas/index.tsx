"use client"
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {Comp} from "@/app/components/Canvas/components/type";
import TextComp from "@/app/components/Canvas/components/Text";
import {useEffect, useRef} from "react";
import {clearComponents} from "@/store/componentSlice";

export default function Canvas() {

    useEffect(() => {
        dispatch(clearComponents())
    }, []);

    const dispatch = useAppDispatch();
    const components = useAppSelector((state) => state.comp.components);

    function getComp(comp: Comp) {
        if (comp.type === "text") {
            return <TextComp {...comp}/>
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