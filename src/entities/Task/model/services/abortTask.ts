import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';

interface AbortTaskProps {
    customerId?: number;
    taskId?: number
}

export const abortTask = createAsyncThunk<
    string,
    AbortTaskProps,
    ThunkConfig<string>
>(
    'abortTask$/abortTask',
    async (props, thunkAPI) => {
        const {
            extra,
            rejectWithValue,
        } = thunkAPI;

        try {
            const response = await extra.api.post<string>(
                '/abort_task',
                props,
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
