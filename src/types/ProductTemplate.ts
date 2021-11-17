export interface ProductTemplateVariantLocationMap {
    X1: number,
    X2: number,
    Y1: number,
    Y2: number
}

export interface ProductTemplateVariantBoundingMap {
    top: number,
    right: number,
    bottom: number,
    left: number
}

export interface ProductTemplateProfitOptions {
    lucrative: number,
    minimal: number,
    recommended: number,
    selected: string
}

export interface ProductTemplateVariantPlacements {
    centerFront: {
        backgroundLayer: ProductTemplateVariantLocationMap,
        imageLayer: ProductTemplateVariantLocationMap,
        safeZonePadding: ProductTemplateVariantBoundingMap
    }
}

export interface ProductTemplateVariantPositions {
    centerFront: ProductTemplateVariantLocationMap
}

export interface ProductTemplateVariant {
    backgroundLayer: ProductTemplateVariantLocationMap,
    backgroundUrl: string,
    overlayUrl: string,
    bootstrap: boolean,
    color: string,
    colorHex: string,
    locations: ProductTemplateVariantPlacements,
    position: ProductTemplateVariantPositions,
    previewSKU: string,
    size: string,
    sku: string
}

export default interface ProductTemplate {
    _id: string,
    basePrice: number,
    bootstrap: boolean,
    productId: number,
    productReferenceId: string,
    productType: string,
    profitOptions: ProductTemplateProfitOptions,
    variants: ProductTemplateVariant[]
}