import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import classes from './Badge.module.scss';

interface BadgeProps {
    className?: string;
}

export const Badge = memo((props: BadgeProps) => {
    const { className } = props;

    return (
        <div className={classNames(classes.Badge, {}, [className])} />
    );
});
