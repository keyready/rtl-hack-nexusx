import { classNames } from 'shared/lib/classNames/classNames';
import { FormEvent, memo } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import classes from './CreateProduct.module.scss';

interface CreateProductProps {
    className?: string;
    onClick?: (e: FormEvent<HTMLFormElement>) => void;
}

export const CreateProduct = memo((props: CreateProductProps) => {
    const {
        className,
        onClick,
    } = props;

    return (
        <Form
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
                    name="description"
                    placeholder="Описание"
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
