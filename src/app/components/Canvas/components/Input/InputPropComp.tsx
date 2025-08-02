"use client";

import React, {useEffect} from "react";
import {Form, Input, InputNumber, Select, Switch} from "antd";
import {InputPropCompProp} from "./InputPropCompProp";

type OnInputChange = {
    onChange: (values: InputPropCompProp) => void;
};

const InputPropComp: React.FC<InputPropCompProp & OnInputChange> = ({
                                                                        value,
                                                                        placeholder,
                                                                        inputType,
                                                                        width,
                                                                        disabled,
                                                                        size,
                                                                        allowClear,
                                                                        onChange,
                                                                    }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({ value, placeholder, inputType, width, disabled, size, allowClear });
    }, [value, placeholder, inputType, width, disabled, size, allowClear]);

    const handleValuesChange = () => {
        const values = form.getFieldsValue() as InputPropCompProp;
        if (onChange) {
            onChange(values);
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onValuesChange={handleValuesChange}
            initialValues={{value, placeholder, inputType, width, disabled, size, allowClear}}
        >
            <div className={"grid grid-cols-2 gap-2 mt-5"}>
                <Form.Item label="Value" name="value">
                    <Input placeholder="Enter default value"/>
                </Form.Item>
                <Form.Item label="Placeholder" name="placeholder">
                    <Input placeholder="Enter placeholder text"/>
                </Form.Item>
                <Form.Item label="Type" name="inputType">
                    <Select placeholder="Select input type">
                        <Select.Option value="text">Text</Select.Option>
                        <Select.Option value="password">Password</Select.Option>
                        <Select.Option value="number">Number</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Width" name="width">
                    <InputNumber min={50} max={500} placeholder="Enter width" style={{width: "100%"}}/>
                </Form.Item>
                <Form.Item label="Size" name="size">
                    <Select placeholder="Select size">
                        <Select.Option value="small">Small</Select.Option>
                        <Select.Option value="middle">Middle</Select.Option>
                        <Select.Option value="large">Large</Select.Option>
                    </Select>
                </Form.Item>
                <div className={"flex"}>
                    <Form.Item label="Disabled" name="disabled" valuePropName="checked" className={"flex-1"}>
                        <Switch/>
                    </Form.Item>
                    <Form.Item label="Allow Clear" name="allowClear" valuePropName="checked" className={"flex-1"}>
                        <Switch/>
                    </Form.Item>
                </div>
            </div>
        </Form>
);
};

export default InputPropComp;