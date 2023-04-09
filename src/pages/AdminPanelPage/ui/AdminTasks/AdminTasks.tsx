import { classNames } from 'shared/lib/classNames/classNames';
import {
    FormEvent, memo, useCallback, useState,
} from 'react';
import { Button, Modal } from 'react-bootstrap';
import { HStack, VStack } from 'shared/UI/Stack';
import { ContentWrapper } from 'shared/UI/ContentWrapper';
import { useTasks } from 'pages/CustomerProfilePage';
import { TaskCard, deleteTask, createTask } from 'entities/Task';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { CreateTaskForm } from './CreateTaskForm';
import classes from './AdminTasks.module.scss';

interface AdminTasksProps {
    className?: string;
}

export const AdminTasks = memo((props: AdminTasksProps) => {
    const {
        className,
    } = props;

    const { data: tasks } = useTasks(1);

    const [show, setShow] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const showHandler = useCallback(() => {
        setShow(true);
    }, []);

    const deleteTaskHandler = useCallback((id: number) => {
        dispatch(deleteTask(id));
    }, [dispatch]);
    const createTaskHandler = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const result = await dispatch(createTask(formData));
        setShow(false);
    }, [dispatch]);

    return (
        <VStack>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить задание</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateTaskForm onClick={createTaskHandler} />
                </Modal.Body>
            </Modal>

            <HStack max>
                <Button
                    onClick={showHandler}
                    className={classes.btn}
                >
                    Добавить товар
                </Button>
            </HStack>
            <ContentWrapper
                className={classNames(classes.AdminAchievements, {}, [className])}
            >
                <VStack max justify="start" gap="16">
                    {tasks && tasks.map((task) => (
                        <div
                            className={classes.card}
                            key={task.id}
                        >
                            <TaskCard
                                task={task}
                            />
                            <Button
                                className={classes.deleteBtn}
                                variant="danger"
                                onClick={() => deleteTaskHandler(task.id || 0)}
                            >
                                Удалить
                            </Button>
                        </div>
                    ))}
                </VStack>
            </ContentWrapper>
        </VStack>
    );
});
