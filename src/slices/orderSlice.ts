import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AddOrderToDBReSpone } from '../types/Order.type';
import { Course } from '../types/Course.type';

export interface OrderState {
    preOrderData: {
        addOrderRespone: AddOrderToDBReSpone;
        CourseData: Course;
    };
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
};

export const orderSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setPreOrderData: (
            state,
            action: PayloadAction<{ addOrderRespone: AddOrderToDBReSpone; CourseData: Course }>,
        ) => {
            state.preOrderData = action.payload;
        },
    },
});

export const { setPreOrderData } = orderSlice.actions;

export default orderSlice.reducer;
