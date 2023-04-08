import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Customer } from '../types/CustomerSchema';

export const fetchCustomer = createAsyncThunk<
    Customer,
    number,
    ThunkConfig<string>
>(
    'fetchCustomer/fetchCustomer',
    async (CustomerID, thunkAPI) => {
        const {
            extra,
            rejectWithValue,
            dispatch,
        } = thunkAPI;

        try {
            const response = await extra.api.get<Customer>(`/customers/${CustomerID}`);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
