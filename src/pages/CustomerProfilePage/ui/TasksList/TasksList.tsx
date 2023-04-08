import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Alert } from 'react-bootstrap';
import { Loader } from 'shared/UI/Loader';
import { TaskCard } from 'entities/Task';
import { useTasks } from '../../api/tasksApi';
import classes from './TasksList.module.scss';

interface TasksListProps {
    className?: string;
}

export const TasksList = memo((props: TasksListProps) => {
    const {
        className,
    } = props;

    const { data: tasks, isLoading, isError } = useTasks(1, {
        pollingInterval: 3000,
    });

    if (isError) {
        return (
            <Alert variant="danger">Произошла ошибка при загрузке тасков</Alert>
        );
    }

    return (
        <div className={classNames(classes.TasksList, {}, [className])}>
            {isLoading && (<Loader />)}
            {tasks && tasks.map((task) => (
                <TaskCard task={task} />
            ))}
        </div>
    );
});
