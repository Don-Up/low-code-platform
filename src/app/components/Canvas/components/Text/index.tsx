"use client";

import React from "react";
import { Typography } from "antd";
import { useAppDispatch } from "@/store/hooks";
import { setSelectComponentId } from "@/store/componentSlice";
import { TextPropCompProp } from "./TextPropCompProp";

const { Text } = Typography;

const TextComp: React.FC<TextPropCompProp> = ({
                                                  text,
                                                  color,
                                                  fontSize,
                                                  textAlign,
                                                  fontWeight,
                                                  disabled = false,
                                                  id = null,
                                              }) => {
    const dispatch = useAppDispatch();

    const textStyle = {
        color: color || undefined,
        fontSize: fontSize ? `${fontSize}px` : "16px", // 默认 16px
        textAlign: textAlign || "left",
        fontWeight: fontWeight || "normal",
        opacity: disabled ? 0.5 : 1, // 禁用时降低透明度
    };

    function handleClick() {
        console.log("setSelectComponentId", id)
        dispatch(setSelectComponentId(id));
    }

    return (
        <div className="cursor-pointer hover:bg-gray-100 flex" onClick={handleClick}>
            <Text style={textStyle} disabled={disabled} className={"flex-1"}>
                {text}
            </Text>
        </div>
    );
};

export default TextComp;