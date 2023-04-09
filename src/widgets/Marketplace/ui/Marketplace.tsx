import { classNames } from 'shared/lib/classNames/classNames';
import {
    ChangeEvent, memo, useCallback, useEffect, useState,
} from 'react';
import { HStack } from 'shared/UI/Stack';
import { Customer, CustomerReducer } from 'entities/Customer';
import { ProductCard } from 'entities/Product/ui/ProductCard/ProductCard';
import { Loader } from 'shared/UI/Loader';
import { Form } from 'react-bootstrap';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { ProductReducer } from 'entities/Product';
import { useProducts } from '../api/productsApi';
import classes from './Marketplace.module.scss';

interface MarketplaceProps {
    className?: string;
    customer?: Customer;
}

const reducers: ReducersList = {
    product: ProductReducer,
    customer: CustomerReducer,
};

export const Marketplace = memo((props: MarketplaceProps) => {
    const {
        className,
        customer,
    } = props;

    const [productsType, setProductsType] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const changeSearchQueryHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }, []);
    const changeFiltersHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setProductsType(e.target.value);
    }, []);

    const { data: products, isLoading, refetch } = useProducts(
        { search: searchQuery, type: productsType },
    );

    useEffect(() => {
        refetch();
    }, [searchQuery, productsType, refetch]);

    if (isLoading) {
        return (
            <Loader />
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <HStack
                className={classNames(classes.Marketplace, {}, [className])}
                max
                justify="start"
                align="start"
                gap="32"
            >
                <Form
                    className={classes.filters}
                >
                    <Form.Control
                        className={classes.input}
                        placeholder="Поиск"
                        value={searchQuery}
                        onChange={changeSearchQueryHandler}
                    />
                    <Form.Check
                        value="all"
                        onChange={changeFiltersHandler}
                        defaultChecked
                        name="form"
                        type="radio"
                        label="Все"
                    />
                    <Form.Check
                        value="custom"
                        onChange={changeFiltersHandler}
                        name="form"
                        type="radio"
                        label="Кастомизация"
                    />
                    <Form.Check
                        value="vip"
                        onChange={changeFiltersHandler}
                        name="form"
                        type="radio"
                        label="Привилегии"
                    />
                    <Form.Check
                        value="stat"
                        onChange={changeFiltersHandler}
                        name="form"
                        type="radio"
                        label="Статистика"
                    />
                </Form>
                <div className={classes.productsPlace}>
                    {products && products.map((product) => (
                        <ProductCard product={product} customer={customer} />
                    ))}
                </div>
            </HStack>
        </DynamicModuleLoader>
    );
});
