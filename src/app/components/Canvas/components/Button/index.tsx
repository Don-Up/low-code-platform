import React from "react";
import {Button} from "antd";
import {ButtonPropCompProp} from "@/app/components/Canvas/components/Button/ButtonPropCompProp";
import {useAppDispatch} from "@/store/hooks";
import {setSelectComponentId} from "@/store/componentSlice";

const ButtonComp: React.FC<ButtonPropCompProp> = ({text, width, height, id = null}) => {
    const dispatch = useAppDispatch()

    const btnClass = `w-[${width}px] h-[${height}px]`

    function handleClick() {
        dispatch(setSelectComponentId(id))
    }

    return (<div onClick={handleClick}>
        <Button type={"primary"} className={btnClass}>{text}</Button>
    </div>)
}

export default ButtonComp