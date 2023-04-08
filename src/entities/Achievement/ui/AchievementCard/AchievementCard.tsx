import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { getCustomerData } from 'entities/Customer';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { HStack, VStack } from 'shared/UI/Stack';
import { Text } from 'shared/UI/Text';
import CompletedIcon from 'shared/assets/icons/completed.svg';
import { Icon } from 'shared/UI/Icon/Icon';
import classes from './AchievementCard.module.scss';
import { Achievement } from '../../model/types/AchievementSchema';

interface AchievementProps {
    className?: string;
    achievement?: Achievement;
}

export const AchievementCard = memo((props: AchievementProps) => {
    const { className, achievement } = props;

    const customer = useSelector(getCustomerData);

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
