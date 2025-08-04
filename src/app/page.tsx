import Toolbar from "@/app/components/Toolbar";
import ComponentLibrary from "@/app/components/ComponentLibrary";
import Canvas from "@/app/components/Canvas";
import PropertyPanel from "@/app/components/PropertyPanel";

export default function Home() {

    return (
        <div className={"h-screen bg-gray-100"}>
            <Toolbar/>
            <div className={"flex"}>
                <ComponentLibrary/>
                <Canvas/>
                <PropertyPanel/>
            </div>
        </div>
    );
}
