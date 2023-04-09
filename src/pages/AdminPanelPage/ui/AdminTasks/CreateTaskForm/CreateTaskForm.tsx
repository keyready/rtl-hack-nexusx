import { classNames } from 'shared/lib/classNames/classNames';
import { FormEvent, memo } from 'react';
import { Button, Form } from 'react-bootstrap';
import classes from './CreateTaskForm.module.scss';

interface CreateTaskFormProps {
    className?: string;
    onClick?: (e: FormEvent<HTMLFormElement>) => void;
}

export const CreateTaskForm = memo((props: CreateTaskFormProps) => {
    const {
        className,
        onClick,
    } = props;

    return (
        <Form
            encType="multipart/form-data"
            onSubmit={onClick}
            className={classNames(classes.CreateAchievementForm, {}, [className])}
        >
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                    name="title"
                    placeholder="Название"
                    type="text"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                    name="coinsCost"
                    placeholder="Стоимость (койны)"
                    type="number"
                    min={0}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    name="image"
                    type="file"
                />
            </Form.Group>
            <Button
                variant="primary"
                type="submit"
            >
                Добавить
            </Button>
        </Form>
    );
});
