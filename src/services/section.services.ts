import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Section, AddSectionReqest, UpdateSectionRequest } from '../types/Course.type';

export const sectionApi = createApi({
    reducerPath: 'sectionApi',
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
        addSection: build.mutation<Section, AddSectionReqest>({
            query: (body: AddSectionReqest) => ({
                url: 'api/Section/AddSection',
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
        updateSection: build.mutation<Section, UpdateSectionRequest>({
            query: (body: UpdateSectionRequest) => ({
                url: 'api/Section/UpdateSection',
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

export const { useAddSectionMutation, useUpdateSectionMutation } = sectionApi;
