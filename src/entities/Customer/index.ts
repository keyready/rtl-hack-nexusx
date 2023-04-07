export { CustomerCard } from './ui/Customer/CustomerCard';
export type { CustomerSchema, Customer } from './model/types/CustomerSchema';
export {
    fetchCustomer,
} from './model/services/fetchCustomer';
export {
    getCustomerData,
    getCustomerIsLoading,
    getCustomerError,
} from './model/selectors/getCustomerData';
export { CustomerReducer, CustomerActions } from './model/slices/CustomerSlice';
