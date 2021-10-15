export function getScaleFromBounds(sourceBounds: { width: number, height: number }, targetBounds: { width: number, height: number }): number {
    const widthScale = sourceBounds.width / targetBounds.width;
    const heightScale = sourceBounds.height / targetBounds.height;

    return Math.min(widthScale, heightScale);
}