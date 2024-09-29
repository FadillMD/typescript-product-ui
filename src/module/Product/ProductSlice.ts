import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiStatus, IProduct, IProductState } from "./Product.type";
import { createProduct, getProductList, updateProduct, deleteProduct } from "./ProductService";
import { toast } from "react-toastify";


const initialState: IProductState = {
    list: [],
    listStatus: ApiStatus.idle
};

// Async thunk untuk mendapatkan daftar produk
export const getProductListAction = createAsyncThunk<IProduct[]>(
    "product/getProductListAction",
    async () => {
        const response = await getProductList(); 
        return response; 
    }
);

// Async thunk untuk menambahkan produk baru
export const createProductAction = createAsyncThunk<IProduct, any>(
    "product/createProductAction",
    async (productData) => {
        const response = await createProduct(productData); 
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
        await deleteProduct(id); 
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
            state.list = action.payload; 
        });
        builder.addCase(getProductListAction.rejected, (state) => {
            state.listStatus = ApiStatus.error;
        });
        builder.addCase(createProductAction.fulfilled, (state, action) => {
            state.list.push(action.payload); // Tambahkan produk baru ke list
            toast.success("Produk berhasil ditambahkan!");
        });
        builder.addCase(updateProductAction.fulfilled, (state, action) => {
            const updatedProduct = action.payload; 
            const index = state.list.findIndex(product => product.id === updatedProduct.id);
            if (index !== -1) {
                state.list[index] = updatedProduct; 
                toast.success("Produk berhasil diupdate!");
            }
        });
        
        builder.addCase(deleteProductAction.fulfilled, (state, action) => {
            const idToDelete = action.meta.arg; 
            state.list = state.list.filter(product => product.id !== idToDelete);
            toast.success("Produk berhasil dihapus!");
        });
    }
});

export default productSlice.reducer;