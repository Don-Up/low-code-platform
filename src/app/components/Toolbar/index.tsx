"use client"
import {Button} from "antd";
import {EyeOutlined} from "@ant-design/icons";
import {useAppDispatch} from "@/store/hooks";
import {ActionCreators as UndoActionCreators} from "redux-undo";

export default function Toolbar() {

    const dispatch = useAppDispatch()

    return <div className={"h-20 flex bg-white select-none"}>
        <img src={"images/logo.svg"} className={"w-10 h-10 ml-4 my-auto"} alt={"logo"}/>
        <div className={"text-4xl leading-20 ml-2 font-comic font-bold text-main-blue"}>Low Code Editor</div>
        <div className="leading-20 ml-2 text-gray-400 italic mt-2 select-none">
            start design by dragging components
        </div>

        <img src={"images/undo.svg"} className={"w-5 ml-auto"} alt={"undo"}/>
        <div className={"leading-20 ml-1 hover:cursor-pointer"} onClick={() => dispatch(UndoActionCreators.undo())}>Undo</div>
        <img src={"images/redo.svg"} className={"w-5 ml-4"} alt={"redo"}/>
        <div className={"leading-20 ml-1 hover:cursor-pointer"} onClick={() => dispatch(UndoActionCreators.redo())}>Redo</div>
        <img src={"images/save.svg"} className={"w-5 ml-4"} alt={"save"}/>
        <div className={"leading-20 ml-1"}>Save</div>

        <Button type={"primary"} className={"my-auto mx-4"} size={"large"} icon={<EyeOutlined />}>
            Preview Mode
        </Button>
    </div>
}