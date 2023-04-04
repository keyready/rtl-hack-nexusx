import { StateSchema } from 'app/providers/StoreProvider';

export const getLoginLastname = (state: StateSchema) => state.loginForm?.lastname || '';
export const getLoginFirstname = (state: StateSchema) => state.loginForm?.firstname || '';
export const getLoginMiddlename = (state: StateSchema) => state.loginForm?.middlename || '';
export const getLoginEmail = (state: StateSchema) => state.loginForm?.email || '';
