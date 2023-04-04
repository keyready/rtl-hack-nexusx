import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';

interface LoginByUsernameProps {
    mail?: string;
    firstname?: string;
    lastname?: string;
    middlename?: string;
    password: string;
}

export const registerUser = createAsyncThunk<
    string,
    any,
    ThunkConfig<string>>(
        'registration/registerUser',
        async (registerData, thunkAPI) => {
            const { extra, rejectWithValue } = thunkAPI;

            try {
                const response = await extra.api.post<string>('/upload', registerData);

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (e) {
                return rejectWithValue('registration error');
            }
        },
    );
