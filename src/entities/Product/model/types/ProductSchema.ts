export interface Product {
    id?: number;
    title?: string;
    coinsCost?: number;
    image?: string;
    type?: 'all' | 'custom' | 'vip' | 'stat';
}

export interface ProductSchema {
    data?: Product;
    isLoading: boolean;
    error?: string;
}
