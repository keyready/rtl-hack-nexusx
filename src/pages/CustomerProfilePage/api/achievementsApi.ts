import { rtkApi } from 'shared/api/rtkApi';
import { Achievement } from 'entities/Achievement';

const achievementsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getAchievementsList: build.query<Achievement[], number>({
            query: () => ({
                url: '/achievements',
            }),
        }),
    }),
});

export const useAchievements = achievementsApi.useGetAchievementsListQuery;
