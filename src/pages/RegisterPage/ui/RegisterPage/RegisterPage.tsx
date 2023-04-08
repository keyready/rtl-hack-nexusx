import { classNames } from 'shared/lib/classNames/classNames';
import {
    memo, useCallback, useMemo, useState,
} from 'react';
import { Page } from 'widgets/Page/Page';
import { VStack } from 'shared/UI/Stack';
import { Button } from 'react-bootstrap';
import { CustomerForm } from 'pages/RegisterPage/ui/CustomerForm/CustomerForm';
import { VendorForm } from 'pages/RegisterPage/ui/VendorForm/VendorForm';
import classes from './RegisterPage.module.scss';

interface RegisterPageProps {
    className?: string;
}

const RegisterPage = memo((props: RegisterPageProps) => {
    const { className } = props;

    const [hasChoice, setHasChoice] = useState<string>('');

    const makeChoice = useCallback((type: string) => {
        setHasChoice(type);
    }, []);

    const choiceHandler = useMemo(() => (
        <>
            {!hasChoice && (
                <VStack max justify="center" align="center">
                    <Button
                        onClick={() => makeChoice('customer')}
                        size="lg"
                    >
                        Я - заказчик
                    </Button>
                    <Button
                        onClick={() => makeChoice('vendor')}
                        size="lg"
                    >
                        Я - поставщик
                    </Button>
                </VStack>
            )}
        </>
    ), [hasChoice, makeChoice]);

    return (
        <Page className={classNames(classes.RegisterPage, {}, [className])}>
            {choiceHandler}
            {hasChoice === 'customer' && (<CustomerForm />)}
            {hasChoice === 'vendor' && (<VendorForm />)}
        </Page>
    );
});

export default RegisterPage;
