import { classNames } from 'shared/lib/classNames/classNames';
import { CSSProperties, useMemo } from 'react';
import classes from './Avatar.module.scss';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    width?: number;
    height?: number;
    alt?: string;
    rounded?: number;
}

export const Avatar = (props: AvatarProps) => {
    const {
        className,
        src,
        size,
        height,
        width,
        alt,
        rounded,
    } = props;

    const styles = useMemo<CSSProperties>(() => ({
        width: size || width || 100,
        height: size || height || 100,
        borderRadius: `${rounded}%` || '50%',
    }), [size, width, height, rounded]);

    return (
        <img
            className={classNames(classes.Avatar, {}, [className])}
            src={src}
            alt={alt}
            style={styles}
        />
    );
};
