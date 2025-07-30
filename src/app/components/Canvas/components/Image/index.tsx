import React from "react";
import {ImagePropCompProp} from "@/app/components/Canvas/components/Image/ImagePropCompProp";
import {setSelectComponentId} from "@/store/componentSlice";
import {useAppDispatch} from "@/store/hooks";

const ImageComp: React.FC<ImagePropCompProp> = ({src, width, height, id = null}) => {
    const dispatch = useAppDispatch()

    if(!src){
        return <div>No Image</div>
    }

    function handleClick() {
        dispatch(setSelectComponentId(id))
    }

    return (<div onClick={handleClick}>
        <img src={src} alt={"img"} width={width} height={height}/>
    </div>)
}

export default ImageComp