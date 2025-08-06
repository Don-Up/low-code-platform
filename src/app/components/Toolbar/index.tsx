"use client"
import {Button, message} from "antd";
import {EyeOutlined} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {ActionCreators as UndoActionCreators} from "redux-undo";
import {Comp} from "@/app/components/Canvas/components/type";
import {loadState, setPreviewMode} from "@/store/componentSlice";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import {useTranslation} from "@/hooks/useTranslation";

export default function Toolbar() {

    const dispatch = useAppDispatch()
    const { components, isPreviewMode } = useAppSelector(state => state.comp.present)
    const { t } = useTranslation()
    const [messageApi, contextHolder] = message.useMessage();

    const handleSave = () => {
        const stateToSave = JSON.stringify( components)
        // Option 1: Save the state to local storage
        localStorage.setItem("canvasState", stateToSave)
        messageApi.info("State saved to localStorage!")

        // Option 2: Download it as a JSON file
        // const blob = new Blob([stateToSave], {type: "application/json"})
        // const url = window.URL.createObjectURL(blob)
        // const link = document.createElement("a")
        // link.href = url
        // link.download = `canvas-state-${new Date().toISOString()}.json`
        // document.body.appendChild(link)
        // link.click()
        // document.body.removeChild(link)
        // window.URL.revokeObjectURL(url)
    }

    const handleLoad = () => {
        // Option 1: Load the state from local storage
        const savedStorage = localStorage.getItem("canvasState")
        if (savedStorage) {
            try {
                const parsedComponents = JSON.parse(savedStorage) as Comp[]
                dispatch(loadState(parsedComponents))
                messageApi.info("State loaded from localStorage!")
            } catch (error) {
                messageApi.error("Failed to load state!")
                console.log(error)
            }
        }

        // 选项 2：从上传的文件加载（需扩展）
        // 示例：处理 file input 事件，解析 JSON
    }

    const handleTogglePreview = () => {
        dispatch(setPreviewMode(!isPreviewMode))
    };

    return <>
        {contextHolder}
        <div className={"h-20 flex bg-white select-none"}>
            <img src={"images/logo.svg"} className={"w-10 h-10 ml-4 my-auto"} alt={"logo"}/>
            <div className={"text-4xl leading-20 ml-2 font-comic font-bold text-main-blue"}>Low Code Editor</div>
            <div className="leading-20 ml-2 text-gray-400 italic mt-2 select-none">
                start design by dragging components
            </div>

            <img src={"images/undo.svg"} className={"w-5 ml-auto"} alt={"undo"}/>
            <div className={"leading-20 ml-1 hover:cursor-pointer"}
                 onClick={() => dispatch(UndoActionCreators.undo())}>{t("undo")}</div>
            <img src={"images/redo.svg"} className={"w-5 ml-4"} alt={"redo"}/>
            <div className={"leading-20 ml-1 hover:cursor-pointer"}
                 onClick={() => dispatch(UndoActionCreators.redo())}>{t("redo")}</div>
            <img src={"images/save.svg"} className={"w-5 ml-4"} alt={"save"}/>
            <div className={"leading-20 ml-1"} onClick={handleSave}>{t("save")}</div>

            <Button type={"primary"} className={"my-auto mx-4"} size={"large"} icon={<EyeOutlined/>}
                    onClick={handleTogglePreview} data-testid={"preview-button"}>
                {!isPreviewMode ? t("previewMode") : t("exitPreview")}
            </Button>

            <LanguageSwitcher/>
        </div>
    </>
}