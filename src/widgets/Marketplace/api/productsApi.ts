import { rtkApi } from 'shared/api/rtkApi';
import { Product } from 'entities/Product';

interface searchParams {
    type?: string;
    search: string;
}

const productsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getProductsList: build.query<Product[], searchParams>({
            query: (props) => ({
                url: '/products',
                params: {
                    _type: props.type,
                    _search: props.search,
                },
            }),
        }),
    }),
});

export const useProducts = productsApi.useGetProductsListQuery;
