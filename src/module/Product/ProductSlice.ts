import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiStatus, IProduct, IProductState } from "./Product.type";
import { createProduct, getProductList } from "./ProductService";


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
    }
});

export default productSlice.reducer;