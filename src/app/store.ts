import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import ProductReducer from "../module/Product/ProductSlice";

export const store = configureStore({
    reducer: {
        product: ProductReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;


