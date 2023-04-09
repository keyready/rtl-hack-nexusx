import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { getCustomerData } from 'entities/Customer';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { HStack, VStack } from 'shared/UI/Stack';
import { Text } from 'shared/UI/Text';
import CompletedIcon from 'shared/assets/icons/completed.svg';
import { Icon } from 'shared/UI/Icon/Icon';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import classes from './AchievementCard.module.scss';
import { Achievement } from '../../model/types/AchievementSchema';

interface AchievementProps {
    className?: string;
    achievement?: Achievement;
    isLoading?: boolean;
}

export const AchievementCard = memo((props: AchievementProps) => {
    const { className, achievement, isLoading } = props;

    const customer = useSelector(getCustomerData);

    if (isLoading) {
        return (
            <div
                className={classNames(classes.AchievementCard, {}, [className])}
            >
                <HStack justify="start" max gap="32">
                    <Skeleton className={classes.img} border="20%" />
                    <VStack justify="between" gap="16">
                        <Skeleton width={200} height={40} border="5px" />
                        <Skeleton width={300} height={20} border="5px" />
                    </VStack>
                    <VStack justify="center" align="center" gap="16">
                        <Skeleton width={200} height={40} border="5px" />
                        <HStack>
                            <Skeleton width={150} height={20} border="5px" />
                            <Skeleton width={150} height={20} border="5px" />
                        </HStack>
                    </VStack>
                    <VStack>
                        <Skeleton width={200} height={20} border="5px" />
                        <Skeleton width={200} height={20} border="5px" />
                    </VStack>
                </HStack>
            </div>
        );
    }

    if (!achievement?.id) {
        return (
            <Alert variant="danger">Чет сломалось...</Alert>
        );
    }

    const isCompleted: boolean = customer?.achievements
        ? customer?.achievements.includes(achievement?.id)
        : false;

    const mods: Mods = {
        [classes.isCompleted]: isCompleted,
    };

    return (
        <div
            className={classNames(classes.AchievementCard, mods, [className])}
        >
            {isCompleted && (
                <Icon Svg={CompletedIcon} className={classes.completedIcon} />
            )}
            <HStack justify="start">
                <img className={classes.img} src={achievement.image} alt={achievement.title} />
                <VStack justify="between">
                    <Text title={achievement.title} text={achievement.description} />
                </VStack>
            </HStack>

            <VStack align="center">
                <Text className={classes.costTitle} title="За выполнение" />
                <HStack max justify="between">
                    <Text
                        className={classes.costDetails}
                        title="Опыт"
                        text={achievement.expCost as unknown as string}
                    />
                    <Text
                        className={classes.costDetails}
                        title="RCoins"
                        text={achievement.coinsCost as unknown as string}
                    />
                </HStack>
            </VStack>

            <VStack justify="center" align="center">
                <Text
                    className={classes.stats}
                    title={`Это достижение есть у \n ${achievement.userRate}% пользователей`}
                />
            </VStack>
        </div>
    );
});
