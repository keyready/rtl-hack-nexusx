import { classNames } from 'shared/lib/classNames/classNames';
import {
    memo, useCallback, useEffect, useMemo, useState,
} from 'react';
import { HStack, VStack } from 'shared/UI/Stack';
import { Avatar } from 'shared/UI/Avatar/Avatar';
import { Text, TextSize } from 'shared/UI/Text';
import { Alert, Button, Spinner } from 'react-bootstrap';
import { Customer } from 'entities/Customer';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import classes from './ProductCard.module.scss';
import { Product } from '../../model/types/ProductSchema';
import { buyProduct } from '../../model/services/buyProduct';

interface ProductCardProps {
    className?: string;
    product?: Product;
    customer?: Customer;
}

export const ProductCard = memo((props: ProductCardProps) => {
    const { className, product, customer } = props;

    const dispatch = useAppDispatch();

    const [isAvailable, setIsAvailable] = useState<boolean>(false);
    const [isBought, setIsBought] = useState<boolean>(false);
    const [isPurchaseProcessing, setIsPurchaseProcessing] = useState<boolean>(false);
    const [purchaseResult, setPurchaseResult] = useState<string>('');
    const [purchaseResultVisibility, setPurchaseResultVisibility] = useState(false);

    useEffect(() => {
        if (customer?.availableBadges && customer?.boughtBadges) {
            setIsAvailable(customer?.availableBadges.includes(product?.id || 0));
            setIsBought(customer?.boughtBadges.includes(product?.id || 0));
        }
    }, [customer?.availableBadges, customer?.boughtBadges, product?.id]);

    const buttonText = useMemo(() => {
        if (!isAvailable && !isBought) return 'Недоступно';
        if (isAvailable && !isBought) return 'Купить';
        return 'Куплено';
    }, [isAvailable, isBought]);

    const buyProductHandler = useCallback(async () => {
        setIsPurchaseProcessing(true);
        const result = await dispatch(buyProduct(
            { customerId: customer?.id, productId: product?.id },
        ));

        if (result.meta.requestStatus === 'fulfilled') {
            setPurchaseResult('Куплено!');
            setPurchaseResultVisibility(true);
            setIsPurchaseProcessing(false);
        } else {
            setPurchaseResult('Проверьте баланс..)');
            setPurchaseResultVisibility(true);
            setIsPurchaseProcessing(false);
        }
    }, [customer?.id, dispatch, product]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPurchaseResultVisibility(false);
            setPurchaseResult('');
        }, 1500);

        return () => clearTimeout(timer);
    }, [purchaseResult]);

    return (
        <VStack
            max
            justify="start"
            className={classNames(classes.ProductCard, {
                [classes.unavailable]: !isAvailable || isBought,
            }, [className])}
        >
            {purchaseResultVisibility && (
                purchaseResult.includes('Куплено') ? (
                    <Alert className={classes.alert} variant="success">{purchaseResult}</Alert>
                ) : purchaseResult.includes('Ошибка') ? (
                    <Alert className={classes.alert} variant="danger">{purchaseResult}</Alert>
                ) : ''
            )}
            <HStack
                max
                justify="between"
            >
                <Avatar
                    className={classes.image}
                    src={product?.image}
                    width={130}
                    height={120}
                    rounded={25}
                />
                <Text
                    title={product?.title}
                    text={`${product?.cost} RCoins`}
                    size={TextSize.M}
                />
            </HStack>
            {isAvailable
                ? (
                    <Text
                        text="Элемент кастомизации, чтобы подчеркнуть Вашу индивидуальность"
                    />
                )
                : isBought
                    ? (
                        <Text
                            text="Уже у Вас в кармане!"
                        />
                    )
                    : (
                        <Text
                            text="Выполните соответствующее достижение, чтобы разблокировать товар"
                        />
                    )}

            {isPurchaseProcessing
                ? (
                    <Button
                        className={classes.btn}
                        variant="primary"
                        disabled
                    >
                        <Spinner
                            className={classes.spinner}
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                        />
                        Обработка...
                    </Button>
                )
                : (
                    <Button
                        className={classes.btn}
                        variant={isAvailable
                            ? 'primary'
                            : isBought
                                ? 'outline-success'
                                : 'outline-danger'}
                        disabled={!isAvailable}
                        onClick={isAvailable && !isBought ? buyProductHandler : () => {}}
                    >
                        {buttonText}
                    </Button>
                )}
        </VStack>
    );
});
