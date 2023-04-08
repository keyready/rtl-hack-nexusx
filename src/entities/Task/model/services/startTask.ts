import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';

interface StartTaskProps {
    customerId?: number;
    taskId?: number
}

export const startTask = createAsyncThunk<
    string,
    StartTaskProps,
    ThunkConfig<string>
>(
    'startTask/startTask',
    async (props, thunkAPI) => {
        const {
            extra,
            rejectWithValue,
        } = thunkAPI;

        try {
            const response = await extra.api.post<string>(
                '/start_task',
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
