import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createTask } from '../services/createTask';
import { deleteTask } from '../services/deleteTask';
import { startTask } from '../services/startTask';
import { abortTask } from '../services/abortTask';
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
    extraReducers: (builder) => {
        builder
            .addCase(startTask.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(startTask.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(startTask.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(abortTask.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(abortTask.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(abortTask.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(createTask.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(createTask.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(createTask.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(deleteTask.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(deleteTask.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: TaskActions } = TaskSlice;
export const { reducer: TaskReducer } = TaskSlice;
