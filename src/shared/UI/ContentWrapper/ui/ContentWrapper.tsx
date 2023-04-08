import { classNames } from 'shared/lib/classNames/classNames';
import { memo, ReactNode } from 'react';
import classes from './ContentWrapper.module.scss';

interface ContentWrapperProps {
    className?: string;
    children?: ReactNode
}

export const ContentWrapper = memo((props: ContentWrapperProps) => {
    const {
        className,
        children,
    } = props;

    return (
        <section className={classNames(classes.ContentWrapper, {}, [className])}>
            {children}
        </section>
    );
});
