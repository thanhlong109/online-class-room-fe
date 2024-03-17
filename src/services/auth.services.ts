import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserInfo } from '../slices/userSlice';

export interface LoginRequest {
    accountEmail: string;
    accountPassword: string;
}
export interface UserInfoRequest {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    birthDate: string;
    biography: string;
    profileImg: string;
    sex: string;
    deviceToken: string;
    parentEmail: string;
}

export interface ChangePasswordRequest {
    email: string;
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export interface RegisterUserRequest {
    accountPhone: string;
    firstName: string;
    lastName: string;
    accountEmail: string;
    birthDate: string;
    accountPassword: string;
    confirmAccountPassword: string;
    parentEmail: string;
}

export interface RegisterAdminRequest {
    accountPhone: string;
    firstName: string;
    lastName: string;
    accountEmail: string;
    birthDate: string;
    accountPassword: string;
    confirmAccountPassword: string;
}

export interface LoginResponse {
    jwtToken: string;
    expired: string;
    jwtRefreshToken: string;
}

export const authApi = createApi({
    reducerPath: 'authApi',
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
        loginUser: build.mutation<LoginResponse, LoginRequest>({
            query: (body: LoginRequest) => ({
                url: 'api/account/signin',
                method: 'post',
                body,
            }),
            transformResponse: (response: LoginResponse) => {
                const { jwtToken, expired, jwtRefreshToken } = response;
                return {
                    jwtToken,
                    expired,
                    jwtRefreshToken,
                };
            },
        }),
        getUserInfo: build.query<UserInfoRequest, string>({
            query: (email: string) => {
                return {
                    url: `api/account/${email}`,
                    method: 'get',
                };
            },
        }),
        updateUserInfo: build.mutation<UserInfo, UserInfo>({
            query: ({ id, ...data }: UserInfo) => ({
                url: `api/Account/UpdateProfile?accountId=${id}`,
                method: 'put',
                body: {
                    ...data,
                    id,
                },
            }),
            transformResponse: (response) => {
                const data = (response as any).dataObject;
                return {
                    ...data[0],
                };
            },
        }),
        updatePassword: build.mutation<ChangePasswordRequest, ChangePasswordRequest>({
            query: (body: ChangePasswordRequest) => {
                return {
                    url: 'api/Account/ChangePassword',
                    method: 'post',
                    body,
                };
            },
        }),
        registerUser: build.mutation<RegisterUserRequest, RegisterUserRequest>({
            query: (body: RegisterUserRequest) => {
                return {
                    url: 'api/account/signup',
                    method: 'post',
                    body,
                };
            },
        }),
        registerAdmin: build.mutation<
            RegisterAdminRequest,
            { formData: RegisterAdminRequest; role: number }
        >({
            query: ({ formData, role }) => {
                return {
                    url: `api/Account/SignUpStaffAdmin?role=${role}`,
                    method: 'post',
                    body: formData,
                };
            },
        }),
    }),
});

export const {
    useLoginUserMutation,
    useGetUserInfoQuery,
    useUpdateUserInfoMutation,
    useUpdatePasswordMutation,
    useRegisterUserMutation,
    useRegisterAdminMutation,
    endpoints,
} = authApi;
