import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from 'app/providers/AppRouter';
import { Navbar } from 'widgets/Navbar';
import { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, getUserInited, userActions } from 'entities/User';
import { RegistrationForm } from 'features/AuthByUsername';
import { Sidebar } from 'shared/UI/Sidebar';

export const App = () => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const inited = useSelector(getUserInited);
    const userData = useSelector(getUserAuthData);

    const [show, setShow] = useState<boolean>(false);

    // проверить, был ли авторизован пользователь перед закрытием вкладки
    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div
            className={classNames('app', {}, [theme])}
        >
            <Suspense fallback="">
                <Navbar setShow={setShow} />
                <div className="page">
                    {!userData && (
                        <Sidebar
                            direction="end"
                            show={show}
                            setShow={setShow}
                            header="Регистрация"
                        >
                            <RegistrationForm onRegisterSuccessful={() => setShow(false)} />
                        </Sidebar>
                    )}
                    {inited && <AppRouter />}
                </div>
            </Suspense>
        </div>
    );
};
