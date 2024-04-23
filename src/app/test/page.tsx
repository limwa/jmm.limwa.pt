export default function Test() {
	return (
		<div className="grid h-dvh grid-cols-2 grid-rows-[max-content,1fr] bg-red-100">
			<div className="col-span-2 col-start-1 bg-red-200">Header</div>
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
