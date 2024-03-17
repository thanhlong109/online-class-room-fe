import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddOrderToDBReSpone, GetOrderWithFilterRespone } from '../types/Order.type';
import { Course } from '../types/Course.type';

export interface OrderState {
    preOrderData: {
        addOrderRespone: AddOrderToDBReSpone;
        CourseData: Course;
    };
    createOrderId: string;
    OrderDone: {
        orderId: string;
    };
    orderHistory: GetOrderWithFilterRespone[];
}

const initialState: OrderState = {
    preOrderData: {
        addOrderRespone: {
            accountId: '',
            accountName: '',
            courseId: 0,
            orderId: 0,
            paymentDate: '',
            status: '',
            totalPrice: 0,
        },
        CourseData: {
            courseCategories: [],
            courseId: 0,
            courseIsActive: false,
            createAt: '',
            description: '',
            imageUrl: '',
            isPublic: false,
            knowdledgeDescription: '',
            linkCertificateAccounts: [],
            linkCertificated: '',
            orders: [],
            price: 0,
            publicAt: '',
            registrationCourses: [],
            salesCampaign: 0,
            sections: [],
            title: '',
            totalDuration: 0,
            updateAt: '',
            videoPreviewUrl: '',
            wishLists: [],
        },
    },
    OrderDone: {
        orderId: '',
    },
    createOrderId: '',
    orderHistory: [],
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setPreOrderData: (
            state,
            action: PayloadAction<{ addOrderRespone: AddOrderToDBReSpone; CourseData: Course }>,
        ) => {
            state.preOrderData = action.payload;
        },
        setOrderId: (state, action: PayloadAction<string>) => {
            state.OrderDone.orderId = action.payload;
        },
        setCreateOrderId: (state, action: PayloadAction<string>) => {
            state.createOrderId = action.payload;
        },
        setOrdersHistory: (state, action: PayloadAction<GetOrderWithFilterRespone[]>) => {
            state.orderHistory = action.payload;
        },
    },
});

export const { setPreOrderData, setOrderId, setCreateOrderId, setOrdersHistory } =
    orderSlice.actions;

export default orderSlice.reducer;
