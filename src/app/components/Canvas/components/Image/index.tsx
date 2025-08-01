"use client";

import React from "react";
import { useAppDispatch } from "@/store/hooks";
import { setSelectComponentId } from "@/store/componentSlice";
import { ImagePropCompProp } from "./ImagePropCompProp";

const ImageComp: React.FC<ImagePropCompProp> = ({ src, width, height, id = null }) => {
    const dispatch = useAppDispatch();

    if (!src) {
        return <div className="cursor-pointer hover:bg-gray-100">No Image</div>;
    }

    function handleClick() {
        dispatch(setSelectComponentId(id));
    }

    console.log("size", width, height)

    return (
        <div className="cursor-pointer hover:bg-gray-100" onClick={handleClick}>
            <img src={src} alt="img" width={width} height={height} />
        </div>
    );
};

export default ImageComp;

// const ImageComp: React.FC<ImagePropCompProp> = ({src, width, height, id = null}) => {
//     const dispatch = useAppDispatch()
//
//     if(!src){
//         return <div>No Image</div>
//     }
//
//     function handleClick() {
//         dispatch(setSelectComponentId(id))
//     }
//
//     return (<div onClick={handleClick}>
//         <img src={src} alt={"img"} width={width} height={height}/>
//     </div>)
// }
//
// export default ImageComp