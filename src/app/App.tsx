import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from 'app/providers/AppRouter';
import { Navbar } from 'widgets/Navbar';
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInited, userActions } from 'entities/User';

export const App = () => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const inited = useSelector(getUserInited);

    // проверить, был ли авторизован пользователь перед закрытием вкладки
    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div
            className={classNames('app', {}, [theme])}
        >
            <Suspense fallback="">
                <Navbar />
                <div className="page">
                    {inited && <AppRouter />}
                </div>
            </Suspense>
        </div>
    );
};
