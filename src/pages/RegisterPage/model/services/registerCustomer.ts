import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';

export const registerCustomer = createAsyncThunk<
    string,
    any,
    ThunkConfig<string>
>(
    'registerCustomer/registerCustomer',
    async (registerData, thunkAPI) => {
        const {
            extra,
            rejectWithValue,
            dispatch,
        } = thunkAPI;

        try {
            const response = await extra.api.post<string>(
                '/register_customer',
                registerData,
            );

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
