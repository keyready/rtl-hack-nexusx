import { AppLink, AppLinkTheme } from 'shared/UI/AppLink/ui/AppLink';
import { useLocation } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { SidebarItemType } from '../../model/types/sidebar';
import classes from './SidebarItem.module.scss';

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed?: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
    const location = useLocation();
    const isAuth = useSelector(getUserAuthData);

    if (item.authOnly && !isAuth) {
        return null;
    }

    return (
        <AppLink
            to={item?.path || ''}
            className={classNames(classes.item, { [classes.collapsed]: collapsed }, [])}
            theme={location.pathname === item?.path
                ? AppLinkTheme.OUTLINED_INVERTED
                : AppLinkTheme.INVERTED}
        >
            <item.Icon className={classes.icon} />
            <span className={classes.link}>
                {item?.text}
            </span>
        </AppLink>
    );
});
