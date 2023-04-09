import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Form } from 'react-bootstrap';
import classes from './VendorForm.module.scss';

interface VendorFormProps {
    className?: string;
}

export const VendorForm = memo((props: VendorFormProps) => {
    const {
        className,
    } = props;

    return (
        <Form className={classNames(classes.VendorForm, {}, [className])}>
            //
        </Form>
    );
});
