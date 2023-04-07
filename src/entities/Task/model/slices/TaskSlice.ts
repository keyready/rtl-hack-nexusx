import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskSchema } from '../types/TaskSchema';

const initialState: TaskSchema = {
    data: {},
    error: undefined,
    isLoading: false,
};

export const TaskSlice = createSlice({
    name: 'Task',
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

export const { actions: TaskActions } = TaskSlice;
export const { reducer: TaskReducer } = TaskSlice;
