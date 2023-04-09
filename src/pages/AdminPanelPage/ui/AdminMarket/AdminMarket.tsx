import { classNames } from 'shared/lib/classNames/classNames';
import {
    FormEvent, memo, useCallback, useState,
} from 'react';
import { Button, Modal } from 'react-bootstrap';
import { HStack, VStack } from 'shared/UI/Stack';
import { ContentWrapper } from 'shared/UI/ContentWrapper';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useProducts } from 'widgets/Marketplace';
import { ProductCard, createProduct, deleteProduct } from 'entities/Product';
import { CreateProductForm } from './CreateProductForm/CreateProductForm';
import classes from './AdminMarket.module.scss';

interface AdminMarketProps {
    className?: string;
}

export const AdminMarket = memo((props: AdminMarketProps) => {
    const {
        className,
    } = props;

    const { data: products } = useProducts({ search: '', type: 'all' });

    const dispatch = useAppDispatch();

    const [show, setShow] = useState(false);

    const showHandler = useCallback(() => {
        setShow(true);
    }, []);

    const deleteProductHandler = useCallback((id: number) => {
        dispatch(deleteProduct(id));
    }, [dispatch]);
    const createProductHandler = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const result = await dispatch(createProduct(formData));
        setShow(false);
    }, [dispatch]);

    return (
        <VStack>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить товар</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateProductForm onClick={createProductHandler} />
                </Modal.Body>
            </Modal>

            <HStack max>
                <Button
                    onClick={showHandler}
                    className={classes.btn}
                >
                    Добавить товар
                </Button>
            </HStack>
            <ContentWrapper
                className={classNames(classes.AdminAchievements, {}, [className])}
            >
                <VStack max justify="start" gap="16">
                    {products && products.map((product) => (
                        <div
                            className={classes.card}
                            key={product.id}
                        >
                            <ProductCard
                                product={product}
                            />
                            <Button
                                className={classes.deleteBtn}
                                variant="danger"
                                onClick={() => deleteProductHandler(product.id || 0)}
                            >
                                Удалить
                            </Button>
                        </div>
                    ))}
                </VStack>
            </ContentWrapper>
        </VStack>
    );
});
