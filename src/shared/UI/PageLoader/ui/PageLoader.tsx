import { classNames } from 'shared/lib/classNames/classNames';
import { FC } from 'react';
import { Loader } from '../../Loader';
import classes from './PageLoader.module.scss';

interface PageLoaderProps {
    className?: string;
}

export const PageLoader: FC<PageLoaderProps> = (
    { className } : PageLoaderProps,
) => (
    <div className={classNames(classes.PageLoader, {}, [className])}>
        <Loader />
    </div>
);
