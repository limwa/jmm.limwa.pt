import { useTabs } from ".";

export function useTabSelector(name: string) {
    const tabs = useTabs();

    return {
        selected: tabs.selectedTab === name,
        select: () => tabs.setSelectedTab(name),
    }
}