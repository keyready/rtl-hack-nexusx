import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    CustomerCard, CustomerReducer, fetchCustomer, getCustomerData,
} from 'entities/Customer';
import { AchievementReducer } from 'entities/Achievement';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { Tab, Tabs } from 'react-bootstrap';
import { ContentWrapper } from 'shared/UI/ContentWrapper';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Marketplace } from 'widgets/Marketplace';
import { TasksList } from '../TasksList/TasksList';
import { AchievementsList } from '../AchievementsList/AchievementsList';
import classes from './CustomerProfilePage.module.scss';

interface CustomerProfilePageProps {
    className?: string;
}

const reducers: ReducersList = {
    achievement: AchievementReducer,
    customer: CustomerReducer,
};

const CustomerProfilePage = memo((props: CustomerProfilePageProps) => {
    const {
        className,
    } = props;
    const { id } = useParams<{id: string }>();

    const dispatch = useAppDispatch();

    const customer = useSelector(getCustomerData);

    useEffect(() => {
        if (id) {
            dispatch(fetchCustomer(id as unknown as number));
        }
    }, [dispatch, id]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames(classes.CustomerProfilePage, {}, [className])}>
                <CustomerCard customer={customer} />

                <ContentWrapper>
                    <Tabs
                        className={classes.tabs}
                        defaultActiveKey="achievements"
                    >
                        <Tab
                            eventKey="achievements"
                            title="Достижения"
                        >
                            <h1 className={classes.title}>Достижения</h1>
                            <AchievementsList customer={customer} />
                        </Tab>
                        <Tab
                            eventKey="tasks"
                            title="Задачи"
                        >
                            <h1 className={classes.title}>Задачи</h1>
                            <TasksList />
                        </Tab>
                        <Tab
                            eventKey="marketplace"
                            title="Маркетплейс"
                        >
                            <h1 className={classes.title}>Маркетплейс</h1>
                            <Marketplace customer={customer} />
                        </Tab>
                        <Tab
                            eventKey="settings"
                            title="Настройки"
                        >
                            <h1 className={classes.title}>Настройки</h1>
                        </Tab>
                    </Tabs>
                </ContentWrapper>
            </Page>
        </DynamicModuleLoader>
    );
});

export default CustomerProfilePage;
