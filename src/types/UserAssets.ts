export interface UserAssetsUpload {
    _id: string,
    channel: string,
    deleted: boolean,
    name: string,
    size: number,
    transformUrl: string,
    type: string,
    url: string,
    createdAt: string,
    updatedAt: string
}

export default interface UserAssets {
    total: number,
    totalSize: number,
    totalStorage: number,
    uploads: UserAssetsUpload[]
}