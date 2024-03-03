import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Section, SectionReqest } from '../types/Course.type';

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
        addSection: build.mutation<Section, SectionReqest>({
            query: (body: SectionReqest) => ({
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
    }),
});

export const { useAddSectionMutation } = sectionApi;
