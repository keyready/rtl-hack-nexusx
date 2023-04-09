import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';

export const deleteProduct = createAsyncThunk<
    string,
    number,
    ThunkConfig<string>
>(
    'deleteProduct/deleteProduct',
    async (productId, thunkAPI) => {
        const {
            extra,
            rejectWithValue,
            dispatch,
        } = thunkAPI;

        try {
            const response = await extra.api.post<string>(
                '/delete_product',
                { productId },
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
