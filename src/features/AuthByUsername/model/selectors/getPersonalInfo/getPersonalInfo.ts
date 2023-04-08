import { StateSchema } from 'app/providers/StoreProvider';

export const getLoginUsername = (state: StateSchema) => state?.loginForm?.userData.username || '';
export const getLoginPassword = (state: StateSchema) => state?.loginForm?.userData.password || '';
export const getLoginLastname = (state: StateSchema) => state.loginForm?.userData.lastname || '';
export const getLoginFirstname = (state: StateSchema) => state.loginForm?.userData.firstname || '';
export const getLoginMiddlename = (
    state: StateSchema,
) => state.loginForm?.userData.middlename || '';
export const getLoginEmail = (state: StateSchema) => state.loginForm?.userData.email || '';
