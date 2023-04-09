import { classNames } from 'shared/lib/classNames/classNames';
import {
    FormEvent, memo, useCallback, useState,
} from 'react';
import { ContentWrapper } from 'shared/UI/ContentWrapper';
import { useAchievements } from 'pages/CustomerProfilePage/api/achievementsApi';
import { HStack, VStack } from 'shared/UI/Stack';
import { Button, Modal } from 'react-bootstrap';
import {
    AchievementCard,
    createAchievement, deleteAchievement,
} from 'entities/Achievement';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Loader } from 'shared/UI/Loader';
import {
    CreateAchievementForm,
} from './CreateAchievementForm';
import classes from './AdminAchievements.module.scss';

interface AdminAchievementsProps {
    className?: string;
}

export const AdminAchievements = memo((props: AdminAchievementsProps) => {
    const {
        className,
    } = props;

    const { data: achievements, isLoading } = useAchievements(1);
    const dispatch = useAppDispatch();

    const [show, setShow] = useState(false);

    const createAchievementHandler = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const result = await dispatch(createAchievement(formData));
        setShow(false);
    }, [dispatch]);

    const deleteAchievementHandler = useCallback(async (id: number) => {
        const result = await dispatch(deleteAchievement(id));
    }, [dispatch]);

    const showHandler = useCallback(() => {
        setShow(true);
    }, []);

    if (isLoading) {
        return (
            <Loader />
        );
    }

    return (
        <VStack>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить достижение</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateAchievementForm onClick={createAchievementHandler} />
                </Modal.Body>
            </Modal>

            <HStack max>
                <Button
                    onClick={showHandler}
                    className={classes.btn}
                >
                    Добавить достижение
                </Button>
            </HStack>
            <ContentWrapper
                className={classNames(classes.AdminAchievements, {}, [className])}
            >
                <VStack max justify="start" gap="16">
                    {achievements && achievements.map((achievement) => (
                        <div
                            className={classes.card}
                            key={achievement.id}
                        >
                            <AchievementCard
                                achievement={achievement}
                            />
                            <Button
                                className={classes.deleteBtn}
                                variant="danger"
                                onClick={() => deleteAchievementHandler(achievement.id || 0)}
                            >
                                Удалить
                            </Button>
                        </div>
                    ))}
                </VStack>
            </ContentWrapper>
        </VStack>

    );
});
