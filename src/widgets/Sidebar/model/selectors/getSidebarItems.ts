import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainIcon from 'shared/assets/icons/home.svg';
import AboutIcon from 'shared/assets/icons/about.svg';
import ArticlesIcon from 'shared/assets/icons/articles.svg';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const SidebarItemsList: SidebarItemType[] = [
            {
                path: RoutePath.main,
                text: 'Главная',
                Icon: MainIcon,
            },
            {
                path: RoutePath.about,
                text: 'О проекте',
                Icon: AboutIcon,
            },
        ];
        if (userData) {
            SidebarItemsList.push(
                // {
                //     path: RoutePath.profile + userData.id,
                //     text: 'Мой профиль',
                //     Icon: ProfileIcon,
                //     authOnly: true,
                // },
                {
                    path: RoutePath.admin_panel,
                    text: 'Админка',
                    Icon: ArticlesIcon,
                    authOnly: true,
                },
            );
        }

        return SidebarItemsList;
    },
);
