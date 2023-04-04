import { ReactNode, useCallback } from 'react';
import { Modal as BModal } from 'react-bootstrap';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Modal.module.scss';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    show?: boolean;
    setShow?: (value: boolean) => void;
    header?: string;
    headerCloser?: boolean;
    footer?: ReactNode;
}

export const Modal = (props: ModalProps) => {
    const {
        children,
        className,
        setShow,
        show,
        header,
        headerCloser,
        footer,
    } = props;

    const handleClose = useCallback(() => {
        setShow?.(false);
    }, [setShow]);

    return (
        <BModal
            className={classNames(classes.Modal, {}, [className])}
            show={show}
            onHide={handleClose}
        >
            {header && (
                <BModal.Header closeButton={headerCloser}>
                    <BModal.Title>{header}</BModal.Title>
                </BModal.Header>
            )}

            <BModal.Body>{children}</BModal.Body>

            {footer && (
                <BModal.Footer>
                    {footer}
                </BModal.Footer>
            )}
        </BModal>
    );
};
