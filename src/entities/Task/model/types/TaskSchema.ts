export interface Task {
    id?: number;
    title?: string;
    description?: string;
    image?: string;

    // награда за выполнение
    expCost?: number; // сколько опыта дадут
    coinsCost?: number; // сколько койнов дадут
}

export interface TaskSchema {
    data?: Task;
    isLoading: boolean;
    error?: string;
}
