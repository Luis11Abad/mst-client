/* eslint-disable @typescript-eslint/no-explicit-any */
export function areEquals(a: any, b: any) {
    return JSON.stringify(a) === JSON.stringify(b)
}

export function isEmptyOrNull(char: string) {
    return !char || char.length === 0
}
