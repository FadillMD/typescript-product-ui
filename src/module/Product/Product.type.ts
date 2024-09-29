export interface IProduct {
    id: number;
    productName: string;
    category: string;
    price: number;
    discount?: number;
}

export enum ApiStatus {
    "loading",
    "idle",
    "success",
    "error"
}

export interface IProductState {
    list: IProduct[],
    listStatus: ApiStatus
}
