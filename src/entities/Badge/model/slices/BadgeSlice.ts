import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BadgeSchema } from '../types/BadgeSchema';

const initialState: BadgeSchema = {
    data: {},
    error: undefined,
    isLoading: false,
};

export const BadgeSlice = createSlice({
    name: 'Badge',
    initialState,
    reducers: {
        template: (state, action: PayloadAction<string>) => {

        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const { actions: BadgeActions } = BadgeSlice;
export const { reducer: BadgeReducer } = BadgeSlice;
