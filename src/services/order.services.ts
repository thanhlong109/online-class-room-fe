import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AddOrderToDBReSpone, OrderRequest } from '../types/Order.type';

export const orderApi = createApi({
    reducerPath: 'orderApi',
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
        addOrderToDB: build.mutation<AddOrderToDBReSpone, OrderRequest>({
            query: (body: OrderRequest) => ({
                url: 'api/Order/AddOrderToCartWaitingPAYMENT',
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
        getClientId: build.query<string, void>({
            query: () => ({
                url: 'api/Order/GetClientId',
                method: 'get',
            }),
        }),
    }),
});

export const { useAddOrderToDBMutation, useGetClientIdQuery } = orderApi;
