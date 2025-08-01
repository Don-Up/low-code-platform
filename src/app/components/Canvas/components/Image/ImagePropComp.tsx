"use client";

import React, {useEffect} from "react";
import {Form, Input, InputNumber} from "antd";
import {ImagePropCompProp} from "./ImagePropCompProp";
import {useAppDispatch} from "@/store/hooks";

type OnImageChange = {
    onChange: (values: ImagePropCompProp) => void;
};

const ImagePropComp: React.FC<ImagePropCompProp & OnImageChange> = ({
                                                                        id,
                                                                        src,
                                                                        width,
                                                                        height,
                                                                        disabled,
                                                                        onChange,
                                                                    }) => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({src, width, height});
    }, [src, width, height]);

    const handleValuesChange = () => {
        const values = form.getFieldsValue() as ImagePropCompProp;
        if (onChange) {
            onChange(values); // 通知 PropertyPanel 更新
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onValuesChange={handleValuesChange}
            initialValues={{src, width, height}}
            disabled={disabled}
        >
            <Form.Item
                label="Image URL"
                name="src"
                rules={[{required: true, message: "Please enter an image URL."}]}
            >
                <Input placeholder="Enter image URL"/>
            </Form.Item>
            <Form.Item label="Width" name="width">
                <InputNumber min={0} placeholder="Enter width" style={{width: "100%"}}/>
            </Form.Item>
            <Form.Item label="Height" name="height">
                <InputNumber min={0} placeholder="Enter height" style={{width: "100%"}}/>
            </Form.Item>
        </Form>
    );
};

export default ImagePropComp;