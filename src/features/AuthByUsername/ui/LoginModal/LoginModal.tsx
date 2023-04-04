import { Suspense } from 'react';
import { Modal } from 'shared/UI/Modal';
import { Loader } from 'shared/UI/Loader';
import { LoginFormLazy } from '../LoginForm/LoginForm.lazy';

interface LoginModalProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export const LoginModal = (props: LoginModalProps) => {
    const {
        onClose,
        isOpen,
    } = props;

    return (
        <Modal
            setShow={onClose}
            show={isOpen}
            header="Авторизация"
        >
            <Suspense fallback={<Loader />}>
                <LoginFormLazy onSuccess={onClose} />
            </Suspense>
        </Modal>
    );
};
