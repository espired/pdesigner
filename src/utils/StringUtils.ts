export function firstCharToUpperCase(str: string): string {
    return str.charAt(0)?.toUpperCase() + str.substring(1);
}