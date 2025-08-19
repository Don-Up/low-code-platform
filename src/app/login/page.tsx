"use client";

import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Typography } from "antd";
import { useRouter } from "next/navigation";
import { login } from "@/lib/request"; // Adjust the import path as needed
import { toast } from "react-toastify";
import Link from "next/link";

const { Text } = Typography;

const LoginPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onFinish = async (values: { email: string; password: string }) => {
        setLoading(true);
        try {
            const result = await login(values.email, values.password);
            toast.success("Login successful! Redirecting...");
            console.log("Login result:", result);
            // Store token or user data if needed (e.g., in localStorage or context)
            localStorage.setItem("accessToken", result.accessToken);
            router.push("/"); // Redirect to homepage
        } catch (error) {
            toast.error("Login failed. Please try again.");
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Row justify="center" align="middle" className="min-h-screen bg-gray-100">
            <Col xs={22} sm={16} md={12} lg={8}>
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                    <Form
                        name="login"
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
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className="text-center mt-4">
                        <Text>Don't have an account? </Text>
                        <Link href="/register" className="text-blue-500 hover:underline">
                            Register here
                        </Link>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default LoginPage;