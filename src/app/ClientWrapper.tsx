"use client";

import React from "react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // 导入默认样式

const ClientWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <>
        {children}
        <ToastContainer
            position="top-center" // 位置
            autoClose={1000} // 自动关闭时间(ms)
            hideProgressBar={false} // 是否隐藏进度条
            newestOnTop={false} // 新消息是否在上方
            closeOnClick // 点击关闭
            rtl={false} // 是否右到左
            pauseOnFocusLoss // 失去焦点时暂停
            draggable // 是否可拖拽
            pauseOnHover // 悬停时暂停
        />
    </>
};

export default ClientWrapper;