import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';

export const deleteAchievement = createAsyncThunk<
    string,
    number,
    ThunkConfig<string>
>(
    'deleteAchievement/deleteAchievement',
    async (achievementId, thunkAPI) => {
        const {
            extra,
            rejectWithValue,
            dispatch,
        } = thunkAPI;

        try {
            const response = await extra.api.post<string>(
                '/delete_achievement',
                { achievementId },
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
