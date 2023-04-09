import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import classes from './AdminTasks.module.scss';

interface AdminTasksProps {
    className?: string;
}

export const AdminTasks = memo((props: AdminTasksProps) => {
    const {
        className,
    } = props;

    return (
        <div className={classNames(classes.AdminTasks, {}, [className])} />
    );
});
