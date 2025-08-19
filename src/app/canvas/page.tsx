"use client";

import React, { useState, useEffect } from "react";
import { Button, List, Modal, message } from "antd";
import { useRouter } from "next/navigation";
import { getUserCanvases, deleteCanvas, getCanvasById } from "@/lib/request";
import { Canvas } from "@/lib/models";
import { useAppDispatch } from "@/store/hooks";
import { loadState } from "@/store/componentSlice";

export default function CanvasPage() {
    const [canvases, setCanvases] = useState<Canvas[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCanvas, setSelectedCanvas] = useState<Canvas | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();

    // Fetch canvases for the current user on mount
    useEffect(() => {
        const fetchCanvases = async () => {
            try {
                setLoading(true);
                const data = await getUserCanvases(); // Backend handles userId from JWT
                setCanvases(data);
            } catch (error) {
                message.error("Failed to load canvases. Please try again.");
                console.error("Error fetching canvases:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCanvases();
    }, []);

    // Handle canvas selection and load into editor
    const handleCanvasSelect = async (canvas: Canvas) => {
        try {
            setLoading(true);
            const detailedCanvas = await getCanvasById(canvas.id); // Fetch full details if needed
            setSelectedCanvas(detailedCanvas);
            dispatch(loadState(detailedCanvas.components));
            router.push("/"); // Navigate to editor page (assuming /editor is the canvas editor route)
        } catch (error) {
            message.error("Failed to load canvas details.");
            console.error("Error loading canvas:", error);
        } finally {
            setLoading(false);
        }
    };

    // Show delete confirmation modal
    const showDeleteConfirm = (canvas: Canvas) => {
        setSelectedCanvas(canvas);
        setIsModalVisible(true);
    };

    // Handle delete action
    const handleDelete = async () => {
        if (!selectedCanvas) return;
        try {
            setLoading(true);
            await deleteCanvas(selectedCanvas.id);
            setCanvases(canvases.filter((c) => c.id !== selectedCanvas.id));
            message.success("Canvas deleted successfully.");
        } catch (error) {
            message.error("Failed to delete canvas.");
            console.error("Error deleting canvas:", error);
        } finally {
            setLoading(false);
            setIsModalVisible(false);
            setSelectedCanvas(null);
        }
    };

    // Handle new canvas creation (redirect to editor to start fresh)
    const handleNewCanvas = () => {
        dispatch(loadState([])); // Reset components
        router.push("/editor");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">My Canvases</h1>
                <Button
                    type="primary"
                    onClick={handleNewCanvas}
                    className="mb-4"
                    data-testid="new-canvas-button"
                >
                    Create New Canvas
                </Button>
                <List
                    loading={loading}
                    dataSource={canvases}
                    renderItem={(canvas) => (
                        <List.Item
                            actions={[
                                <Button
                                    type="link"
                                    onClick={() => handleCanvasSelect(canvas)}
                                    className="text-blue-500"
                                >
                                    View
                                </Button>,
                                <Button
                                    type="link"
                                    danger
                                    onClick={() => showDeleteConfirm(canvas)}
                                    className="text-red-500"
                                >
                                    Delete
                                </Button>,
                            ]}
                        >
                            <List.Item.Meta
                                title={<span className="font-medium">{canvas.title}</span>}
                                description={`Created: ${new Date(canvas.createdAt).toLocaleDateString()}`}
                            />
                        </List.Item>
                    )}
                    locale={{ emptyText: "No canvases found." }}
                />
                <Modal
                    title="Confirm Delete"
                    open={isModalVisible}
                    onOk={handleDelete}
                    onCancel={() => setIsModalVisible(false)}
                    okText="Delete"
                    cancelText="Cancel"
                    okButtonProps={{ danger: true }}
                    confirmLoading={loading}
                >
                    <p>Are you sure you want to delete "{selectedCanvas?.title}"?</p>
                </Modal>
            </div>
        </div>
    );
}