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
    storeImage: [];
}
