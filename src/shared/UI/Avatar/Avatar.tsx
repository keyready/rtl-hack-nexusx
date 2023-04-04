import { classNames } from 'shared/lib/classNames/classNames';
import { CSSProperties, useMemo } from 'react';
import classes from './Avatar.module.scss';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
    rounded?: number;
}

export const Avatar = (props: AvatarProps) => {
    const {
        className,
        src,
        size,
        alt,
        rounded,
    } = props;

    const styles = useMemo<CSSProperties>(() => ({
        width: size || 100,
        height: size || 100,
        borderRadius: `${rounded}%` || '50%',
    }), [size, rounded]);

    return (
        <img
            className={classNames(classes.Avatar, {}, [className])}
            src={src}
            alt={alt}
            style={styles}
        />
    );
};
