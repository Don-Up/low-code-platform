import GridCell from "@/app/components/ComponentLibrary/components/GridCell";

export default function ComponentLibrary() {
    return (
        <div className="flex-1 p-4 bg-white h-[calc(100vh-96px)] mx-2 my-2 round">
            <div className="text-2xl font-bold">Component Library</div>
            <div className="grid grid-cols-2 gap-4 p-4">
                <GridCell bgColor={"bg-blue-500"} img={"button"} text={"Button"}/>
                <GridCell bgColor={"bg-green-500"} img={"text"} text={"Text"}/>
                <GridCell bgColor={"bg-purple-500"} img={"img"} text={"Image"}/>
                <GridCell bgColor={"bg-orange-500"} img={"input"} text={"Input"}/>
                <GridCell bgColor={"bg-pink-500"} img={"card"} text={"Card"}/>
                <GridCell bgColor={"bg-blue-600"} img={"container"} text={"Container"}/>
            </div>
        </div>
    );
}
