import "client-only";

import { useTabSelectionContext } from "./hooks/context";

export function TabContent({
  builder,
}: {
  builder: (name: string) => React.ReactNode;
}) {
  const { selectedTab } = useTabSelectionContext();
  return builder(selectedTab);
}
