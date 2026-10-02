import * as fs from 'fs'
import * as path from 'path'


export function resolveEnvPath(): Array<string> {
    const env = process.env.APP_ENV?.trim();
    const candidates = new Array<string>();

    if (env) {
        candidates.push(`.env.${env}`);
    }

    // fallback array for setting up default env configuration
    candidates.push('.env.local', '.env');

    return candidates.filter((file) => {
        const fullPath = path.resolve(process.cwd(), file);
        return fs.existsSync(fullPath);
    })
}