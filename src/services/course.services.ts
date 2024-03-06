import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Course, GetAllCourse } from '../types/Course.type';
import { PagingParam } from '../types/TableParam';

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
        getAllCourses: build.query<GetAllCourse, PagingParam>({
            query: (input: PagingParam) =>
                `api/Course/SelectCourselistPagination?pageNumber=${input.pageNumber}&pageSize=${input.pageSize}&minPrice=${input.minPrice}`,
        }),
        deleteCourse: build.query<Course, number>({
            query: (id) => `api/Course/DeleteCourse?courseId=${id}`,
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
