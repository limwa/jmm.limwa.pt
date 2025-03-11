import { stat } from 'fs/promises';

async function getLastModified(path: string) {
    try {
        const result = await stat(path);
        return result.mtime;
    } catch (error) {
        return null;
    }
}

const entrypoint = './compiler/jmm/bin/jmm';
export const lastModified = getLastModified(entrypoint);
