"use client";

import React from "react";
import { Input as AntdInput } from "antd";
import { useAppDispatch } from "@/store/hooks";
import { setSelectComponentId } from "@/store/componentSlice";
import { InputPropCompProp } from "./InputPropCompProp";

const InputComp: React.FC<InputPropCompProp> = ({
                                                    value,
                                                    placeholder,
                                                    inputType = "text",
                                                    width,
                                                    disabled = false,
                                                    size = "middle",
                                                    allowClear = false,
                                                    id = null,
                                                }) => {
    const dispatch = useAppDispatch();

    const inputStyle = {
        width: width ? `${width}px` : "100%", // 默认占满容器，可自定义宽度
    };

    function handleClick() {
        dispatch(setSelectComponentId(id));
    }

    return (
        <div className="cursor-pointer hover:bg-gray-100" onClick={handleClick}>
            <AntdInput
                value={value}
                placeholder={placeholder}
                type={inputType}
                style={inputStyle}
                disabled={disabled}
                size={size}
                allowClear={allowClear}
            />
        </div>
    );
};

export default InputComp;