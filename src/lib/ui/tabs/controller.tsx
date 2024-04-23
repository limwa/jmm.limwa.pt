"use client";

import { TabsContext } from "@/lib/contexts/tabs";
import { useState } from "react";

export function TabController({ initialTab, children }: { initialTab: string, children: React.ReactNode }) {
    const [selectedTab, setSelectedTab] = useState(initialTab);

    return (
        <TabsContext.Provider value={{ selectedTab, setSelectedTab }}>
            {children}
        </TabsContext.Provider>
    );
}
