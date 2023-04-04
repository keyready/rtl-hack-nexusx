import { classNames } from 'shared/lib/classNames/classNames';
import { memo, ReactNode, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { OffcanvasPlacement } from 'react-bootstrap/Offcanvas';
import classes from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
    children?: ReactNode;
    show?: boolean;
    setShow?: (show: boolean) => void;
    header?: string;
    direction?: OffcanvasPlacement;
}

export const Sidebar = memo((props: SidebarProps) => {
    const {
        className,
        setShow,
        show,
        children,
        header,
        direction = 'start',
    } = props;

    const handleClose = () => setShow?.(false);

    return (
        <Offcanvas
            placement={direction}
            className={classNames(classes.Sidebar, {}, [className])}
            show={show}
            onHide={handleClose}
        >
            {header && (
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{header}</Offcanvas.Title>
                </Offcanvas.Header>
            )}
            <Offcanvas.Body>
                {children}
            </Offcanvas.Body>
        </Offcanvas>
    );
});
