"use client"
import GridCell from "@/app/components/ComponentLibrary/components/GridCell";
import {useAppSelector} from "@/store/hooks";
import {useTranslation} from "@/hooks/useTranslation";

export default function ComponentLibrary() {

    const {isPreviewMode} = useAppSelector((state) => state.comp.present)
    const {t} = useTranslation()

    if(isPreviewMode){
        return null
    }

    return (
        <div className="flex-1 p-4 bg-white h-[calc(100vh-96px)] mx-2 my-2 round">
            <div className="text-2xl font-bold">{t("componentLibrary")}</div>
            <div className="grid grid-cols-2 gap-4 p-4">
                <GridCell bgColor={"bg-blue-500"} img={"button"} text={t("button")}/>
                <GridCell bgColor={"bg-green-500"} img={"text"} text={t("text")}/>
                <GridCell bgColor={"bg-purple-500"} img={"img"} text={t("image")}/>
                <GridCell bgColor={"bg-orange-500"} img={"input"} text={t("input")}/>
                <GridCell bgColor={"bg-pink-500"} img={"card"} text={t("card")}/>
                <GridCell bgColor={"bg-blue-600"} img={"container"} text={t("container")}/>
            </div>
        </div>
    );
}