import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { buyProduct } from '../services/buyProduct';
import { ProductSchema } from '../types/ProductSchema';
import { createProduct } from '../services/createProduct';
import { deleteProduct } from '../services/deleteProduct';

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
            })

            .addCase(createProduct.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(createProduct.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(deleteProduct.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: ProductActions } = ProductSlice;
export const { reducer: ProductReducer } = ProductSlice;
