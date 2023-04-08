import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';

interface BuyProductProps {
    customerId?: number
    productId?: number
}
export const buyProduct = createAsyncThunk<
    string,
    BuyProductProps,
    ThunkConfig<string>
>(
    'buyProduct$/buyProduct',
    async (props, thunkAPI) => {
        const {
            extra,
            rejectWithValue,
        } = thunkAPI;

        try {
            const response = await extra.api.post<string>(
                '/buy_product',
                props,
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
