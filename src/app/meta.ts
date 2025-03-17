import { env } from '@/env';
import { stat } from 'fs/promises';
import { join } from 'path';

async function getLastModified(path: string) {
    try {
        const result = await stat(join("./compiler", path));
        return result.mtime;
    } catch (error) {
        return null;
    }
}

export const entrypoint = env.JMM_ENTRYPOINT;
export const lastModified = getLastModified(entrypoint);
