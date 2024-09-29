
import HttpService from "../../service/HttpService"
import ApiConfig from "../../service/ApiConfig";
import { IProduct } from "./Product.type";

// Fungsi untuk mendapatkan daftar produk
export const getProductList = async (): Promise<IProduct[]> => {
    const response = await HttpService.get(ApiConfig.product); // Ambil data produk
    return response.data.map((item: any) => ({
        id: item.id,
        productName: item.product_name,
        category: item.category,
        price: parseFloat(item.price),
        discount: item.discount,
    }));
};

export const createProduct = async (data: any): Promise<IProduct> => {
    const response = await HttpService.post(ApiConfig.product, data); // Kirim data ke API
    return {
        id: response.id,
        productName: response.product_name,
        category: response.category,
        price: parseFloat(response.price),
        discount: response.discount,
    };
};

export const updateProduct = async (id: number, data: any): Promise<IProduct> => {
    const response = await HttpService.put(`${ApiConfig.product}/${id}`, data); // Kirim data ke API
    return {
        id: response.id,
        productName: response.product_name,
        category: response.category,
        price: parseFloat(response.price),
        discount: response.discount,
    };
};
