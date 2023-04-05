import { StateSchema } from 'app/providers/StoreProvider';

export const getLoginIsLoading = (state: StateSchema) => state?.loginForm?.isLoading || false;
export const getLoginError = (state: StateSchema) => state?.loginForm?.error;
