import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface LoginRequest {
    accountEmail: string;
    accountPassword: string;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://estudyhub.azurewebsites.net/' }),
    endpoints: (build) => ({
        loginUser: build.mutation({
            query: (body: LoginRequest) => {
                return {
                    url: 'api/account/signin',
                    method: 'post',
                    body,
                };
            },
        }),
    }),
});

export const { useLoginUserMutation } = authApi;
