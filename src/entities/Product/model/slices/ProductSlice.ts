import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { buyProduct } from '../services/buyProduct';
import { ProductSchema } from '../types/ProductSchema';

const initialState: ProductSchema = {
    data: {},
    error: undefined,
    isLoading: false,
};

export const ProductSlice = createSlice({
    name: 'Product',
    initialState,
    reducers: {
        template: (state, action: PayloadAction<string>) => {

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(buyProduct.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(buyProduct.fulfilled, (state, action: PayloadAction<string>) => {
                state.isLoading = false;
            })
            .addCase(buyProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: ProductActions } = ProductSlice;
export const { reducer: ProductReducer } = ProductSlice;
