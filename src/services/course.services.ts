import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Course } from '../types/Course.type';

export const coursesApi = createApi({
    reducerPath: 'coursesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://estudyhub.azurewebsites.net/' }),
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
        getAllCourses: build.query<Course[], number>({
            query: (number: number) =>
                `api/Course/SelectCourselistPagination?page=${number}&limit=10`,
        }),
    }),
});

export const {
    useGetCoursesBaseStudentJoinedQuery,
    useGetCourseIDQuery,
    useGetCoursesBaseRatingQuery,
    useGetCoursesBaseSalesQuery,
    useGetAllCoursesQuery,
} = coursesApi;
