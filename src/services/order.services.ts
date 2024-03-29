import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    AddOrderToDBReSpone,
    GetOrderByTransactionIdRespone,
    GetOrderWithFilterRequest,
    GetOrderWithFilterRespone,
    OrderRequest,
} from '../types/Order.type';

export const orderApi = createApi({
    reducerPath: 'orderApi',
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

        GetOrderByTransactionId: build.query<GetOrderByTransactionIdRespone, string>({
            query: (para: string) => ({
                url: 'api/Order/GetOrderByTransactionId?transactionId=' + para,
                method: 'get',
            }),
            transformResponse: (response) => {
                const data = (response as any).dataObject;
                return {
                    ...data,
                };
            },
        }),
        totalIncome: build.query<number, void>({
            query: () => ({
                url: 'api/Order/TotalIncome',
                method: 'get',
            }),
            transformResponse: (response) => {
                const data = (response as any).dataObject;
                return data;
            },
        }),
        totalOrder: build.query<number, void>({
            query: () => ({
                url: 'api/Order/TotalOrders',
                method: 'get',
            }),
            transformResponse: (response) => {
                const data = (response as any).dataObject;
                return data;
            },
        }),
        getOrderWithFilter: build.query<GetOrderWithFilterRespone[], GetOrderWithFilterRequest>({
            query: (para: GetOrderWithFilterRequest) => ({
                url: `api/Order/GetOrderWithFilter?AccountId=${para.AccountId}${para.pageNumber ? '&PageNumber=' + para.pageNumber : ''}${para.pageSize ? '&PageSize=' + para.pageSize : ''}${para.Status ? '&Status=' + para.Status : ''}`,
                method: 'get',
            }),
        }),
    }),
});

export const {
    useAddOrderToDBMutation,
    useGetClientIdQuery,
    useTotalIncomeQuery,
    useTotalOrderQuery,
    useGetOrderByTransactionIdQuery,
    useGetOrderWithFilterQuery,
} = orderApi;
