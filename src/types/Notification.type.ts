export interface Notification {
    notificationId: number,
    accountId: string,
    sendDate: Date,
    type: string,
    isRead: boolean,
    title: string,
    action: string,
    message: string,
    modelId: number
}

export interface GetNotification {
    notification: Notification[];
    currentPage: number;
    pageSize: number;
    totalAccounts: number;
    totalPages: number;
}