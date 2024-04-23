import { createContext, useContext } from "react";

type TabSelectionContextData = {
    selectedTab: string,
    setSelectedTab: (tab: string) => void,
};

export const TabSelectionContext = createContext<TabSelectionContextData | null>(null);

export function useTabSelectionContext() {
    const context = useContext(TabSelectionContext);

    if (!context) {
        throw new Error("useTabSelectionContext must be used within a TabSelectionContext.Provider");
    }

    return context;
}