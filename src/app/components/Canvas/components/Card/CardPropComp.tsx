"use client";

import React, {useEffect} from "react";
import {Form, Input, Input as AntdInput, InputNumber, Switch} from "antd";
import {CardPropCompProp} from "./CardPropCompProp";

type OnCardChange = {
    onChange: (values: CardPropCompProp) => void;
};

const CardPropComp: React.FC<CardPropCompProp & OnCardChange> = ({
                                                                     title,
                                                                     content,
                                                                     width,
                                                                     height,
                                                                     backgroundColor,
                                                                     bordered,
                                                                     onChange,
                                                                 }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({ title, content, width, height, backgroundColor, bordered });
    }, [title, content, width, height, backgroundColor, bordered,]);

    const handleValuesChange = () => {
        const values = form.getFieldsValue() as CardPropCompProp;
        if (onChange) {
            onChange(values);
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onValuesChange={handleValuesChange}
            initialValues={{ title, content, width, height, backgroundColor, bordered,}}
        >
            <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: "Please enter a title." }]}
            >
                <Input placeholder="Enter title" />
            </Form.Item>
            <Form.Item label="Content" name="content">
                <Input.TextArea placeholder="Enter content" rows={4} />
            </Form.Item>
            <Form.Item label="Width" name="width">
                <InputNumber min={100} placeholder="Enter width" style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Height" name="height">
                <InputNumber min={50} placeholder="Enter height" style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Background Color" name="backgroundColor">
                <AntdInput type="color" defaultValue="#ffffff" />
            </Form.Item>
            <Form.Item label="Bordered" name="bordered" valuePropName="checked">
                <Switch />
            </Form.Item>
        </Form>
    );
};

export default CardPropComp;