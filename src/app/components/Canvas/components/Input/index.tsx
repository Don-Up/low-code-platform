import React from "react";
import {InputPropCompProp} from "@/app/components/Canvas/components/Input/InputPropCompProp";
import {setSelectComponentId} from "@/store/componentSlice";
import {useAppDispatch} from "@/store/hooks";
import {Input} from "antd";

const InputComp: React.FC<InputPropCompProp> = ({value, placeholder, id = null}) => {
    const dispatch = useAppDispatch()

    function handleClick() {
        dispatch(setSelectComponentId(id))
    }

    return (<div onClick={handleClick}>
        <Input value={value} placeholder={placeholder}/>
    </div>)
}

export default InputComp