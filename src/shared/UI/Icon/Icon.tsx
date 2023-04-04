import { classNames } from 'shared/lib/classNames/classNames';
import React from 'react';
import classes from './Icon.module.scss';

interface IconProps {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>
}

export const Icon = (props: IconProps) => {
    const {
        className,
        Svg,
    } = props;

    return (
        <Svg className={classNames(classes.Icon, {}, [className])} />
    );
};
