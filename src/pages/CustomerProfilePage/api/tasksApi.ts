import { rtkApi } from 'shared/api/rtkApi';
import { Task } from 'entities/Task';

const tasksApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getTasksList: build.query<Task[], number>({
            query: () => ({
                url: '/tasks',
            }),
        }),
    }),
});

export const useTasks = tasksApi.useGetTasksListQuery;
