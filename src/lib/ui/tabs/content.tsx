"use client";

import { useTabs } from "@/lib/hooks/tabs";

type TabContentProps =
	| {
			name: string;
			children: React.ReactNode;
	  }
	| {
            name?: undefined;
			children: (name: string) => React.ReactNode;
	  };

export function TabContent(props: TabContentProps) {
	const { selectedTab } = useTabs();

	if ("name" in props) {
		return selectedTab === props.name && props.children;
	}

	return props.children(selectedTab);
}
