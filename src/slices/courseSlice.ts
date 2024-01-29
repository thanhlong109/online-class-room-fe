import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface courseState {
    wishList: number[];
}

const initialState: courseState = {
    wishList: [],
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
    },
});

export const selectCourse = (state: RootState) => state.course;

export const { addWishList, removeWishlist, setWishList } = courseSlice.actions;

export default courseSlice.reducer;
