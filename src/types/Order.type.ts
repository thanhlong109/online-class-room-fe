export interface OrderRequest {
    accountId: string;
    courseId: number;
}

export interface AddOrderToDBReSpone {
    orderId: number;
    accountId: string;
    courseId: number;
    totalPrice: number;
    paymentDate: string;
    accountName: string;
    status: string;
}

export interface GetOrderByTransactionIdRespone {
    orderId: number;
    accountId: string;
    courseId: number;
    totalPrice: number;
    paymentMethod: string;
    transactionNo: string;
    paymentDate: string;
    currencyCode: string;
    accountName: string;
    status: string;
    account: any;
    course: any;
}
