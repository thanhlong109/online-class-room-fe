import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Notification } from '../types/Notification.type';
import { PagingParam } from '../types/TableParam';

type NotificationQueryParams = PagingParam & { accountId: string };

export const notificationApi = createApi({
    reducerPath: 'notificationApi',
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
        getAllNotifications: build.query<Notification[], NotificationQueryParams>({
            query: ({ pageNumber, pageSize, accountId }) =>
                `/api/Notification/GetAllNotificationsByAccountId?PageNumber=${pageNumber}&PageSize=${pageSize}&accountId=${accountId}`,
        }),
        getNumberOfUnreadNotifications: build.query<number, string>({
            query: (accountId: string) =>
                `/api/Notification/GetNumbersOfUnReadNotification?&accountId=${accountId}`,
            transformResponse: (response) => {
                return (response as any).dataObject as number;
            },
        }),
        makeNotificationIsRead: build.mutation<void, number>({
            query: (id: number) => ({
                url: `/api/Notification/MarkNotificationIsReadByNotiId?notificationId=${id}`,
                method: 'GET',
            }),
        }),
    }),
});

// Usage hook remains the same
export const {
    useGetAllNotificationsQuery,
    useGetNumberOfUnreadNotificationsQuery,
    useMakeNotificationIsReadMutation,
} = notificationApi;
