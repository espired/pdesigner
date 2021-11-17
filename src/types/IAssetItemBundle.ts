export interface IAssetItemBundleImage {
    name: string,
    path: string,
    thumbnail: string
}

export default interface IAssetItemBundle {
    name: string,
    images: IAssetItemBundleImage[]
}