import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import classes from './Task.module.scss';

interface TaskProps {
    className?: string;
}

export const Task = memo((props: TaskProps) => {
    const { className } = props;

    return (
        <div className={classNames(classes.Task, {}, [className])} />
    );
});
