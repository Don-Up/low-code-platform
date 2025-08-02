"use client";

import React, {useEffect} from "react";
import {Form, Input, InputNumber, Select, Switch} from "antd";
import {TextPropCompProp} from "./TextPropCompProp";
import {useAppDispatch} from "@/store/hooks";

type OnTextChange = {
    onChange: (values: TextPropCompProp) => void;
};

const TextPropComp: React.FC<TextPropCompProp & OnTextChange> = ({
                                                                     id,
                                                                     text,
                                                                     color,
                                                                     fontSize,
                                                                     textAlign,
                                                                     fontWeight,
                                                                     disabled,
                                                                     onChange,
                                                                 }) => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({ text, color, fontSize, textAlign, fontWeight, disabled });
    }, [text, color, fontSize, textAlign, fontWeight, disabled]);

    const handleValuesChange = () => {
        const values = form.getFieldsValue() as TextPropCompProp;
        if (onChange) {
            onChange(values);
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onValuesChange={handleValuesChange}
            initialValues={{ text, color, fontSize, textAlign, fontWeight, disabled }}
        >
            <div className={"grid grid-cols-2 gap-2 mt-5"}>
                <Form.Item
                    label="Text"
                    name="text"
                    rules={[{ required: true, message: "Please enter text content." }]}
                >
                    <Input placeholder="Enter text" />
                </Form.Item>
                <Form.Item label="Color" name="color">
                    <Input type="color" defaultValue="#000000" />
                </Form.Item>
                <Form.Item label="Font Size" name="fontSize">
                    <InputNumber min={10} max={40} placeholder="Enter font size" style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item label="Text Align" name="textAlign">
                    <Select placeholder="Select text alignment">
                        <Select.Option value="left">Left</Select.Option>
                        <Select.Option value="center">Center</Select.Option>
                        <Select.Option value="right">Right</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Font Weight" name="fontWeight">
                    <Select placeholder="Select font weight">
                        <Select.Option value="normal">Normal</Select.Option>
                        <Select.Option value="bold">Bold</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Disabled" name="disabled" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </div>
        </Form>
    );
};

export default TextPropComp;