import { memo, useMemo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'shared/UI/ThemeSwitcher';
import { useSelector } from 'react-redux';
import { VStack } from 'shared/UI/Stack/VStack/VStack';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import classes from './Sidebar.module.scss';

export interface SidebarProps {
    classname?: string
}

export const Sidebar = memo(({ classname }: SidebarProps) => {
    const SidebarItemsList = useSelector(getSidebarItems);
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const listItem = useMemo(
        () => SidebarItemsList.map((item) => (
            <SidebarItem
                key={item.path}
                collapsed={collapsed}
                item={item}
            />
        )),
        [SidebarItemsList, collapsed],
    );

    return (
        <aside
            data-testid="sidebar"
            className={classNames(
                classes.Sidebar,
                { [classes.collapsed]: collapsed },
                [classname],
            )}
        >
            <VStack role="navigation" gap="8" className={classes.items}>
                {listItem}
            </VStack>

            <VStack gap="8" align="center" className={classes.switchers}>
                <ThemeSwitcher />
                <button
                    type="button"
                    onClick={toggleSidebar}
                >
                    <h3>{collapsed ? '➥' : '⇐'}</h3>
                </button>
            </VStack>
        </aside>
    );
});
