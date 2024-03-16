import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AverageRating } from '../types/RatingCourse.type';

export const ratingCourseApi = createApi({
    reducerPath: 'ratingCourseApi',
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
    refetchOnMountOrArgChange: true,
    endpoints: (build) => ({
        getRatingCourse: build.query<AverageRating, number>({
            query: (courseId: number) => `api/RatingCourse/ViewCourseRating/${courseId}`,
            transformResponse: (response: {
                averageRating: { averageRating: number; ratingCount: number };
            }) => ({
                averageRating: response.averageRating.averageRating,
                ratingCount: response.averageRating.ratingCount,
            }),
        }),
    }),
});

export const { useGetRatingCourseQuery } = ratingCourseApi;
