import { useState } from "react";

export function useTabController(initialTab: string) {
    const [selectedTab, setSelectedTab] = useState(initialTab);
  
    return {
      selectedTab,
      setSelectedTab,
    };
}