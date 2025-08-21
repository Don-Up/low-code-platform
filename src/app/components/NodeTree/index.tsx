"use client";

import React from "react";
import { Tree } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Comp } from "@/app/components/Canvas/components/type";
import { useTranslation } from "@/hooks/useTranslation";
import { TextPropCompProp } from "@/app/components/Canvas/components/Text/TextPropCompProp";
import { setSelectComponentId, swapComponent } from "@/store/componentSlice";

const { TreeNode } = Tree;

type TreeDataItem = {
    key: string;
    title: string;
    children: TreeDataItem[];
};

export default function NodeTree() {
    const dispatch = useAppDispatch();
    const { components } = useAppSelector((state) => state.comp.present);
    const { t } = useTranslation();

    // Convert components to tree data structure
    const buildTreeData = (components: Comp[]): TreeDataItem[] => {
        return components.map((comp) => ({
            key: comp.id,
            title: `${comp.type} ${comp.type === "text" && (comp as TextPropCompProp).text ? `: ${(comp as TextPropCompProp).text}` : ""}`,
            children: [], // Initially empty; can be expanded for nested components
        }));
    };

    const treeData = buildTreeData(components);

    const handleSelect = (selectedKeys: React.Key[], info: { selected: boolean; node: any; event: "select" | "check" }) => {
        console.log("Selected node:", selectedKeys, info);
        dispatch(setSelectComponentId(info.node.key as string)); // Set selected component ID
    };

    const handleDrop = (info: any) => {
        const dropKey = info.node.key;
        const dragKey = info.dragNode.key;
        const dropPos = info.node.pos.split("-");
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

        const data = [...components];
        const dragIndex = data.findIndex((item) => item.id === dragKey);
        const dropIndex = data.findIndex((item) => item.id === dropKey);

        // Determine the new index based on drop position
        let newIndex;
        if (dropPosition === -1) {
            newIndex = dropIndex;
        } else if (dropPosition === 1) {
            newIndex = dropIndex + 1;
        } else {
            newIndex = dropIndex;
        }

        // Ensure indices are valid
        if (dragIndex !== -1 && newIndex !== -1 && dragIndex !== newIndex) {
            // Swap components in the Redux store
            dispatch(swapComponent({ oldIndex: dragIndex, newIndex }));
        }
    };

    return (
        <div className="p-4 bg-white h-[calc(100vh-96px)] overflow-auto custom-scrollbar">
            <Tree
                showLine
                defaultExpandAll
                treeData={treeData}
                className="w-full"
                draggable
                onDrop={handleDrop}
                titleRender={(nodeData) => (
                    <span className="text-sm">
            {nodeData.title}
          </span>
                )}
                onSelect={handleSelect}
            />
        </div>
    );
}