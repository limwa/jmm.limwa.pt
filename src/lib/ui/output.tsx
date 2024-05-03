export function Output({ children }: { children?: React.ReactNode }) {
  return (
    <output className="size-full bg-neutral-950 p-4 font-mono outline-2 outline-teal-500 focus-visible:outline dark:outline-teal-300">
      <pre>
        <code>{children}</code>
      </pre>
    </output>
  );
}
