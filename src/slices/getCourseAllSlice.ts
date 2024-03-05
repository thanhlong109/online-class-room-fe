import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Course } from '../types/Course.type';

export interface courseAll {
    currentCourse: Course[] | null; // Change currentCourse to allow null or Course[]
    isFetching: boolean;
    error: boolean;
}

const initialState: courseAll = {
    currentCourse: null, // Change to null
    isFetching: false,
    error: false,
};

const courseAllSlice = createSlice({
    name: 'courseAll',
    initialState,
    reducers: {
        courseAllStart: (state) => {
            state.isFetching = true;
        },
        courseAllSuccess: (state, action: PayloadAction<Course[]>) => {
            // Accept Course[]
            state.isFetching = false;
            state.currentCourse = action.payload;
            state.error = false;
        },
        courseAllFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const { courseAllStart, courseAllSuccess, courseAllFailure } = courseAllSlice.actions;

export default courseAllSlice.reducer;
