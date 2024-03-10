import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AddQuizRequest, QuizRespone, updateQuizRequest } from '../types/Quiz.type';

export const quizApi = createApi({
    reducerPath: 'quizApi',
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
        addQuiz: build.mutation<QuizRespone, AddQuizRequest>({
            query: (para: AddQuizRequest) => ({
                url: `api/Quiz/AddQuiz?Title=${para.title}&Description=${para.description}`,
                method: 'post',
            }),
            transformResponse: (response) => {
                const data = (response as any).dataObject;
                return {
                    ...data,
                };
            },
        }),
        updateQuiz: build.mutation<QuizRespone, updateQuizRequest>({
            query: (body: updateQuizRequest) => ({
                url: 'api/Quiz/UpdateQuiz',
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
        deleteQuiz: build.mutation<void, number>({
            query: (para: number) => ({
                url: `api/Quiz/DeleteQuiz?quizId=${para}`,
                method: 'delete',
            }),
        }),
        getQuizDetail: build.query<QuizRespone, number>({
            query: (para: number) => ({
                url: `api/Quiz/GetQuizDetail/${para}`,
                method: 'get',
            }),
        }),
    }),
});

export const {
    useAddQuizMutation,
    useUpdateQuizMutation,
    useDeleteQuizMutation,
    useGetQuizDetailQuery,
} = quizApi;
