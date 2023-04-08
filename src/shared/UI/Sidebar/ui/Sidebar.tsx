import { classNames } from 'shared/lib/classNames/classNames';
import { memo, ReactNode } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { OffcanvasPlacement } from 'react-bootstrap/Offcanvas';
import classes from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
    children?: ReactNode;
    show?: boolean;
    setShow?: (show: boolean) => void;
    direction?: OffcanvasPlacement;
}

export const Sidebar = memo((props: SidebarProps) => {
    const {
        className,
        setShow,
        show,
        children,
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
            <Offcanvas.Header
                className={classes.header}
            >
                <img src="/static/images/ret-logo.svg" />
            </Offcanvas.Header>

            <Offcanvas.Body>
                {children}
            </Offcanvas.Body>
        </Offcanvas>
    );
});
