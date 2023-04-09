export type { ProductSchema, Product } from './model/types/ProductSchema';
export { ProductActions, ProductReducer } from './model/slices/ProductSlice';
export {
    getProductData,
    getProductError,
    getProductIsLoading,
} from './model/selectors/getProductData';
export { createProduct } from './model/services/createProduct';
export { deleteProduct } from './model/services/deleteProduct';
