import { memo } from 'react';
import { Loader } from 'shared/UI/Loader';
import { AchievementCard } from 'entities/Achievement';
import { VStack } from 'shared/UI/Stack';
import { Customer } from 'entities/Customer';
import { useAchievements } from '../../api/achievementsApi';

interface AchievementsListProps {
    className?: string;
    customer?: Customer;
}

export const AchievementsList = memo((props: AchievementsListProps) => {
    const {
        className,
        customer,
    } = props;

    const { isLoading, data: achievements } = useAchievements(1);

    return (
        <VStack max gap="8" justify="start" align="center">
            {isLoading && (<Loader />)}
            {achievements && achievements.map((achievement) => (
                <AchievementCard achievement={achievement} />
            ))}
        </VStack>
    );
});
