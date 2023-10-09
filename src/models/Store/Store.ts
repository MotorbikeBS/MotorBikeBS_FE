export interface IStoreImages {
    storeImageId: number;
    imageLink: string;
    storeId: number;
}
export interface IStore {
    storeId: number;
    userId: number;
    storeName: string;
    description: string;
    storePhone: string;
    storeEmail: string;
    storeCreatedAt: Date;
    storeUpdatedAt: Date;
    point: number;
    address: string;
    status: string;
    taxCode: string;
    businessLicense: string;
    storeImages: {
        storeImageId: number;
        imageLink: string;
        storeId: number;
    }[];
}
