import ProductTemplate from "../types/ProductTemplate";
import UserAssets from "../types/UserAssets";
import UserStore from "../types/UserStore";

const BASE_URL = 'https://api.streamelements.com/kappa/v2';
const MERCH_BASE_URL = `${BASE_URL}/merch`;

const ROUTES = {
    'me' : '/channels/me',
    'templates' : '/gooten/templates',
    'store' : '/store',
    'userAssets' : '/store/images'
}

const doFetch = <T>(method: string, url: string, includeAuth?: boolean, options: RequestInit = {}): Promise<T> => {
    let headers = {
        Authorization: '',
    };

    if(options && options.headers) {
        headers = {
            ...headers,
            ...options.headers
        }
    }

    if(includeAuth) {
        headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjA0ZGJiMjVlNzg2NjExMzliNGE2ZDgzIiwidXNlclJvbGUiOiJzdGFmZiIsInJvbGUiOiJvd25lciIsImNoYW5uZWwiOiI2MDRkYmIyNWU3ODY2MWRkZGI0YTZkODQiLCJwcm92aWRlciI6InR3aXRjaCIsImF1dGhUb2tlbiI6InFxSEdUMXVyVEJjN0R6RVl3bkY5ZDlFbmpsT3JDSFpEdURKdEtRc1N3WlNjcDNTSCIsImlhdCI6MTYzNjg3ODc5MSwiaXNzIjoiU3RyZWFtRWxlbWVudHMifQ.opQEWYP5Zn70qv3b6VSTm5MWZuK3rYdsK0s5EctNqO4`
    };

    return fetch(url, {
        method,
        ...options,
        headers,
    }) 
    .then(res => res.json())
}

export const getCurrentUser = () => doFetch<any>('get', BASE_URL + ROUTES.me, true)
export const getTemplates = (userId: string) => doFetch<ProductTemplate[]>('get', `${MERCH_BASE_URL}/${userId}${ROUTES.templates}`, true)
export const getStoreItems = (userId: string) => doFetch<UserStore>('get', `${MERCH_BASE_URL}/${userId}${ROUTES.store}`, true);
export const getUserAssets = (userId: string) => doFetch<UserAssets>('get', `${MERCH_BASE_URL}/${userId}${ROUTES.userAssets}`, true);
export const deleteUserAsset = (userId: string, assetId: string) => doFetch<any>('delete', `${MERCH_BASE_URL}/${userId}${ROUTES.userAssets}/${assetId}`, true);
export const toggleItemPublish = (userId: string, itemId: string, isPublished: boolean) => doFetch<any>('put', `${MERCH_BASE_URL}/${userId}/editor/item/${itemId}/publish/${isPublished}`, true);

export const createNewItem = (userId: string, item: any) => doFetch<any>('post', `${MERCH_BASE_URL}/${userId}/editor/item`, true, {
    body: JSON.stringify(item),
    headers: {
        'Content-Type': 'application/json'
    }
});
export const saveItem = (userId: string, itemId:string, item: any) => doFetch<any>('put', `${MERCH_BASE_URL}/${userId}/editor/item/${itemId}`, true, {
    body: JSON.stringify(item),
    headers: {
        'Content-Type': 'application/json'
    }
});

export const createNewStore = (channelId: string, storeName: string, streamerHandle: string, templates: string[], imgUrl: string) => doFetch<any>('post', `${MERCH_BASE_URL}/${channelId}/store`, true, {
    body: JSON.stringify({
        channelId,
        storeName,
        streamerHandle,
        templates,
        assets: {
            centerFront: {
                url: imgUrl
            }
        }
    }),
    headers: {
        'Content-Type': 'application/json'
    }
});

export const uploadImage = (file: File | Blob, userId: string, fileName?: string) => {
    const body: BodyInit = new FormData();
    body.append('file', file, fileName || 'Graphics.png');
    return doFetch<any>('post', `${MERCH_BASE_URL}/${userId}/store/images`, true, { body, headers: { 'se-transform': 'true' } })
};