import { StateSchema } from 'app/providers/StoreProvider';

export const getCustomerData = (state: StateSchema) => state.customer?.data;
export const getCustomerIsLoading = (state: StateSchema) => state.customer?.isLoading;
export const getCustomerError = (state: StateSchema) => state.customer?.error;
