import { classNames } from 'shared/lib/classNames/classNames';
import { Link, LinkProps } from 'react-router-dom';
import { HTMLAttributeAnchorTarget, memo, ReactNode } from 'react';
import classes from './AppLink.module.scss';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    OUTLINED = 'outlined',
    INVERTED = 'inverted',
    OUTLINED_INVERTED = 'outlined-inverted',
}

interface AppLinkProps extends LinkProps {
    className?: string
    theme?: AppLinkTheme
    children?: ReactNode;
    target?: HTMLAttributeAnchorTarget;
}

export const AppLink = memo((props: AppLinkProps) => {
    const {
        to,
        className,
        children,
        theme = AppLinkTheme.PRIMARY,
        target,
        ...otherProps
    } = props;

    return (
        <Link
            target={target}
            to={to}
            className={classNames(
                classes.AppLink,
                {},
                [className, classes[theme]],
            )}
            {...otherProps}
        >
            {children}
        </Link>
    );
});
