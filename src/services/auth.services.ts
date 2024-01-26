import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserInfo } from '../slices/userSlice';

export interface LoginRequest {
    accountEmail: string;
    accountPassword: string;
}
export interface UserInfoRequest {
    accountId: string | null;
    firstName: string | null;
    lastName: string | null;
    phoneNumber: string | null;
    birthDate: string | null;
    biography: null | string;
    profileImg: null | string;
    sex: null | string;
}

const user = localStorage.getItem('user');
let accessToken: string | null = null;
let email: string | null = null;
if (user) {
    const userData = JSON.parse(user);
    accessToken = userData ? userData.accessToken : null;
    email = userData ? userData.email : null;
}

const apiHeader = {
    Authorization: 'Bearer ' + accessToken,
};

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
        getUserInfo: build.query<UserInfoRequest, void>({
            query: () => {
                return {
                    url: `api/account/${email}`,
                    method: 'get',
                    headers: apiHeader,
                };
            },
        }),
        updateUserInfo: build.mutation<UserInfoRequest, UserInfo>({
            query: (userInfo: UserInfo) => {
                return {
                    url: 'api/account/change',
                    method: 'put',
                    headers: apiHeader,
                };
            },
        }),
    }),
});

export const { useLoginUserMutation, useGetUserInfoQuery, useUpdateUserInfoMutation } = authApi;
