import { StateSchema } from 'app/providers/StoreProvider';

export const getAchievementData = (state: StateSchema) => state.achievement?.data;
export const getAchievementError = (state: StateSchema) => state.achievement?.error;
export const getAchievementIsLoading = (state: StateSchema) => state.achievement?.isLoading;
