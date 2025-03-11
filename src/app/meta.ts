import { stat } from 'fs/promises';

async function getLastModified(path: string) {
    try {
        const result = await stat(path);
        return result.mtime;
    } catch (error) {
        return null;
    }
}

export const entrypoint = process.env.JMM_ENTRYPOINT ?? './compiler/jmm/bin/jmm';
export const lastModified = getLastModified(entrypoint);
