import React from "react";
import {Card} from "antd";
import {useAppDispatch} from "@/store/hooks";
import {setSelectComponentId} from "@/store/componentSlice";
import {CardPropCompProp} from "@/app/components/Canvas/components/Card/CardPropCompProp";

const CardComp: React.FC<CardPropCompProp> = ({title, content, id = null}) => {
    const dispatch = useAppDispatch()

    function handleClick() {
        dispatch(setSelectComponentId(id))
    }

    return (<div onClick={handleClick}>
        <Card title={title}>
            <p className="text-gray-600">{content}</p>
        </Card>
    </div>)
}

export default CardComp