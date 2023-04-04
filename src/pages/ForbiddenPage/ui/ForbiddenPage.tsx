import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo, useEffect } from 'react';
import { VStack } from 'shared/UI/Stack';
import classes from './ForbiddenPage.module.scss';

interface ForbiddenPageProps {
    className?: string;
}

const ForbiddenPage = memo((props: ForbiddenPageProps) => {
    const {
        className,
    } = props;

    useEffect(() => {
        document.title = '403 | Нет прав';
    }, []);

    return (
        <Page className={classNames(classes.ForbiddenPage, {}, [className])}>
            <VStack className={classes.text} max justify="center" align="center">
                У Вас нет прав на этот город и эту планету
            </VStack>
        </Page>
    );
});

export default ForbiddenPage;
