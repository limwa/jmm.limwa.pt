import { useEffect, useMemo, useState } from "react";
import { createLifetime } from "../utils/lifetime";

type Highlighter = Awaited<ReturnType<typeof createHighlighter>>;

/**
 * Imports the relevant libraries necessary for highlighting code.
 */
async function createHighlighter() {
  const { getHighlighterCore } = await import("shiki/core");
  const getWasm = await import("shiki/wasm");

  return getHighlighterCore({
    langs: [() => import("shiki/langs/java.mjs")],
    themes: [
      () => import("shiki/themes/github-dark-default.mjs"),
      () => import("shiki/themes/github-light-default.mjs"),
    ],
    loadWasm: getWasm,
  });
}

function useHighlighter() {
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null);

  useEffect(() => {
    const lifetime = createLifetime();

    async function initializeHighlighter() {
      const awaitedHighlighter = await createHighlighter();
      lifetime.runIfMounted(() => setHighlighter(awaitedHighlighter));
    }

    initializeHighlighter();
    return lifetime.createCleanup();
  }, []);

  return !!highlighter
    ? {
        codeToHtml: (code: string, { lang }: { lang: string }) =>
          highlighter.codeToHtml(code, {
            lang,
            themes: {
              light: "github-light-default",
              dark: "github-dark-default",
            },
          }),
      }
    : null;
}

export function useEditor(content: string) {
  const highlighter = useHighlighter();

  const html = useMemo(() => {
    if (!highlighter) return "";
    return highlighter.codeToHtml(content, {
      lang: "java",
    });
  }, [highlighter, content]);

  return {
    isLoading: highlighter === null,
    html,
    content,
  };
}
