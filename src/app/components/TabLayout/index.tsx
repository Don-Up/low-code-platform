"use client"
import React from "react";
import ComponentLibrary from "@/app/components/ComponentLibrary";
import NodeTree from "@/app/components/NodeTree";
import {useTranslation} from "@/hooks/useTranslation";
import {Tabs} from "antd";

const { TabPane } = Tabs;

const TabLayout: React.FC = () => {

    const { t } = useTranslation();


    return <Tabs defaultActiveKey="1" className="w-1/4 h-full border-r">
        <TabPane tab={t("componentLibrary")} key="1">
            <ComponentLibrary />
        </TabPane>
        <TabPane tab={t("componentTree")} key="2">
            <NodeTree />
        </TabPane>
    </Tabs>
}

export default Tabs