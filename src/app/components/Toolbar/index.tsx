"use client";

import { Button, Modal, Input } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import { setPreviewMode } from "@/store/componentSlice";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";
import { toast } from "react-toastify";
import { createCanvas } from "@/lib/request"; // Import the API function
import { Components } from "@/lib/models";
import {useState} from "react"; // Import the Components type

export default function Toolbar() {
    const dispatch = useAppDispatch();
    const { components, isPreviewMode } = useAppSelector((state) => state.comp.present);
    const { t } = useTranslation();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [canvasTitle, setCanvasTitle] = useState("");

    const handleSave = () => {
        setIsModalVisible(true);
    };

    const handleModalOk = async () => {
        if (!canvasTitle.trim()) {
            toast.error("Please enter a canvas name.");
            return;
        }

        try {
            const canvasData = {
                title: canvasTitle.trim(),
                components: components as Components, // Type assertion to match Components type
            };
            const savedCanvas = await createCanvas(canvasData);
            toast.success("Canvas saved successfully!");
            console.log("Saved canvas:", savedCanvas);
            setIsModalVisible(false);
            setCanvasTitle(""); // Reset title after save
        } catch (error) {
            toast.error("Failed to save canvas. Please try again.");
            console.error("Save error:", error);
        }
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        setCanvasTitle(""); // Reset title if canceled
    };

    const handleTogglePreview = () => {
        dispatch(setPreviewMode(!isPreviewMode));
    };

    return (
        <div className={"h-20 flex bg-white select-none"}>
            <img src={"images/logo.svg"} className={"w-10 h-10 ml-4 my-auto"} alt={"logo"} />
            <div className={"text-4xl leading-20 ml-2 font-comic font-bold text-main-blue"}>Low Code Editor</div>
            <div className={"leading-20 ml-2 text-gray-400 italic mt-2 select-none"}>
                start design by dragging components
            </div>

            <img src={"images/undo.svg"} className={"w-5 ml-auto"} alt={"undo"} />
            <div
                className={"leading-20 ml-1 hover:cursor-pointer"}
                onClick={() => dispatch(UndoActionCreators.undo())}
            >
                {t("undo")}
            </div>
            <img src={"images/redo.svg"} className={"w-5 ml-4"} alt={"redo"} />
            <div
                className={"leading-20 ml-1 hover:cursor-pointer"}
                onClick={() => dispatch(UndoActionCreators.redo())}
            >
                {t("redo")}
            </div>
            <img src={"images/save.svg"} className={"w-5 ml-4"} alt={"save"} />
            <div className={"leading-20 ml-1"} onClick={handleSave}>
                {t("save")}
            </div>

            <Button
                type={"primary"}
                className={"my-auto mx-4"}
                size={"large"}
                icon={<EyeOutlined />}
                onClick={handleTogglePreview}
                data-testid={"preview-button"}
            >
                {!isPreviewMode ? t("previewMode") : t("exitPreview")}
            </Button>

            <LanguageSwitcher />

            <Modal
                title={t("saveCanvas")}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                okText={t("save")}
                cancelText={t("cancel")}
                confirmLoading={false} // Set to true if needed during async save
            >
                <Input
                    placeholder={t("enterCanvasName")}
                    value={canvasTitle}
                    onChange={(e) => setCanvasTitle(e.target.value)}
                    className="w-full mt-4"
                    autoFocus
                />
            </Modal>
        </div>
    );
}