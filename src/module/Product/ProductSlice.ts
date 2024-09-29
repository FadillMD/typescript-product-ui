import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiStatus, IProduct, IProductState } from "./Product.type";
import { getProductList } from "./ProductService";


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
    }
});

export default productSlice.reducer;