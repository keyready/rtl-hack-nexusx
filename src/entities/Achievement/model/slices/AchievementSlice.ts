import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAchievement } from '../services/createAchievement';
import { deleteAchievement } from '../services/deleteAchievement';
import { Achievement, AchievementSchema } from '../types/AchievementSchema';
import { fetchAchievement } from '../services/fetchAchievement';

const initialState: AchievementSchema = {
    data: {},
    error: undefined,
    isLoading: false,
};

export const AchievementSlice = createSlice({
    name: 'Achievement',
    initialState,
    reducers: {
        setAchievement: (state, action: PayloadAction<Achievement>) => {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAchievement.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchAchievement.fulfilled, (state, action: PayloadAction<Achievement>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchAchievement.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(createAchievement.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(createAchievement.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(createAchievement.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(deleteAchievement.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(deleteAchievement.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteAchievement.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: AchievementActions } = AchievementSlice;
export const { reducer: AchievementReducer } = AchievementSlice;
