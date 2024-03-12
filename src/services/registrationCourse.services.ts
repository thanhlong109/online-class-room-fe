import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RegistrationCourse } from '../types/RegistrationCourse.type';

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
    }),
});

export const { useGetRegisterCourseByAccountIdQuery } = registrationCourseApi;
