import { StateSchema } from 'app/providers/StoreProvider';

export const getTotalFileSize = (
    state: StateSchema,
) => state.loginForm?.uploadProgress.totalFileSize || 0;
export const getCurrentlyUploaded = (
    state: StateSchema,
) => state.loginForm?.uploadProgress.currentlyUploaded || 0;
