import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Icon } from 'shared/UI/Icon/Icon';
import VerifiedIcon from 'shared/assets/icons/verified.svg';
import { Avatar } from 'shared/UI/Avatar/Avatar';
import { Text, TextSize } from 'shared/UI/Text';
import { HStack, VStack } from 'shared/UI/Stack';
import { useSelector } from 'react-redux';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import { getCustomerIsLoading } from '../../model/selectors/getCustomerData';
import { Customer } from '../../model/types/CustomerSchema';
import classes from './CustomerCard.module.scss';

interface CustomerProps {
    className?: string;
    customer?: Customer
}

type avatarLvl = 'lvl1' | 'lvl2' | 'lvl3' | 'lvl4'

export const CustomerCard = memo((props: CustomerProps) => {
    const { className, customer } = props;

    const isLoading = useSelector(getCustomerIsLoading);

    const avatarLvlMapper: Record<avatarLvl, string> = {
        lvl1: classes.lvl1,
        lvl2: classes.lvl2,
        lvl3: classes.lvl3,
        lvl4: classes.lvl4,
    };

    const lvlClasses = [];
    if (customer?.level) {
        lvlClasses.push(avatarLvlMapper[customer.level]);
    }

    if (isLoading) {
        return (
            <HStack
                justify="start"
                className={classNames(classes.CustomerCard, {}, [className])}
                max
            >
                <Skeleton
                    className={
                        classNames(classes.avatar, {}, lvlClasses)
                    }
                    width={150}
                    height={150}
                    border="50%"
                />

                {new Array(3).fill(0).map((_, index) => (
                    <VStack key={index} gap="16">
                        <Skeleton
                            width={120}
                            height={50}
                            border="10px"
                        />
                        <Skeleton
                            width={220}
                            height={25}
                            border="5px"
                        />
                    </VStack>
                ))}
            </HStack>
        );
    }

    return (
        <HStack
            justify="start"
            className={classNames(classes.CustomerCard, {}, [className])}
            max
        >
            {customer?.level === 'lvl4' && (
                <Icon
                    className={classes.verified}
                    Svg={VerifiedIcon}
                />
            )}
            <Avatar
                className={
                    classNames(classes.avatar, {}, lvlClasses)
                }
                src={customer?.avatar}
                size={150}
                rounded={50}
            />

            <Text
                size={TextSize.L}
                title={customer?.lastname}
                text={`${customer?.firstname} ${customer?.middlename}`}
            />

            <Text
                size={TextSize.L}
                title="Баланс"
                text={`${customer?.balance}`}
            />

            <Text
                size={TextSize.L}
                title="Опыт"
                text={`${customer?.experience}`}
            />
        </HStack>
    );
});
