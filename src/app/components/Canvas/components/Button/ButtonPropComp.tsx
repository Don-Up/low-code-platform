"use client";

import React, {useEffect} from "react";
import {Form, Input, InputNumber, Switch} from "antd";
import {ButtonPropCompProp} from "./ButtonPropCompProp";

type OnButtonChange = {
    onChange: (values: ButtonPropCompProp) => void;
};

const ButtonPropComp: React.FC<ButtonPropCompProp & OnButtonChange> = ({
                                                                           text,
                                                                           textColor,
                                                                           textSize,
                                                                           width,
                                                                           height,
                                                                           btnType,
                                                                           bgColor,
                                                                           disabled,
                                                                           onChange,
                                                                       }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({text, textColor, textSize, width, height, btnType, bgColor, disabled});
    }, [text, textColor, textSize, width, height, btnType, bgColor, disabled]);

    const handleValuesChange = () => {
        const values = form.getFieldsValue() as ButtonPropCompProp;
        if (onChange) {
            onChange(values);
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onValuesChange={handleValuesChange}
            initialValues={{text, textColor, textSize, width, height, btnType, bgColor, disabled}}
        >
            <div className={"grid grid-cols-2 gap-2 mt-5"}>
                <Form.Item label="Text" name="text" className={"flex-1"}
                           rules={[{required: true, message: "Please enter button text."}]}>
                    <Input placeholder="Enter button text"/>
                </Form.Item>
                <Form.Item label="Text Color" name="textColor" className={"flex-1"}>
                    <Input type="color"/>
                </Form.Item>
                <Form.Item label="Text Size" name="textSize" className={"flex-1"}>
                    <InputNumber min={10} max={30} placeholder="Enter text size" style={{width: "100%"}}/>
                </Form.Item>
                <Form.Item label="Width" name="width" className={"flex-1"}>
                    <InputNumber min={50} max={300} placeholder="Enter width" style={{width: "100%"}}/>
                </Form.Item>
                <Form.Item label="Height" name="height" className={"flex-1"}>
                    <InputNumber min={30} max={200} placeholder="Enter height" style={{width: "100%"}}/>
                </Form.Item>
                {/*<Form.Item label="Button Type" name="btnType" className={"flex-1"}>*/}
                {/*    <Select placeholder="Select button type">*/}
                {/*        <Select.Option value="default">Default</Select.Option>*/}
                {/*        <Select.Option value="primary">Primary</Select.Option>*/}
                {/*        <Select.Option value="dashed">Dashed</Select.Option>*/}
                {/*        <Select.Option value="text">Text</Select.Option>*/}
                {/*        <Select.Option value="link">Link</Select.Option>*/}
                {/*    </Select>*/}
                {/*</Form.Item>*/}
                <Form.Item label="Background Color" name="bgColor" className={"flex-1"}>
                    <Input type="color"/>
                </Form.Item>
                <Form.Item label="Disabled" name="disabled" valuePropName="checked" className={"flex-1"}>
                    <Switch/>
                </Form.Item>
            </div>
        </Form>
    );
};

export default ButtonPropComp;