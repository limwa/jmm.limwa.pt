"use client";

import { useTabController } from "./hooks/controller";
import { TabSelectionContext } from "./hooks/context";

export function TabController({
  initialTab,
  children,
}: {
  initialTab: string;
  children: React.ReactNode;
}) {
  const tabController = useTabController(initialTab);

  return (
    <TabSelectionContext.Provider value={tabController}>
      {children}
    </TabSelectionContext.Provider>
  );
}
