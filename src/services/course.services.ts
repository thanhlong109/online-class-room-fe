import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AddCourseRequest, Course, UpdateCourseRequest } from '../types/Course.type';

export const coursesApi = createApi({
    reducerPath: 'coursesApi',
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
        getCoursesBaseStudentJoined: build.query<Course[], number>({
            query: (number: number) =>
                `api/Course/TopFavoritesCourseBaseStudentJoined?numberOfCourses=${number}`,
        }),
        getCourseID: build.query<Course, string>({
            query: (id) => `api/Course/GetCourseDetailById?courseId=${id}`,
        }),
        getCoursesBaseRating: build.query<Course[], number>({
            query: (number: number) =>
                `api/Course/TopFavoritesCourseBaseRating?numberOfCourses=${number}`,
        }),
        getCoursesBaseSales: build.query<Course[], number>({
            query: (number: number) =>
                `api/Course/TopFavoritesCourseBaseSales?numberOfCourses=${number}`,
        }),
        addNewCourse: build.mutation<Course, AddCourseRequest>({
            query: (body: AddCourseRequest) => ({
                url: 'api/Course/AddCourse',
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
        updateCourse: build.mutation<Course, UpdateCourseRequest>({
            query: (body: UpdateCourseRequest) => ({
                url: 'api/Course/UpdateCourse',
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
    }),
});

export const {
    useGetCoursesBaseStudentJoinedQuery,
    useGetCourseIDQuery,
    useGetCoursesBaseRatingQuery,
    useGetCoursesBaseSalesQuery,
    useAddNewCourseMutation,
    useUpdateCourseMutation,
} = coursesApi;
