"use client";

import React, {useEffect} from "react";
import { Button as AntdButton } from "antd";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {clearSubmissionResult, setSelectComponentId, submitForm} from "@/store/componentSlice";
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
    const formData = useAppSelector(state => state.comp.present.formData)
    const submissionResult = useAppSelector(state => state.comp.present.submissionResult)

    const btnStyle = {
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: bgColor || undefined,
        color: textColor || undefined, // 文本颜色
        fontSize: `${textSize}px` || undefined, // 文本大小
    };

    function handleClick() {
        dispatch(setSelectComponentId(id));
        dispatch(submitForm())
        // formData {NzYT5Nko: '121'}
        console.log("formData", formData)
    }

    useEffect(() => {
        if(submissionResult){
            const timer = setTimeout(() => {
                dispatch(clearSubmissionResult());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [submissionResult, dispatch]);

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