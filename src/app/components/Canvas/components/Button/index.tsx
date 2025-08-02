"use client";

import React from "react";
import { Button as AntdButton } from "antd";
import { useAppDispatch } from "@/store/hooks";
import { setSelectComponentId } from "@/store/componentSlice";
import { ButtonPropCompProp } from "./ButtonPropCompProp";

const ButtonComp: React.FC<ButtonPropCompProp> = ({
                                                      text,
                                                      textColor,
                                                      textSize,
                                                      width,
                                                      height,
                                                      btnType = "default",
                                                      bgColor,
                                                      disabled = false,
                                                      id = null,
                                                  }) => {
    const dispatch = useAppDispatch();

    const btnStyle = {
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: bgColor || undefined,
        color: textColor || undefined, // 文本颜色
        fontSize: `${textSize}px` || undefined, // 文本大小
    };

    function handleClick() {
        dispatch(setSelectComponentId(id));
    }

    return (
        <div className="cursor-pointer hover:bg-gray-100" onClick={handleClick}>
            <AntdButton
                type={"primary"}
                style={btnStyle}
                disabled={disabled}
                className="w-full h-full"
            >
                {text}
            </AntdButton>
        </div>
    );
};

export default ButtonComp;