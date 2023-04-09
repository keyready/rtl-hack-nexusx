import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/mainPage';
import { AboutPage } from 'pages/aboutPage';
import { NotFound } from 'pages/NotFound';
import { UserRoles } from 'entities/User';
import { AdminPanelPage } from 'pages/AdminPanelPage';
import { ForbiddenPage } from 'pages/ForbiddenPage';
import { CustomerProfilePage } from 'pages/CustomerProfilePage';
import { RegisterPage } from 'pages/RegisterPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRoles[];
}

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    ADMIN_PANEL = 'admin_panel',
    CUSTOMER_PROFILE = 'customer_profile',
    REGISTER_PAGE = 'register_page',

    // last
    FORBIDDEN = 'forbidden',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    // main
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.REGISTER_PAGE]: '/register',
    [AppRoutes.CUSTOMER_PROFILE]: '/customer/',
    [AppRoutes.ADMIN_PANEL]: '/admin',

    // last
    [AppRoutes.FORBIDDEN]: '/forbidden',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routerConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage />,
    },
    [AppRoutes.REGISTER_PAGE]: {
        path: RoutePath.register_page,
        element: <RegisterPage />,
    },
    [AppRoutes.CUSTOMER_PROFILE]: {
        path: `${RoutePath.customer_profile}:id`,
        element: <CustomerProfilePage />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_PANEL]: {
        path: RoutePath.admin_panel,
        element: <AdminPanelPage />,
        authOnly: true,
        roles: [UserRoles.ADMIN, UserRoles.MANAGER],
    },

    // last
    [AppRoutes.FORBIDDEN]: {
        path: RoutePath.forbidden,
        element: <ForbiddenPage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFound />,
    },
};
