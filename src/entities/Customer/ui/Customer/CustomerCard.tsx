import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import classes from './CustomerCard.module.scss';

interface CustomerProps {
    className?: string;
}

export const CustomerCard = memo((props: CustomerProps) => {
    const { className } = props;

    return (
        <div className={classNames(classes.Customer, {}, [className])} />
    );
});
