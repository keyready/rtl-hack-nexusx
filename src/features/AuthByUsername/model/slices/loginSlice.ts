import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registerUser } from '../services/registerUser/registerUser';
import { LoginSchema } from '../types/loginSchema';
import { loginByUsername } from '../services/loginByUsername/loginByUsername';

const initialState: LoginSchema = {
    uploadProgress: { currentlyUploaded: 0, totalFileSize: 0 },
    userData: {
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        middlename: '',
        email: '',
    },
    isLoading: false,
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername: (state, action:PayloadAction<string>) => {
            state.userData.username = action.payload;
        },
        setPassword: (state, action:PayloadAction<string>) => {
            state.userData.password = action.payload;
        },
        setFirstname: (state, action: PayloadAction<string>) => {
            state.userData.firstname = action.payload;
        },
        setLastname: (state, action: PayloadAction<string>) => {
            state.userData.lastname = action.payload;
        },
        setMiddlename: (state, action: PayloadAction<string>) => {
            state.userData.middlename = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.userData.email = action.payload;
        },

        setTotalFileSize: (state, action: PayloadAction<number>) => {
            state.uploadProgress.totalFileSize = action.payload;
        },
        setCurrentlyUploaded: (state, action: PayloadAction<number>) => {
            state.uploadProgress.currentlyUploaded = action.payload;
        },
    },
    extraReducers: ((builder) => {
        builder
            .addCase(loginByUsername.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(loginByUsername.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(loginByUsername.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(registerUser.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }),
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
