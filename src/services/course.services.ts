import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const coursesApi = createApi({
    reducerPath: 'coursesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
    endpoints: (build) => ({
        getCourses: build.query<Course, void>({
            query: () => 'courses',
        }),
    }),
});

export const { useGetCoursesQuery } = coursesApi;
