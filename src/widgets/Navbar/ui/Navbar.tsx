import { classNames } from 'shared/lib/classNames/classNames';
import {
    memo, useCallback, useMemo, useState,
} from 'react';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import {
    getUserAuthData, isUserAdmin, isUserManager, userActions,
} from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Avatar } from 'shared/UI/Avatar/Avatar';
import { Dropdown } from 'shared/UI/Dropdown';
import { HStack, VStack } from 'shared/UI/Stack';
import { Button, ButtonGroup } from 'react-bootstrap';
import { AppLink } from 'shared/UI/AppLink';
import { AppLinkTheme } from 'shared/UI/AppLink/ui/AppLink';
import { Icon } from 'shared/UI/Icon/Icon';
import MenuOpen from 'shared/assets/icons/menu-open.svg';
import classes from './Navbar.module.scss';

export interface NavbarProps {
    className?: string
    setShow?: (value: boolean) => void;
}

export const Navbar = memo((props: NavbarProps) => {
    const {
        className,
        setShow,
    } = props;

    const userData = useSelector(getUserAuthData);
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const onCloseModal = useCallback(() => {
        setIsModalVisible(false);
    }, []);
    const onLogin = useCallback(() => {
        setShow?.(false);
        setIsModalVisible(true);
    }, [setShow]);
    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);
    const onRegister = useCallback(() => {
        setShow?.(true);
    }, [setShow]);

    const content = useMemo(() => (
        <>
            <img
                src="/static/images/ret-logo-header.svg"
                alt="Лого"
            />

            <Dropdown
                className={classes.linksDropdown}
                direction="bottom right"
                trigger={(
                    <HStack gap="32">
                        <h2>Меню</h2>
                        <Icon Svg={MenuOpen} />
                    </HStack>
                )}
                items={[
                    {
                        content: 'Торги', href: '/about',
                    },
                    {
                        content: 'Услуги и сервисы', href: '#',
                    },
                    {
                        content: 'Удостоверяющий центр', href: '#',
                    },
                    {
                        content: 'Клиентам', href: '#',
                    },
                    {
                        content: 'О площадке', href: '#',
                    },
                ]}
            />

            <HStack
                className={classes.links}
                gap="8"
                justify="between"
            >
                <AppLink
                    theme={AppLinkTheme.INVERTED}
                    className={classes.link}
                    to="#"
                >
                    Торги
                </AppLink>
                <AppLink
                    theme={AppLinkTheme.INVERTED}
                    className={classes.link}
                    to="#"
                >
                    Услуги и сервисы
                </AppLink>
                <AppLink
                    theme={AppLinkTheme.INVERTED}
                    className={classes.link}
                    to="#"
                >
                    Удостоверяющий центр
                </AppLink>
                <AppLink
                    theme={AppLinkTheme.INVERTED}
                    className={classes.link}
                    to="#"
                >
                    Клиентам
                </AppLink>
                <AppLink
                    theme={AppLinkTheme.INVERTED}
                    to="#"
                >
                    О площадке
                </AppLink>
            </HStack>
        </>
    ), []);

    const isAdminPanelAvailable = isAdmin || isManager;

    if (userData?.id) {
        return (
            <HStack justify="between" className={classNames(classes.Navbar, {}, [className])}>
                {content}

                <Dropdown
                    direction="bottom left"
                    trigger={<Avatar src={userData.avatar} size={40} />}
                    items={[
                        ...(isAdminPanelAvailable
                            ? [{
                                content: 'Админка',
                                href: RoutePath.admin_panel,
                            }] : []),
                        {
                            content: 'Профиль',
                            href: 'ссылка до профиля',
                        },
                        {
                            content: 'Выйти',
                            onClick: onLogout,
                        },
                    ]}
                />
                <HStack max className={classes.bannerWrapper}>
                    <img
                        className={classes.banner}
                        src="/static/images/main-banner.png"
                        alt="Баннер"
                    />
                </HStack>
            </HStack>
        );
    }

    return (
        <VStack gap="0" className={classes.header}>
            <HStack max justify="between" className={classNames(classes.Navbar, {}, [className])}>
                {content}
                <ButtonGroup>
                    <Button
                        variant="outline-primary"
                        onClick={onRegister}
                    >
                        Регистрация
                    </Button>
                    <Button
                        variant="primary"
                        onClick={onLogin}
                    >
                        Войти
                    </Button>
                </ButtonGroup>
                {isModalVisible && <LoginModal isOpen={isModalVisible} onClose={onCloseModal} />}
            </HStack>
            <HStack max className={classes.bannerWrapper}>
                <img
                    className={classes.banner}
                    src="/static/images/main-banner.png"
                    alt="Баннер"
                />
            </HStack>
        </VStack>
    );
});
