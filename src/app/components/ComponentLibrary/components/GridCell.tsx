import React from "react";


interface GridCellProps {
    bgColor: string;
    img: string;
    text: string;
}

const GridCell: React.FC<GridCellProps> = ({bgColor, img, text}) => {


    const divClass = `w-20 h-20 rounded-[20px] ${bgColor}`

    return (<div className="flex flex-col items-center justify-center p-4 hover:bg-gray-100">
        <div
            className={divClass}
        >
            <img src={`images/${img}.svg`} className={"w-10 h-10 mx-auto mt-5"} alt={img}/>
        </div>
        <div className="mt-2">{text}</div>
    </div>)
}

export default GridCell