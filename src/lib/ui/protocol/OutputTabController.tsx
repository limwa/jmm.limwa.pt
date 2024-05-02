"use client";

import { useCompilerContext } from "@/lib/hooks/compiler";
import type React from "react";
import { useEffect, useState } from "react";
import { TabSelectionContext } from "../tabs/hooks/context";

export function OutputTabController({ children }: {children: React.ReactNode}) {
    const { outputSections } = useCompilerContext();
    const [selectedTab, setSelectedTab] = useState(outputSections[0].name);

    useEffect(() => {
        if (!outputSections.find(section => section.name === selectedTab)) {
            setSelectedTab(outputSections[0].name)
        }
    }, [outputSections, selectedTab])

    return <TabSelectionContext.Provider value={{selectedTab, setSelectedTab}}>{children}</TabSelectionContext.Provider>
}