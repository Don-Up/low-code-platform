import React, { useState, useCallback } from "react";
import { InputNumber, Input, ColorPicker, Button, List, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {ContainerPropCompProp} from "@/app/components/Canvas/components/Container/ContainerPropCompProp";
import {Comp} from "@/app/components/Canvas/components/type";

interface ContainerPropCompProps extends ContainerPropCompProp {
    onChange: (values: Comp) => void;
    isSelected?: boolean; // Optional for selection state
}

const ContainerPropComp: React.FC<ContainerPropCompProps> = ({
                                                                 id,
                                                                 style,
                                                                 children,
                                                                 onChange,
                                                                 isSelected,
                                                             }) => {
    const [localStyle, setLocalStyle] = useState<React.CSSProperties>(
        style || {}
    );

    const handleStyleChange = useCallback(
        (key: string, value: any) => {
            const newStyle = { ...localStyle, [key]: value };
            setLocalStyle(newStyle);
            onChange({ id, type: "container", style: newStyle, children });
        },
        [localStyle, onChange, id, children]
    );

    const handleRemoveChild = useCallback(
        (childId: string) => {
            if (children) {
                const newChildren = children.filter((child) => child.id !== childId);
                onChange({ id, type: "container", style: localStyle, children: newChildren });
            }
        },
        [children, localStyle, onChange, id]
    );

    return (
        <div className="p-4 space-y-4 mt-4">
            {/*/!* Width *!/*/}
            {/*<div>*/}
            {/*    <label className="block text-sm font-medium text-gray-700">Width (px)</label>*/}
            {/*    <InputNumber*/}
            {/*        value={localStyle.width || undefined}*/}
            {/*        onChange={(value) => handleStyleChange("width", value ? `${value}px` : undefined)}*/}
            {/*        placeholder="Auto"*/}
            {/*    />*/}
            {/*</div>*/}

            {/*/!* Height *!/*/}
            {/*<div>*/}
            {/*    <label className="block text-sm font-medium text-gray-700">Height (px)</label>*/}
            {/*    <InputNumber*/}
            {/*        value={localStyle.height ? parseInt(localStyle.height as string) : undefined}*/}
            {/*        onChange={(value) => handleStyleChange("height", value ? `${value}px` : undefined)}*/}
            {/*        placeholder="Auto"*/}
            {/*    />*/}
            {/*</div>*/}

            {/* Background Color */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Background Color</label>
                <ColorPicker
                    value={localStyle.backgroundColor}
                    onChange={(value) => handleStyleChange("backgroundColor", value.toHexString())}
                />
            </div>

            {/* Padding */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Padding (px)</label>
                <InputNumber
                    value={localStyle.padding ? parseInt(localStyle.padding as string) : undefined}
                    onChange={(value) => handleStyleChange("padding", value ? `${value}px` : undefined)}
                    placeholder="0"
                />
            </div>

            {/* Children List */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Nested Components</label>
                <List
                    dataSource={children || []}
                    renderItem={(child) => (
                        <List.Item
                            key={child.id}
                            actions={[
                                <Button
                                    key={`delete-${child.id}`}
                                    type="text"
                                    icon={<DeleteOutlined/>}
                                    onClick={() => handleRemoveChild(child.id)}
                                    danger
                                />,
                            ]}
                        >
                            {child.type} (ID: {child.id})
                        </List.Item>
                    )}
                    locale={{emptyText: "No nested components"}}
                />
            </div>
        </div>
    );
};

export default ContainerPropComp;