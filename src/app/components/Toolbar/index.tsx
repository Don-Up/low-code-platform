"use client";

import { Button, Modal, Input } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import {clearComponents, setPreviewMode} from "@/store/componentSlice";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";
import { toast } from "react-toastify";
import { createCanvas } from "@/lib/request"; // Import the API function
import { Components } from "@/lib/models";
import {useState} from "react";
import {Comp} from "@/app/components/Canvas/components/type";
import {ContainerPropCompProp} from "@/app/components/Canvas/components/Container/ContainerPropCompProp"; // Import the Components type

const generateReactCode = (components: Comp[]): string => {
    const imports = `
import React from "react";
import TextComp from "./components/Canvas/components/Text";
import ImageComp from "./components/Canvas/components/Image";
import ButtonComp from "./components/Canvas/components/Button";
import InputComp from "./components/Canvas/components/Input";
import CardComp from "./components/Canvas/components/Card";
import Container from "./components/Canvas/components/Container";
  `.trim();

    const renderComponent = (comp: Comp): string => {
        //💡===
        const props = Object.entries(comp)
            .filter(([key]) => key !== "children" && key !== "parentId")
            .map(([key, value]) => {
                // Handle style object separately
                if (key === "style" && value) {
                    return `style={${JSON.stringify(value)}}`;
                }
                // Convert other values to JSON string for props
                return `${key}={${JSON.stringify(value)}}`;
            })
            .filter(Boolean)
            .join(" ");
        //💡---

        if (comp.type === "container" && (comp as ContainerPropCompProp).children) {
            //💡===
            const children = (comp as ContainerPropCompProp).children
                ?.filter((child): child is Comp => child !== undefined)
                .map(renderComponent)
                .join("\n") || "";
            return `<Container ${props} id="${comp.id}">\n${children}\n</Container>`;
            //💡---
        }
        return `<${comp.type === "text" ? "TextComp" : comp.type === "image" ? "ImageComp" : comp.type === "button" ? "ButtonComp" : comp.type === "input" ? "InputComp" : "CardComp"} ${props} id="${comp.id}" />`;
    };

    const body = components
        .filter((comp) => !comp.parentId)
        .map(renderComponent)
        .join("\n");

    return `${imports}\n\nconst CanvasExport: React.FC = () => {\n  return (\n    <div>\n${body}\n    </div>\n  );\n};\n\nexport default CanvasExport;`;
};

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

    function handleClear() {
        dispatch(clearComponents())
    }

    const formData = useAppSelector((state) => state.comp.present.formData);

    const handleExportForm = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2));
        const downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "form_data.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        document.body.removeChild(downloadAnchorNode);
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

            <Button size={"large"} onClick={handleExportForm} className="my-auto ml-4">Export Form Data</Button>

            <Button
                type={"default"}
                size={"large"}
                className={"my-auto ml-4"}
                onClick={() => {
                    const reactCode = generateReactCode(components);
                    console.log(reactCode);
                }}
            >
                Generate Code
            </Button>

            <Button
                type={"default"}
                size={"large"}
                className={"my-auto ml-4"}
                onClick={handleClear}
                >
                Clear
            </Button>

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