import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
    CheckRegistrationCourseRequest,
    CheckRegistrationCourseRespone,
    RegistrationCourse,
} from '../types/RegistrationCourse.type';
import {
    AddOrUpdateStepCompletedRespone,
    GetStepIdByRegistrationIdRespone,
} from '../types/StepCompleted.type';

export const registrationCourseApi = createApi({
    reducerPath: 'registrationCourseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://estudyhub.azurewebsites.net/',
        prepareHeaders: (headers) => {
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
    endpoints: (build) => ({
        getRegisterCourseByAccountId: build.query<RegistrationCourse[], string | null>({
            query: (accountId: string | null) =>
                `api/RegistrationCourse/GetRegisterCourseListByAccountId?accountId=${accountId}`,
            transformResponse: (response) => {
                const data = (response as any).dataObject;
                return [...data];
            },
        }),
        checkRegistrationCourse: build.query<
            CheckRegistrationCourseRespone,
            CheckRegistrationCourseRequest
        >({
            query: (para: CheckRegistrationCourseRequest) => ({
                url: `api/RegistrationCourse/CheckRegistration?accountId=${para.accountId}&courseId=${para.courseId}`,
                method: 'get',
            }),
            transformResponse: (response) => {
                const data = (response as any).dataObject;
                return {
                    ...data,
                };
            },
        }),
        getLastStepCompleted: build.query<GetStepIdByRegistrationIdRespone, number>({
            query: (para: number) => ({
                url: `api/StepCompleted/GetStepIdByRegistrationId?registrationId=${para}`,
                method: 'get',
            }),
            transformResponse: (response) => {
                const data = (response as any).dataObject;
                return {
                    ...data,
                };
            },
        }),
        updateLastStepCompleted: build.mutation<
            AddOrUpdateStepCompletedRespone,
            { registrationId: number; stepId: number }
        >({
            query: (para: { registrationId: number; stepId: number }) => ({
                url: `api/StepCompleted/AddOrUpdateStepCompleted?registrationId=${para.registrationId}&stepId=${para.stepId}`,
                method: 'post',
            }),
            transformResponse: (response) => {
                const data = (response as any).dataObject;
                return {
                    ...data,
                };
            },
        }),
    }),
});
export const {
    useGetRegisterCourseByAccountIdQuery,
    useCheckRegistrationCourseQuery,
    useGetLastStepCompletedQuery,
    useUpdateLastStepCompletedMutation,
} = registrationCourseApi;
