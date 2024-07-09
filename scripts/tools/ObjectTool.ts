/** @format */

export function parseJsonString(json: string): any {
    try {
        return JSON.parse(json);
    } catch {
        return undefined;
    }
}
