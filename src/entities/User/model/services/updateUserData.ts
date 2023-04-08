import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { User } from '../types/user';

export const updateUserData = createAsyncThunk<
    User,
    string,
    ThunkConfig<string>
>(
    'updateUserData/updateUserData',
    async (userId, thunkAPI) => {
        const {
            extra,
            rejectWithValue,
        } = thunkAPI;

        try {
            const response = await extra.api.get<User>(`/users/${userId}`);

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
