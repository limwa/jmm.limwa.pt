import { useTabSelectionContext } from "./context";

export function useTabSelector(name: string) {
  const tabs = useTabSelectionContext();

  return {
    selected: tabs.selectedTab === name,
    select: () => tabs.setSelectedTab(name),
  };
}
