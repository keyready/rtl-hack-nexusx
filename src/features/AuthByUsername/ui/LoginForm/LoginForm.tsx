import { classNames } from 'shared/lib/classNames/classNames';
import { Alert, Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ChangeEvent, memo, useCallback } from 'react';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    getLoginPassword,
    getLoginUsername,
} from '../../model/selectors/getPersonalInfo/getPersonalInfo';
import {
    getLoginError,
    getLoginIsLoading,
} from '../../model/selectors/getLoginStatus/getLoginStatus';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import classes from './LoginForm.module.scss';
import { loginActions, loginReducer } from '../../model/slices/loginSlice';

export interface LoginFormProps {
    className?: string;
    onSuccess?: () => void
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm = memo((props: LoginFormProps) => {
    const dispatch = useAppDispatch();

    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

    const {
        className,
        onSuccess,
    } = props;

    const onUsernameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);
    const onPasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);
    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess?.();
        }
    }, [dispatch, onSuccess, password, username]);

    return (
        <DynamicModuleLoader
            removeAfterUnmount
            reducers={initialReducers}
        >
            <form
                className={classNames(classes.LoginForm, {}, [className])}
            >
                {error && (
                    <Alert
                        variant="danger"
                        className={classes.loginError}
                    >
                        {error}
                    </Alert>
                )}
                <Form.Control
                    autoFocus
                    placeholder="Введите имя"
                    value={username}
                    onChange={onUsernameChange}
                    type="text"
                />
                <Form.Control
                    placeholder="Введите пароль"
                    value={password}
                    onChange={onPasswordChange}
                    type="password"
                />
                <Button
                    variant="primary"
                    className={classes.loginBtn}
                    onClick={onLoginClick}
                    disabled={isLoading}
                    type="submit"
                >
                    Войти
                </Button>
            </form>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
