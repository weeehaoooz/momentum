export async function modelExists(modelName: string, fallbackRemote: string): Promise<string> {
    try {
        const url = `assets/models/${modelName}/config.json`;
        const res = await fetch(url, { method: 'HEAD' });
        return modelName;
    } catch {
        return fallbackRemote;
    }
}