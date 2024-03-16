import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AddCategoryRequest, CategoryRespone, UpdateCategoryRequest } from '../types/Course.type';

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
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
        addCategory: build.mutation<CategoryRespone, AddCategoryRequest>({
            query: (body: AddCategoryRequest) => ({
                url: 'api/Category/AddCategory',
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
        getCategory: build.query<CategoryRespone[], void>({
            query: () => ({
                url: 'api/Category/GetAllCategory',
                method: 'get',
            }),
        }),

        updateCategory: build.mutation<CategoryRespone, UpdateCategoryRequest>({
            query: (body: UpdateCategoryRequest) => ({
                url: 'api/Category/UpdateCategory',
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
        deleteCategory: build.mutation<void, number>({
            query: (id: number) => ({
                url: `api/Category/DeleteCategory?categoryId=${id}`,
                method: 'delete',
            }),
        }),
    }),
});

export const {
    useAddCategoryMutation,
    useGetCategoryQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoryApi;
