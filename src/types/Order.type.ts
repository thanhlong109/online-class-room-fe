import { PagingParam } from './TableParam';

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

export interface GetOrderWithFilterRespone {
    orderId: number;
    accountId: string;
    courseId: number;
    totalPrice: number;
    paymentMethod: string;
    transactionNo: string;
    paymentDate: string;
    currencyCode: string;
    accountName: string;
    status: OrderStatus;
    account: any;
    course: any;
}

export enum OrderStatus {
    COMPLETED = 'Completed',
    FAILED = 'Failed',
    PENDING = 'Pending',
}

export type GetOrderWithFilterRequest = PagingParam & { AccountId: string; Status?: OrderStatus };
