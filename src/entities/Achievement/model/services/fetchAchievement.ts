import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { useTabDirection } from '@headlessui/react/dist/hooks/use-tab-direction';
import { AchievementActions } from 'entities/Achievement';
import { Achievement } from '../types/AchievementSchema';

export const fetchAchievement = createAsyncThunk<
    Achievement,
    number,
    ThunkConfig<string>
>(
    'fetchAchievement$/fetchAchievement',
    async (achievementId, thunkAPI) => {
        const {
            extra,
            rejectWithValue,
            dispatch,
        } = thunkAPI;

        try {
            const response = await extra.api.get<Achievement>(`/achievements/${achievementId}`);

            if (!response.data) {
                throw new Error();
            }

            dispatch(AchievementActions.setAchievement(response.data));
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
