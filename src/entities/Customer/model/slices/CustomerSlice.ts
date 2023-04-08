import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Customer, CustomerSchema } from '../types/CustomerSchema';
import { fetchCustomer } from '../services/fetchCustomer';

const initialState: CustomerSchema = {
    data: {},
    error: undefined,
    isLoading: false,
};

export const CustomerSlice = createSlice({
    name: 'Customer',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomer.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchCustomer.fulfilled, (state, action: PayloadAction<Customer>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchCustomer.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: CustomerActions } = CustomerSlice;
export const { reducer: CustomerReducer } = CustomerSlice;
