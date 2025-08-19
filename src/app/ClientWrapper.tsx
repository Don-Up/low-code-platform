"use client";

import { ConfigProvider } from "antd";
import React from "react";

const ClientWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <ConfigProvider>{children}</ConfigProvider>;
};

export default ClientWrapper;