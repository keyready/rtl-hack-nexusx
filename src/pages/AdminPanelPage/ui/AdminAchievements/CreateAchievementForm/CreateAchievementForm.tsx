import { classNames } from 'shared/lib/classNames/classNames';
import { FormEvent, memo } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import classes from './CreateAchievementForm.module.scss';

interface CreateAchievementFormProps {
    className?: string;
    onClick?: (e: FormEvent<HTMLFormElement>) => void
}

export const CreateAchievementForm = memo((props: CreateAchievementFormProps) => {
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
                    name="description"
                    placeholder="Описание"
                    type="text"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <InputGroup>
                    <Form.Control
                        name="expCost"
                        placeholder="Награда (опыт)"
                        type="number"
                        min={0}
                    />
                    <Form.Control
                        name="coinsCost"
                        placeholder="Награда (койны)"
                        type="number"
                        min={0}
                    />
                </InputGroup>
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
