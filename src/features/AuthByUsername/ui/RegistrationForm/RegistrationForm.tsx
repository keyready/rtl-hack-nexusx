/**
 * Товарищи, выходим на прогулку строиться, ПОЖАЛУЙСТА
 * (с) Федя Заволокин, 20:28, 04.04.2023
 */

import React, {
    ChangeEvent, FormEvent, memo, useCallback, useMemo, useState,
} from 'react';
import {
    Alert,
    Button, Form, InputGroup, ProgressBar, Spinner, Tab, Tabs,
} from 'react-bootstrap';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import {
    ReducersList,
    DynamicModuleLoader,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import VisibleEyeIcon from 'shared/assets/icons/visible-eye.svg';
import HiddenEyeIcon from 'shared/assets/icons/hidden-eye.svg';
import { Icon } from 'shared/UI/Icon/Icon';
import {
    getCurrentlyUploaded,
    getTotalFileSize,
} from '../../model/selectors/getLoginUploadProgress/getLoginUploadProgress';
import {
    getLoginError,
    getLoginIsLoading,
} from '../../model/selectors/getLoginStatus/getLoginStatus';
import { registerUser } from '../../model/services/registerUser/registerUser';
import { loginActions, loginReducer } from '../../model/slices/loginSlice';
import classes from './RegistrationForm.module.scss';
import {
    getLoginEmail,
    getLoginFirstname,
    getLoginLastname,
    getLoginMiddlename,
    getLoginUsername,
    getLoginPassword,
} from '../../model/selectors/getPersonalInfo/getPersonalInfo';

interface RegistrationFormProps {
    className?: string;
    onRegisterSuccessful?: () => void;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

export const RegistrationForm = memo((props: RegistrationFormProps) => {
    const {
        className,
        onRegisterSuccessful,
    } = props;

    const dispatch = useAppDispatch();
    const lastname = useSelector(getLoginLastname);
    const firstname = useSelector(getLoginFirstname);
    const middlename = useSelector(getLoginMiddlename);
    const email = useSelector(getLoginEmail);
    const password = useSelector(getLoginPassword);
    const username = useSelector(getLoginUsername);
    const isRegisterLoading = useSelector(getLoginIsLoading);
    const registerError = useSelector(getLoginError);
    const totalFileSize = useSelector(getTotalFileSize);
    const currentlyFileUploaded = useSelector(getCurrentlyUploaded);

    const [currentPage, setCurrentPage] = useState<string>('first');
    const [registerResult, setRegisterResult] = useState<string>('');
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const tabsNames: string[] = useMemo(() => ['first', 'second', 'third'], []);

    const nextTab = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nextIndex = tabsNames.indexOf(currentPage || '') + 1;
        if (nextIndex < 3) {
            setCurrentPage(tabsNames[nextIndex]);
        }
    }, [currentPage, tabsNames]);

    const changeFirstnameHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(loginActions.setFirstname(e.target.value));
    }, [dispatch]);
    const changeLastnameHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(loginActions.setLastname(e.target.value));
    }, [dispatch]);
    const changeMiddlenameHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(loginActions.setMiddlename(e.target.value));
    }, [dispatch]);
    const changeEmailHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(loginActions.setEmail(e.target.value));
    }, [dispatch]);
    const changePasswordHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(loginActions.setPassword(e.target.value));
    }, [dispatch]);
    const changeUsernameHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(loginActions.setUsername(e.target.value));
    }, [dispatch]);

    const submitRegistration = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const file = new FormData(e.currentTarget);

        file.append('userData', JSON.stringify({
            lastname,
            firstname,
            middlename,
            email,
            username,
            password,
        }));

        const result = await dispatch(registerUser(file));
        if (result.meta.requestStatus === 'fulfilled') {
            setRegisterResult('Регистрация успешна!');
        }
    }, [dispatch, email, firstname, lastname, middlename, password, username]);

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={false}>
            <Tabs
                activeKey={currentPage}
                onSelect={(k) => setCurrentPage(k || '')}
                variant="pills"
            >
                <Tab
                    eventKey="first"
                    title="ФИО"
                    disabled={!(tabsNames.indexOf('first') <= tabsNames.indexOf(currentPage))}
                >
                    <Form
                        className={classes.form}
                        onSubmit={nextTab}
                    >
                        <InputGroup className="mb-3">
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Фамилия</InputGroup.Text>
                                <Form.Control
                                    autoFocus
                                    onChange={changeLastnameHandler}
                                    value={lastname}
                                    placeholder="Фамилия"
                                />
                            </InputGroup>
                            <InputGroup.Text>Имя</InputGroup.Text>
                            <Form.Control
                                onChange={changeFirstnameHandler}
                                value={firstname}
                                placeholder="Имя"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Отчество</InputGroup.Text>
                            <Form.Control
                                onChange={changeMiddlenameHandler}
                                value={middlename}
                                placeholder="Отчество"
                            />
                        </InputGroup>
                        <Button
                            className={classes.btn}
                            type="submit"
                            variant="primary"
                        >
                            Далее
                        </Button>
                    </Form>
                </Tab>
                <Tab
                    eventKey="second"
                    title="Данные входа"
                    disabled={!(tabsNames.indexOf('second') <= tabsNames.indexOf(currentPage))}
                >
                    <Form
                        onSubmit={nextTab}
                        className={classes.form}
                    >
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Почта</InputGroup.Text>
                            <Form.Control
                                onChange={changeEmailHandler}
                                value={email}
                                placeholder="Почта"
                            />
                        </InputGroup>
                        <div className={classes.relativeInput}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Пароль</InputGroup.Text>
                                <Form.Control
                                    onChange={changePasswordHandler}
                                    value={password}
                                    placeholder="Пароль"
                                    type={isPasswordVisible ? 'text' : 'password'}
                                />
                            </InputGroup>
                            <Button
                                className={classes.hideButton}
                                variant="clear"
                                onClick={() => setIsPasswordVisible((prev) => !prev)}
                            >
                                {isPasswordVisible
                                    ? (
                                        <Icon className={classes.icon} Svg={VisibleEyeIcon} />
                                    )
                                    : (
                                        <Icon className={classes.icon} Svg={HiddenEyeIcon} />
                                    )}
                            </Button>
                        </div>
                        <Button
                            className={classes.btn}
                            type="submit"
                            variant="primary"
                        >
                            Далее
                        </Button>
                    </Form>
                </Tab>
                <Tab
                    eventKey="third"
                    title="ЛК"
                    disabled={!(tabsNames.indexOf('third') <= tabsNames.indexOf(currentPage))}
                >
                    <Form
                        className={classes.form}
                        onSubmit={submitRegistration}
                        encType="multipart/form-data"
                    >
                        {!isRegisterLoading && registerError && (
                            <Alert variant="danger">{registerError}</Alert>
                        )}
                        {!isRegisterLoading && registerResult && (
                            <Alert variant="success">{registerResult}</Alert>
                        )}
                        {!isRegisterLoading
                            && !registerError
                            && !registerResult && (
                            <InputGroup className="mb-3">
                                <InputGroup.Text>@</InputGroup.Text>
                                <Form.Control
                                    onChange={changeUsernameHandler}
                                    value={username}
                                    placeholder="Имя пользователя"
                                />
                            </InputGroup>
                        )}
                        <Form.Group controlId="formFile" className="mb-3">
                            {!isRegisterLoading
                                && !registerError
                                && !registerResult && (
                                <>
                                    <Form.Label>Ваше фото</Form.Label>
                                    <Form.Control
                                        name="file"
                                        type="file"
                                    />
                                </>
                            )}
                            {isRegisterLoading && (
                                <ProgressBar
                                    className={classes.bar}
                                    animated
                                    label={`${currentlyFileUploaded / totalFileSize * 100}%`}
                                    now={currentlyFileUploaded / totalFileSize * 100}
                                />
                            )}
                            {!isRegisterLoading && registerError && (
                                <ProgressBar
                                    className={classes.bar}
                                    variant="danger"
                                    label="Ошибка!"
                                    now={100}
                                />
                            )}
                        </Form.Group>

                        {isRegisterLoading
                            ? (
                                <Button
                                    className={classes.btn}
                                    variant="primary"
                                    disabled
                                >
                                    <Spinner
                                        className={classes.spinner}
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                    />
                                    Регистрация...
                                </Button>
                            )
                            : registerResult
                                ? (
                                    <Button
                                        className={classes.btn}
                                        variant="success"
                                        onClick={onRegisterSuccessful}
                                    >
                                        Войти
                                    </Button>
                                )
                                : (
                                    <Button
                                        className={classes.btn}
                                        type="submit"
                                        variant="primary"
                                    >
                                        Регистрация
                                    </Button>
                                )}
                    </Form>
                </Tab>
            </Tabs>
        </DynamicModuleLoader>
    );
});
