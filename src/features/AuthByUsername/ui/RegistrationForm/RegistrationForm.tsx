/**
 * Товарищи, выходим на прогулку строиться, ПОЖАЛУЙСТА
 * (с) Федя Заволокин, 20:28, 04.04.2023
 */

import {
    ChangeEvent, FormEvent, memo, useCallback, useState,
} from 'react';
import {
    Button, ButtonGroup, Form, InputGroup, ProgressBar, Tab, Tabs,
} from 'react-bootstrap';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import {
    ReducersList,
    DynamicModuleLoader,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { registerUser } from '../../model/services/registerUser/registerUser';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { loginActions, loginReducer } from '../../model/slices/loginSlice';
import classes from './RegistrationForm.module.scss';
import {
    getLoginEmail,
    getLoginFirstname,
    getLoginLastname,
    getLoginMiddlename,
} from '../../model/selectors/getPersonalInfo/getPersonalInfo';
import {
    getLoginUsername,
} from '../../model/selectors/getLoginUsername/getLoginUsername';

interface RegistrationFormProps {
    className?: string;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

export const RegistrationForm = memo((props: RegistrationFormProps) => {
    const {
        className,
    } = props;

    const dispatch = useAppDispatch();
    const lastname = useSelector(getLoginLastname);
    const firstname = useSelector(getLoginFirstname);
    const middlename = useSelector(getLoginMiddlename);
    const email = useSelector(getLoginEmail);
    const password = useSelector(getLoginPassword);
    const username = useSelector(getLoginUsername);

    const [currentPage, setCurrentPage] = useState<string>('first');
    const [isPhotoLoading, setIsPhotoLoading] = useState<boolean>(false);

    const nextTab = useCallback(() => {
        const nextIndex = ['first', 'second', 'third'].indexOf(currentPage || '') + 1;
        if (nextIndex < 3) {
            setCurrentPage(['first', 'second', 'third'][nextIndex]);
        }
    }, [currentPage]);

    const prevTab = useCallback(() => {
        const nextIndex = ['first', 'second', 'third'].indexOf(currentPage || '') - 1;
        if (nextIndex < 3) {
            setCurrentPage(['first', 'second', 'third'][nextIndex]);
        }
    }, [currentPage]);

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
        const formData = new FormData(e.currentTarget);

        formData.append('lastname', lastname);
        formData.append('firstname', firstname);
        formData.append('middlename', middlename);
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);

        dispatch(registerUser(formData));
    }, [dispatch, email, firstname, lastname, middlename, password, username]);

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <Tabs
                activeKey={currentPage}
                onSelect={(k) => setCurrentPage(k || '')}
                variant="pills"
            >
                <Tab eventKey="first" title="ФИО" disabled>
                    <Form className={classes.form}>
                        <InputGroup className="mb-3">
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Фамилия</InputGroup.Text>
                                <Form.Control
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
                        <Button onClick={nextTab} variant="outline-success">Далее</Button>
                    </Form>
                </Tab>
                <Tab eventKey="second" title="Данные входа" disabled>
                    <Form className={classes.form}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Почта</InputGroup.Text>
                            <Form.Control
                                onChange={changeEmailHandler}
                                value={email}
                                placeholder="Почта"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Пароль</InputGroup.Text>
                            <Form.Control
                                onChange={changePasswordHandler}
                                value={password}
                                placeholder="Пароль"
                                type="password"
                            />
                        </InputGroup>
                        <ButtonGroup>
                            <Button onClick={prevTab} variant="outline-danger">Назад</Button>
                            <Button onClick={nextTab} variant="outline-success">Далее</Button>
                        </ButtonGroup>
                    </Form>
                </Tab>
                <Tab eventKey="third" title="ЛК" disabled>
                    <Form
                        className={classes.form}
                        onSubmit={submitRegistration}
                        encType="multipart/form-data"
                    >
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Юзернейм</InputGroup.Text>
                            <Form.Control
                                onChange={changeUsernameHandler}
                                value={username}
                                placeholder="Имя пользователя"
                            />
                        </InputGroup>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Ваше фото</Form.Label>
                            <Form.Control type="file" />
                            {isPhotoLoading && (
                                <ProgressBar animated now={45} />
                            )}
                        </Form.Group>

                        <ButtonGroup>
                            <Button onClick={prevTab} variant="outline-danger">Назад</Button>
                            <Button type="submit">Submit</Button>
                        </ButtonGroup>
                    </Form>
                </Tab>
            </Tabs>
        </DynamicModuleLoader>
    );
});
