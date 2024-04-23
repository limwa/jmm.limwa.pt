import { createContext, useContext } from "react";

type _TabsContext = {
    selectedTab: string,
    setSelectedTab: (tab: string) => void,
};

export const TabsContext = createContext<_TabsContext | null>(null);
