import { classNames } from 'shared/lib/classNames/classNames';
import {
    FormEvent, memo, useCallback, useState,
} from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { HStack, VStack } from 'shared/UI/Stack';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { registerCustomer } from 'pages/RegisterPage/model/services/registerCustomer';
import classes from './CustomerForm.module.scss';

interface CustomerFormProps {
    className?: string;
}

export const CustomerForm = memo((props: CustomerFormProps) => {
    const {
        className,
    } = props;

    const dispatch = useAppDispatch();

    const [validated, setValidated] = useState(false);

    const createForm = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const result = await dispatch(registerCustomer(formData));

        if (result.meta.requestStatus === 'fulfilled') {
            // @ts-ignore
            if (result?.payload?.message?.includes('являются дубликатами')) {
                // @ts-ignore
                setHasDuplicates(result?.payload?.message);
            }
        }
    }, [dispatch]);
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity()) {
            createForm(event);
        }

        setValidated(true);
    };

    return (
        <Form
            as="form"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            encType="multipart/form-data"
        >
            <Form.Label as="h1">Регистрация покупателя</Form.Label>
            <VStack
                className={classNames(classes.CustomerForm, {}, [className])}
                max
            >
                <Form.Group>
                    <Form.Control
                        name="lastname"
                        id="lastname"
                        required
                        type="text"
                        placeholder="Фамилия"
                    />
                    <Form.Control.Feedback>Отличный выбор!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Пожалуйста, укажите Вашу фамилию
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        name="firstname"
                        id="firstname"
                        required
                        type="text"
                        placeholder="Имя"
                    />
                    <Form.Control.Feedback>Отличный выбор!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Пожалуйста, укажите Ваше имя
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        name="middlename"
                        id="middlename"
                        required
                        type="text"
                        placeholder="Отчество"
                    />
                    <Form.Control.Feedback>Отличный выбор!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Пожалуйста, укажите Вашe отчество
                    </Form.Control.Feedback>
                </Form.Group>
            </VStack>

            <VStack
                className={classNames(classes.CustomerForm, {}, [className])}
                max
            >
                <Form.Group>
                    <Form.Control
                        name="email"
                        id="email"
                        required
                        type="text"
                        placeholder="Почта"
                    />
                    <Form.Control.Feedback>Отличный выбор!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Пожалуйста, введите почту
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        name="username"
                        id="username"
                        required
                        type="text"
                        placeholder="username"
                    />
                    <Form.Control.Feedback>Отличный выбор!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Пожалуйста, придумайте имя пользователя
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        name="password"
                        id="password"
                        required
                        type="password"
                        placeholder="Пароль"
                    />
                    <Form.Control.Feedback>Отличный выбор!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Пожалуйста, придумайте пароль
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Загрузите аватар</Form.Label>
                    <Form.Control
                        name="avatar"
                        id="avatar"
                        type="file"
                    />
                </Form.Group>
            </VStack>

            <Button
                className={classes.btn}
                type="submit"
            >
                Регистрация
            </Button>
        </Form>
    );
});
