import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CustomerReducer, fetchCustomer, getCustomerData } from 'entities/Customer';
import { AchievementReducer } from 'entities/Achievement';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { Tab, Tabs } from 'react-bootstrap';
import { ContentWrapper } from 'shared/UI/ContentWrapper';
import { Avatar } from 'shared/UI/Avatar/Avatar';
import { HStack } from 'shared/UI/Stack';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Text, TextSize } from 'shared/UI/Text';
import { Icon } from 'shared/UI/Icon/Icon';
import VerifiedIcon from 'shared/assets/icons/verified.svg';
import { AchievementsList } from '../AchievementsList/AchievementsList';
import classes from './CustomerProfilePage.module.scss';

interface CustomerProfilePageProps {
    className?: string;
}

const reducers: ReducersList = {
    achievement: AchievementReducer,
    customer: CustomerReducer,
};

type avatarLvl = 'lvl1' | 'lvl2' | 'lvl3' | 'lvl4'

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

    const avatarLvlMapper: Record<avatarLvl, string> = {
        lvl1: classes.lvl1,
        lvl2: classes.lvl2,
        lvl3: classes.lvl3,
        lvl4: classes.lvl4,
    };

    const lvlClasses = [];
    if (customer?.level) {
        lvlClasses.push(avatarLvlMapper[customer.level]);
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames(classes.CustomerProfilePage, {}, [className])}>
                <HStack
                    justify="start"
                    className={classes.banner}
                    max
                >
                    {customer?.level === 'lvl4' && (
                        <Icon
                            className={classes.verified}
                            Svg={VerifiedIcon}
                        />
                    )}
                    <Avatar
                        className={
                            classNames(classes.avatar, {}, lvlClasses)
                        }
                        src="https://i.pravatar.cc/300"
                        size={150}
                        rounded={50}
                    />

                    <Text
                        size={TextSize.L}
                        title={customer?.lastname}
                        text={`${customer?.firstname} ${customer?.middlename}`}
                    />

                    <Text
                        size={TextSize.L}
                        title="Баланс"
                        text={`${customer?.balance}`}
                    />

                    <Text
                        size={TextSize.L}
                        title="Опыт"
                        text={`${customer?.experience}`}
                    />
                </HStack>

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
                            <h3>Задачи</h3>
                        </Tab>
                        <Tab
                            eventKey="marketplace"
                            title="Маркетплейс"
                        >
                            <h1 className={classes.title}>Маркетплейс</h1>
                            <h3>Маркетплейс</h3>
                        </Tab>
                    </Tabs>
                </ContentWrapper>
            </Page>
        </DynamicModuleLoader>
    );
});

export default CustomerProfilePage;
