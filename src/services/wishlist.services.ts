import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const user = localStorage.getItem('user');

let accessToken: string | null = null;
if (user) {
    const userData = JSON.parse(user);
    accessToken = userData ? userData.accessToken : null;
}

const apiHeader = {
    Authorization: 'Bearer ' + accessToken,
};

export interface WishListMutation {
    courseId: number;
    accountId: string;
}

export interface WishListRequest {
    wishListId: number;
    courseId: number;
    accountId: string;
}

export const wishlistApi = createApi({
    reducerPath: 'wishlistApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://estudyhub.azurewebsites.net/' }),
    endpoints: (build) => ({
        addWishlistByAccountID: build.mutation<void, WishListMutation>({
            query: (body: WishListMutation) => {
                return {
                    url: `api/WishList/AddWishList?courseId=${body.courseId}&accountId=${body.accountId}`,
                    method: 'post',
                    headers: apiHeader,
                };
            },
        }),
        removeWishlistByAccountID: build.mutation<void, WishListMutation>({
            query: (body: WishListMutation) => {
                return {
                    url: `api/WishList/DeleteWishListByCourseId?courseId=${body.courseId}&accountId=${body.accountId}`,
                    method: 'delete',
                    headers: apiHeader,
                };
            },
        }),
        getWishlistByAccountID: build.query<WishListRequest[], string | null>({
            query: (id: string | null) => {
                return {
                    url: `api/WishList/GetWishListByAccountId?accountId=${id}`,
                    method: 'get',
                    headers: apiHeader,
                };
            },
        }),
    }),
});

export const {
    useAddWishlistByAccountIDMutation,
    useGetWishlistByAccountIDQuery,
    useRemoveWishlistByAccountIDMutation,
} = wishlistApi;
