import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registerCustomer } from '../services/registerCustomer';
import { RegisterPageSchema } from '../types/RegisterPageSchema';

const initialState: RegisterPageSchema = {
    error: '',
    isLoading: false,
    data: '',
};

export const RegisterPageSlice = createSlice({
    name: 'RegisterPage',
    initialState,
    reducers: {
        template: (state, action: PayloadAction<string>) => {

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerCustomer.pending, (state) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(registerCustomer.fulfilled, (state) => {
                state.error = '';
                state.isLoading = false;
                state.data = 'Регистрация успешна';
            })
            .addCase(registerCustomer.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || '';
            });
    },
});

export const { actions: RegisterPageActions } = RegisterPageSlice;
export const { reducer: RegisterPageReducer } = RegisterPageSlice;
