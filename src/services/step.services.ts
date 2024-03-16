import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AddStepRequest, Step, UpdateStepRequest } from '../types/Course.type';

export const stepApi = createApi({
    reducerPath: 'stepApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://estudyhub.azurewebsites.net/',
        prepareHeaders: (headers, _) => {
            // Thêm logic để lấy accessToken từ localStorage và đặt vào header Authorization
            const user = localStorage.getItem('user');
            if (user) {
                const userData = JSON.parse(user);
                const accessToken = userData ? userData.accessToken : null;
                headers.set('Authorization', `Bearer ${accessToken}`);
            }
            return headers;
        },
    }),
    refetchOnMountOrArgChange: true,
    endpoints: (build) => ({
        addStep: build.mutation<Step, AddStepRequest>({
            query: (body: AddStepRequest) => ({
                url: 'api/Step/AddStep',
                body,
                method: 'post',
            }),
            transformResponse: (response) => {
                const data = (response as any).dataObject;
                return {
                    ...data,
                };
            },
        }),
        updateStep: build.mutation<Step, UpdateStepRequest>({
            query: (body: UpdateStepRequest) => ({
                url: 'api/Step/UpdateStep',
                body,
                method: 'put',
            }),
            transformResponse: (response) => {
                const data = (response as any).dataObject;
                return {
                    ...data,
                };
            },
        }),
        deleteStep: build.mutation<void, number>({
            query: (id: number) => ({
                url: `api/Step/DeleteStep?stepId=${id}`,
                method: 'delete',
            }),
        }),
    }),
});

export const { useAddStepMutation, useUpdateStepMutation, useDeleteStepMutation } = stepApi;
