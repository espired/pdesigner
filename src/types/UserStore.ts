export interface UserStoreItemVariant {
    color: string,
    colorHex: string,
    size: string,
    preview: {
        url: string
    },
    resizesAsset: {
        url: string
    }
}

export interface UserStoreItem {
    _id: string,
    template: string,
    title: string,
    productType: string,
    variants: UserStoreItemVariant[]
}

export default interface UserStore {
    channel: string,
    createdAt: string,
    items: UserStoreItem[]
}