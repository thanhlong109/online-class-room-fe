import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    CheckRegistrationCourseRequest,
    CheckRegistrationCourseRespone,
} from '../types/RegistrationCourse.type';

export const registrationCoursesApi = createApi({
    reducerPath: 'registrationCoursesApi',
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
    endpoints: (build) => ({
        checkRegistrationCourse: build.query<
            CheckRegistrationCourseRespone,
            CheckRegistrationCourseRequest
        >({
            query: (para: CheckRegistrationCourseRequest) => ({
                url: `api/RegistrationCourse/CheckRegistration?accountId=${para.accountId}&courseId=${para.courseId}`,
                method: 'get',
            }),
        }),
    }),
});

export const { useCheckRegistrationCourseQuery } = registrationCoursesApi;
