"use client";

import React from "react";
import { Card } from "antd";
import { useAppDispatch } from "@/store/hooks";
import { setSelectComponentId } from "@/store/componentSlice";
import { CardPropCompProp } from "@/app/components/Canvas/components/Card/CardPropCompProp";

const CardComp: React.FC<CardPropCompProp> = ({
                                                  title,
                                                  content,
                                                  width,
                                                  height,
                                                  backgroundColor,
                                                  bordered = true,
                                                  id = null,
                                              }) => {
    const dispatch = useAppDispatch();

    const cardStyle = {
        width: width ? `${width}px` : "100%", // 默认占满容器，可自定义宽度
        height: height ? `${height}px` : "auto", // 可选高度，内容自适应
        backgroundColor: backgroundColor || undefined,
    };

    function handleClick() {
        dispatch(setSelectComponentId(id));
    }

    return (
        <div className="cursor-pointer hover:bg-gray-100" onClick={handleClick}>
            <Card
                title={title}
                style={cardStyle}
                bordered={bordered}
            >
                <p className="text-gray-600" style={{ height: height ? `calc(${height}px - 60px)` : "auto" }}>
                    {content}
                </p>
            </Card>
        </div>
    );
};

export default CardComp;