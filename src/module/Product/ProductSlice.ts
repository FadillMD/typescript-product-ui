import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiStatus, IProduct, IProductState } from "./Product.type";
import { createProduct, getProductList, updateProduct, deleteProduct } from "./ProductService";
import axiosExport from "../../service/HttpService";
import ApiConfig from "../../service/ApiConfig";


const initialState: IProductState = {
    list: [],
    listStatus: ApiStatus.idle
};

// Async thunk untuk mendapatkan daftar produk
export const getProductListAction = createAsyncThunk<IProduct[]>(
    "product/getProductListAction",
    async () => {
        const response = await getProductList(); 
        return response; // Langsung return response yang berupa array
    }
);

// Async thunk untuk menambahkan produk baru
export const createProductAction = createAsyncThunk<IProduct, any>(
    "product/createProductAction",
    async (productData) => {
        const response = await createProduct(productData); // Kirim data ke API
        return response;
    }
);

export const updateProductAction = createAsyncThunk<IProduct, { id: number; data: any }>(
    "product/updateProductAction",
    async ({ id, data }) => {
        const response = await updateProduct(id, data); // Kirim data ke API
        return response;
    }
);

// Async thunk untuk menghapus produk
export const deleteProductAction = createAsyncThunk<void, number>(
    "product/deleteProductAction",
    async (id) => {
        await deleteProduct(id); // Panggil fungsi delete dari ProductService
    }
);

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProductListAction.pending, (state) => {
            state.listStatus = ApiStatus.loading;
        });
        builder.addCase(getProductListAction.fulfilled, (state, action) => {
            state.listStatus = ApiStatus.idle;
            state.list = action.payload; // Ini sekarang berisi array IProduct[]
        });
        builder.addCase(getProductListAction.rejected, (state) => {
            state.listStatus = ApiStatus.error;
        });
        builder.addCase(createProductAction.fulfilled, (state, action) => {
            state.list.push(action.payload); // Tambahkan produk baru ke list
        });
        builder.addCase(updateProductAction.fulfilled, (state, action) => {
            const updatedProduct = action.payload; // Ambil payload langsung
            const index = state.list.findIndex(product => product.id === updatedProduct.id);
            if (index !== -1) {
                state.list[index] = updatedProduct; // Update produk di state
            }
        });
        builder.addCase(deleteProductAction.fulfilled, (state, action) => {
            // Ambil id dari action.payload (parameter)
            const idToDelete = action.meta.arg; // id dari argumen deleteProductAction
            state.list = state.list.filter(product => product.id !== idToDelete); // Hapus produk dari list
        });
    }
});

export default productSlice.reducer;