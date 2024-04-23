export function createLifetime() {
    const controller = new AbortController();
    
    function runIfMounted<T, U = void>(ifMounted: () => T, ifNotMounted?: () => U) {
        return !controller.signal.aborted
            ? ifMounted()
            : ifNotMounted?.();
    }

    function createCleanup() {
        return () => controller.abort();
    }

    function createCleanupAndRun(callback: () => unknown) {
        const cleanup = createCleanup();
        return () => {
            cleanup();
            callback();
        }
    }

    return {
        signal: controller.signal,
        runIfMounted,
        createCleanup,
        createCleanupAndRun,
    }
}