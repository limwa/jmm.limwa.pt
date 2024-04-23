import type { Metadata } from "next";
import { Header } from "@/lib/ui/header";
import { CompilerProvider } from "@/lib/hooks/compiler";
import { TabSelector } from "@/lib/ui/tabs/selector";
import { TabController } from "@/lib/ui/tabs/controller";
import { TabContent } from "@/lib/ui/tabs/content";
import { Output } from "@/lib/ui/output";
import { Highlight } from "@/lib/ui/highlight";

export const metadata: Metadata = {
	title: "COMP2023",
	description: "An application to compile Java-- code",
};

export default function Home() {
	return (
		// <div className="flex h-dvh flex-col bg-neutral-900 text-white">
		// 	<Header />
		// 	<CompilerProvider>
		// 		<main className="grow">
		// 			<div className="grid h-full grid-cols-1 gap-[0.15rem] md:grid-cols-2">
		// 				<section className="flex flex-col max-h-full overflow-y-hidden">
		// 					<TabController initialTab="input">
		// 						<header className="flex">
		// 							<TabSelector name="input" readOnly>
		// 								<h2>Input</h2>
		// 							</TabSelector>
		// 						</header>
		// 						<TabContent name="input">
		// 							{/* <Highlight
		// 								initialCode={
		// 									"int i = 1;;;;;;;;;;;;;;\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nn\n\n\n\n\n\nclass HelloWorld extends Object {}"
		// 								}
		// 							/> */}
		// 							<Highlight
		// 								initialCode={
		// 									"int i = 1;"
		// 								}
		// 							/>
		// 						</TabContent>
		// 					</TabController>
		// 				</section>
		// 				<section className="flex flex-col">
		// 					<TabController initialTab="symbol-table">
		// 						<header className="flex flex-wrap">
		// 							<TabSelector name="symbol-table">
		// 								<h2>Symbol Table</h2>
		// 							</TabSelector>
		// 							<TabSelector name="ast">
		// 								<h2>AST</h2>
		// 							</TabSelector>
		// 							<TabSelector name="optimized-ast">
		// 								<h2>Optimized AST</h2>
		// 							</TabSelector>
		// 							<TabSelector name="ollir">
		// 								<h2>OLLIR</h2>
		// 							</TabSelector>
		// 							<TabSelector name="optimized-ollir">
		// 								<h2>Optimized OLLIR</h2>
		// 							</TabSelector>
		// 							<TabSelector name="jasmin">
		// 								<h2>Jasmin</h2>
		// 							</TabSelector>
		// 						</header>
		// 						<TabContent name="symbol-table">
		// 							<textarea
		// 								className="size-full bg-neutral-950 p-2 font-mono outline-2 outline-teal-300 focus-visible:outline"
		// 								readOnly
		// 							/>
		// 						</TabContent>
		// 						<TabContent name="ast">
		// 							<Output>{"hihi\nhoho  haha\n  kekw"}</Output>
		// 						</TabContent>
		// 						<TabContent name="optimized-ast">
		// 							<h1>3</h1>
		// 						</TabContent>
		// 						<TabContent name="ollir">
		// 							<h1>4</h1>
		// 						</TabContent>
		// 						<TabContent name="optimized-ollir">
		// 							<h1>5</h1>
		// 						</TabContent>
		// 						<TabContent name="jasmin">
		// 							<h1>6</h1>
		// 						</TabContent>
		// 					</TabController>
		// 				</section>
		// 			</div>
		// 		</main>
		// 	</CompilerProvider>
		// </div>
		<div className="grid md:h-dvh md:grid-cols-2 md:grid-rows-[max-content,1fr]">
			<Header className="col-span-2 col-start-1" />
            <div className="flex flex-col overflow-auto bg-red-400">
                <div className="bg-yellow-100">
                    Header column 1
                </div>
                <pre className="overflow-auto">
                    {
                        "a\nb\nc\n\n\n\n\nn\n\n\n\n\n\n\n\nn\n\nn\n\n\n\nn\n\n\n\n\n\n\n\nn\n\n\n\n\n\n\nn\n\n\n\n\n\n\n\n\n\n\n\n\n\nn\n\n\n\n\nn\n\n\\nn\n\n\n\n\n\nf"
                    }
                </pre>
            </div>
            <div className="flex h-min flex-col justify-start overflow-scroll bg-red-500">Column 2</div>
		</div>
	);
}
