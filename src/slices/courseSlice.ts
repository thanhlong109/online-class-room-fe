import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AddCourseRequest } from '../types/Course.type';

interface courseState {
    wishList: number[];
    addCourse: {
        data: AddCourseRequest;
        currentStep: number;
    };
}

const initialState: courseState = {
    wishList: [],
    addCourse: {
        data: {
            categoryList: [],
            courseIsActive: false,
            description: '',
            imageUrl: '',
            isPublic: false,
            knowdledgeDescription: '',
            linkCertificated: '',
            price: 0,
            salesCampaign: 0,
            title: '',
            totalDuration: 0,
            videoPreviewUrl: '',
        },
        currentStep: 0,
    },
};

export const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        addWishList: (state, action: PayloadAction<number>) => {
            state.wishList = [...state.wishList, action.payload];
        },
        removeWishlist: (state, action: PayloadAction<number>) => {
            const courseIndex = state.wishList.findIndex((courseId) => courseId === action.payload);
            if (courseIndex != -1) {
                state.wishList.splice(courseIndex, 1);
            }
        },
        setWishList: (state, action: PayloadAction<number[]>) => {
            state.wishList = action.payload;
        },
        setAddCourse: (
            state,
            action: PayloadAction<{
                data: AddCourseRequest;
                currentStep: number;
            }>,
        ) => {
            state.addCourse = action.payload;
        },
    },
});

export const selectCourse = (state: RootState) => state.course;

export const { addWishList, removeWishlist, setWishList, setAddCourse } = courseSlice.actions;

export default courseSlice.reducer;
