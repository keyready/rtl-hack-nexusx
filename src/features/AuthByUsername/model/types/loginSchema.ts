// тут описываются используемые в фиче/сущности типы

export interface LoginSchema {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    middlename: string
    email: string
    isLoading: boolean;
    error?: string;
}
