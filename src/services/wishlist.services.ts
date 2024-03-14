import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
        addWishlistByAccountID: build.mutation<void, WishListMutation>({
            query: (body: WishListMutation) => {
                return {
                    url: `api/WishList/AddWishList?courseId=${body.courseId}&accountId=${body.accountId}`,
                    method: 'post',
                };
            },
        }),
        removeWishlistByAccountID: build.mutation<void, WishListMutation>({
            query: (body: WishListMutation) => {
                return {
                    url: `api/WishList/DeleteWishListByCourseId?courseId=${body.courseId}&accountId=${body.accountId}`,
                    method: 'delete',
                };
            },
        }),
        getWishlistByAccountID: build.query<WishListRequest[], string | null>({
            query: (id: string | null) => {
                return {
                    url: `api/WishList/GetWishListByAccountId?accountId=${id}`,
                    method: 'get',
                };
            },
        }),
        countWishListByAccountID: build.query<number, string>({
            query: (id: string) => {
                return {
                    url: `api/WishList/CountTotalWishListByAccountId?accountId=${id}`,
                    method: 'get',
                };
            },
            transformResponse: (response) => {
                return (response as any).dataObject;
            },
        }),
    }),
});

export const {
    useAddWishlistByAccountIDMutation,
    useGetWishlistByAccountIDQuery,
    useRemoveWishlistByAccountIDMutation,
    useCountWishListByAccountIDQuery,
} = wishlistApi;
