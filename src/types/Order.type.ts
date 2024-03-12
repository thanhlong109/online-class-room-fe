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
