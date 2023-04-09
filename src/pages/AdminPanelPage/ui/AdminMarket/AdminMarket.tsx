import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import classes from './AdminMarket.module.scss';

interface AdminMarketProps {
    className?: string;
}

export const AdminMarket = memo((props: AdminMarketProps) => {
    const {
        className,
    } = props;

    return (
        <div className={classNames(classes.AdminMarket, {}, [className])} />
    );
});
