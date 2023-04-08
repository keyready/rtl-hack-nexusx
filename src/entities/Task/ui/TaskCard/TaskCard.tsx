import { classNames } from 'shared/lib/classNames/classNames';
import {
    memo, useCallback, useEffect, useState,
} from 'react';
import { HStack, VStack } from 'shared/UI/Stack';
import { Avatar } from 'shared/UI/Avatar/Avatar';
import { Text, TextAlign } from 'shared/UI/Text';
import { Badge, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getCustomerData } from 'entities/Customer';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { abortTask } from '../../model/services/abortTask';
import { startTask } from '../../model/services/startTask';
import { Task } from '../../model/types/TaskSchema';
import classes from './TaskCard.module.scss';

interface TaskProps {
    className?: string;
    task?: Task
}

export const TaskCard = memo((props: TaskProps) => {
    const { className, task } = props;

    const dispatch = useAppDispatch();

    const customer = useSelector(getCustomerData);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);

    const isActiveTask = customer?.activeTask === task?.id;

    useEffect(() => {
        if (customer?.solvedTasks) {
            setIsCompleted(
                customer?.solvedTasks.includes(task?.id || 0),
            );
        }
    }, [customer?.solvedTasks, task?.id]);

    const startTaskHandler = useCallback(() => {
        dispatch(startTask({ customerId: customer?.id, taskId: task?.id }));
    }, [customer?.id, dispatch, task?.id]);
    const abortTaskHandler = useCallback(() => {
        dispatch(abortTask({ customerId: customer?.id, taskId: task?.id }));
    }, [customer?.id, dispatch, task?.id]);

    return (
        <VStack
            className={classNames(classes.TaskCard, {
                [classes.disabled]: (
                    isCompleted
                    || !!(customer?.activeTask && !isActiveTask)
                ),
            }, [className])}
            max
            justify="start"
            align="center"
        >
            {isActiveTask && (
                <h3 className={classes.activeTask}>
                    <Badge bg="success">Активно!</Badge>
                </h3>
            )}
            {isCompleted && (
                <h3 className={classes.activeTask}>
                    <Badge bg="warning">Выполнено!</Badge>
                </h3>
            )}
            <Text align={TextAlign.CENTER} title={task?.title} />
            <HStack
                gap="32"
                max
                justify="between"
            >
                <Avatar src={task?.image} rounded={25} width={225} height={170} />
                <VStack
                    max
                    gap="16"
                    justify="between"
                    align="start"
                >
                    <Text text={task?.description} />
                    {isActiveTask && (
                        <Button
                            className={classes.btn}
                            variant="outline-danger"
                            onClick={abortTaskHandler}
                        >
                            Отменить
                        </Button>
                    )}
                    {!isActiveTask && !isCompleted && (
                        <Button
                            className={classes.btn}
                            variant="primary"
                            disabled={isActiveTask || !!(customer?.activeTask && !isActiveTask)}
                            onClick={startTaskHandler}
                        >
                            Начать
                        </Button>
                    )}
                </VStack>
            </HStack>
        </VStack>
    );
});
