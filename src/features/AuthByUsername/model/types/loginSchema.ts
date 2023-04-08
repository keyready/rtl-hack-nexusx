// тут описываются используемые в фиче/сущности типы

export interface UserData {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    middlename: string;
    email: string;
}

interface UploadProgress {
    totalFileSize: number;
    currentlyUploaded: number;
}

export interface LoginSchema {
    userData: UserData;
    uploadProgress: UploadProgress;
    isLoading: boolean;
    error?: string;
}
