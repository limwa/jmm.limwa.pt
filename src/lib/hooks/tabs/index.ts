import { TabsContext } from "@/lib/contexts/tabs";
import { useContext } from "react";

export function useTabs() {
    const context = useContext(TabsContext);
    
    if (context === null) {
        throw new Error("useTabs must be used within a TabsProvider");
    }

    return context;
}