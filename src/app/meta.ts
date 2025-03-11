import { stat } from 'fs/promises';

async function getLastModified(path: string) {
    const result = await stat(path);
    return result.mtime;
}

const entrypoint = './compiler/jmm/bin/jmm';
export const lastModified = getLastModified(entrypoint);
