
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
