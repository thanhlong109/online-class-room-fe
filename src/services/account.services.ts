import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Account, GetAllAccount } from '../types/Account.type';
import { PagingParam } from '../types/TableParam';

export const accountApi = createApi({
    reducerPath: 'accountApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://estudyhub.azurewebsites.net/',
        prepareHeaders: (headers) => {
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
        getAllAccounts: build.query<GetAllAccount, PagingParam>({
            query: (input: PagingParam) =>
                `api/Account/ViewAccountList?pageNumber=${input.pageNumber}&pageSize=${input.pageSize}&search=${input.search}`,
        }),
        deleteAccount: build.mutation<Account, string>({
            query: (accountId: string) => ({
                url: `api/Account/${accountId}`,
                method: 'delete',
            }),
        }),
        countTotalAccounts: build.query<number, void>({
            query: () => 'api/Account/CountTotalAccount',
            transformResponse: (response) => {
                const data = (response as any).dataObject;
                return data;
            },
        }),
    }),
});

export const { useGetAllAccountsQuery, useDeleteAccountMutation, useCountTotalAccountsQuery } =
    accountApi;
