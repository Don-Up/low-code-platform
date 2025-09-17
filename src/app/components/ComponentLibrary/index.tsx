"use client";
import GridCell from "@/app/components/ComponentLibrary/components/GridCell";
import { useAppSelector } from "@/store/hooks";
import { useTranslation } from "@/hooks/useTranslation";
import { Tabs } from "antd";
import NodeTree from "@/app/components/NodeTree";

const { TabPane } = Tabs;

export default function LeftPanel() {
    const { isPreviewMode } = useAppSelector((state) => state.comp.present);
    const { t } = useTranslation();

    if (isPreviewMode) {
        return null;
    }

    const items = [
        {
            key: "1",
            label: t("componentLibrary"),
            children: (
                <div className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                        <GridCell bgColor={"bg-blue-500"} img={"button"} text={t("button")} />
                        <GridCell bgColor={"bg-green-500"} img={"text"} text={t("text")} />
                        <GridCell bgColor={"bg-purple-500"} img={"img"} text={t("image")} />
                        <GridCell bgColor={"bg-orange-500"} img={"input"} text={t("input")} />
                        <GridCell bgColor={"bg-pink-500"} img={"card"} text={t("card")} />
                        <GridCell bgColor={"bg-blue-600"} img={"container"} text={t("container")} />
                    </div>
                </div>
            ),
        },
        {
            key: "2",
            label: t("componentTree"),
            children: <NodeTree />,
        },
    ];

    return (
        <div className="flex-1 p-4 bg-white h-[calc(100vh-96px)] mx-2 my-2 rounded overflow-auto">
            <Tabs
                defaultActiveKey="1"
                className="h-full"
                tabBarStyle={{ fontWeight: "bold" }}
                items={items}
            />
        </div>
    );
}