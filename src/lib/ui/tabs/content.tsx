"use client";

import "client-only";

import { useTabSelectionContext } from "./hooks/context";

export function TabContent({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  const { selectedTab } = useTabSelectionContext();
  return selectedTab === name && children;
}
