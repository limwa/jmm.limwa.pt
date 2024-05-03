import { createContext, useContext } from "react";

type TabSelectionContextData = {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
};

export const TabSelectionContext =
  createContext<TabSelectionContextData | null>(null);

export function useTabSelectionContext() {
  const tabSelection = useContext(TabSelectionContext);

  if (!tabSelection) {
    throw new Error(
      "useTabSelectionContext must be used within a TabSelectionContext.Provider",
    );
  }

  return tabSelection;
}
