import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Icon } from 'shared/UI/Icon/Icon';
import VerifiedIcon from 'shared/assets/icons/verified.svg';
import { Avatar } from 'shared/UI/Avatar/Avatar';
import { Text, TextSize } from 'shared/UI/Text';
import { HStack } from 'shared/UI/Stack';
import { Customer } from '../../model/types/CustomerSchema';
import classes from './CustomerCard.module.scss';

interface CustomerProps {
    className?: string;
    customer?: Customer
}

type avatarLvl = 'lvl1' | 'lvl2' | 'lvl3' | 'lvl4'

export const CustomerCard = memo((props: CustomerProps) => {
    const { className, customer } = props;

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
                src="https://i.pravatar.cc/300"
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
