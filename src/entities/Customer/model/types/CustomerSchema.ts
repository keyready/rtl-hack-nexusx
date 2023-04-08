export interface Customer {
    id?: number;
    firstname?: string;
    lastname?: string;
    middlename?: string;
    username?: number;
    email?: string;
    avatar?: string;
    solvedTasks?: number[]; // решенные таски
    activeTask?: number; // текущий таск для выполнения
    achievements?: number[]; // полученные достижения
    activeBadge?: number; // активный бейдж для отображения
    isVip?: boolean; // есть випка?
    experience?: number; // количество очков опыта (допустим, каждый уровень - 1000 очков)
    level?: 'lvl1' | 'lvl2' | 'lvl3' | 'lvl4'; // уровень аккаунта
    balance?: number; // баланс (в местной валюте)
}

export interface CustomerSchema {
    data?: Customer;
    isLoading: boolean;
    error?: string;
}
