import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import {
    getUserAuthData, isUserAdmin, isUserManager, userActions,
} from 'entities/User';
import { Text, TextTheme } from 'shared/UI/Text/ui/Text';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Avatar } from 'shared/UI/Avatar/Avatar';
import { Dropdown } from 'shared/UI/Dropdown';
import { HStack } from 'shared/UI/Stack';
import { Button } from 'react-bootstrap';
import classes from './Navbar.module.scss';

export interface NavbarProps {
    className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const userData = useSelector(getUserAuthData);
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const onCloseModal = useCallback(() => {
        setIsModalVisible(false);
    }, []);
    const onLogin = useCallback(() => {
        setIsModalVisible(true);
    }, []);
    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    const isAdminPanelAvailable = isAdmin || isManager;

    if (userData?.id) {
        return (
            <HStack justify="between" className={classNames(classes.Navbar, {}, [className])}>
                <HStack justify="start" gap="8">
                    <Text
                        className={classes.appName}
                        theme={TextTheme.INVERTED}
                        title="Keyready App"
                    />
                </HStack>

                <Dropdown
                    direction="bottom left"
                    className={classes.link}
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
            </HStack>
        );
    }

    return (
        <div className={classNames(classes.Navbar, {}, [className])}>
            <Button
                variant="primary"
                className={classes.link}
                onClick={onLogin}
            >
                Войти
            </Button>
            {isModalVisible && <LoginModal isOpen={isModalVisible} onClose={onCloseModal} />}
        </div>
    );
});
