import GridCell from "@/app/components/ComponentLibrary/components/GridCell";
import {getLocaleFromCookies, translations} from "@/lib/locale";
import {cookies} from "next/headers";

export default async function ComponentLibrary() {

    const locale = getLocaleFromCookies((await cookies()).toString());


    return (
        <div className="flex-1 p-4 bg-white h-[calc(100vh-96px)] mx-2 my-2 round">
            <div className="text-2xl font-bold">{translations[locale].componentLibrary}</div>
            <div className="grid grid-cols-2 gap-4 p-4">
                <GridCell bgColor={"bg-blue-500"} img={"button"} text={translations[locale].button}/>
                <GridCell bgColor={"bg-green-500"} img={"text"} text={translations[locale].text}/>
                <GridCell bgColor={"bg-purple-500"} img={"img"} text={translations[locale].image}/>
                <GridCell bgColor={"bg-orange-500"} img={"input"} text={translations[locale].input}/>
                <GridCell bgColor={"bg-pink-500"} img={"card"} text={translations[locale].card}/>
                <GridCell bgColor={"bg-blue-600"} img={"container"} text={translations[locale].container}/>
            </div>
        </div>
    );
}