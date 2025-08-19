"use client";

import React, {useState} from "react";
import {Button, Col, Form, Input, message, Row} from "antd";
import {register} from "@/lib/request"; // Specific type for errorInfo

const RegisterPage: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: { email: string; password: string }) => {
        message.success("Registration successful! Redirecting...");
        // setLoading(true);
        // try {
        //     const result = await register(values.email, values.password);
        //     message.success("Registration successful! Redirecting...");
        //     console.log("Registration result:", result);
        // } catch (error) {
        //     message.error("Registration failed. Please try again.");
        //     console.error("Registration error:", error);
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <Row justify="center" align="middle" className="min-h-screen bg-gray-100">
            <Col xs={22} sm={16} md={12} lg={8}>
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                    <Form
                        name="register"
                        onFinish={onFinish}
                        layout="vertical"
                        initialValues={{ email: "", password: "" }}
                        className="space-y-4"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: "Please input your email!" },
                                { type: "email", message: "Please enter a valid email!" },
                            ]}
                        >
                            <Input placeholder="Enter your email" className="w-full" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: "Please input your password!" },
                                { min: 6, message: "Password must be at least 6 characters!" },
                            ]}
                        >
                            <Input.Password placeholder="Enter your password" className="w-full" />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                loading={loading}
                                className="mt-4"
                            >
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Col>
        </Row>
    );
};

export default RegisterPage;