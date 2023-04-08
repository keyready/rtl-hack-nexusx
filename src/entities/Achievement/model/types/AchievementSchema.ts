export interface Achievement {
    id?: number;
    title?: string;
    description?: string;
    image?: string;
    userRate?: number;

    // награда за выполнение
    expCost?: number; // сколько опыта дадут
    coinsCost?: number; // сколько койнов дадут
}

export interface AchievementSchema {
    data?: Achievement;
    isLoading?: boolean;
    error?: string;
}
