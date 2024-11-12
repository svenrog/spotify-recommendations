export function getEncodedHexValue(input: string | null) {
    if (!input) return null;
    return `#${input}`
}