import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { loginActions } from '../../slices/loginSlice';

export const registerUser = createAsyncThunk<
    string,
    any,
    ThunkConfig<string>>(
        'registration/registerUser',
        async (registerData, thunkAPI) => {
            const { extra, rejectWithValue, dispatch } = thunkAPI;

            try {
                const response = await extra.api.post<string>(
                    '/register',
                    registerData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                        onUploadProgress: (progressEvent) => {
                            dispatch(loginActions.setTotalFileSize(progressEvent.total));
                            dispatch(loginActions.setCurrentlyUploaded(progressEvent.loaded));
                        },
                    },
                );

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (e) {
                return rejectWithValue('registration error');
            }
        },
    );
