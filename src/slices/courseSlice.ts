import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Course } from '../types/Course.type';
import { RootState } from '../store';

interface courseState {
    courseDetails: Course | null;
}

const initialState: courseState = {
    courseDetails: null,
};

export const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        setCourseDetails: (state, action: PayloadAction<Course>) => {
            state.courseDetails = action.payload;
        },
    },
});

export const selectCourse = (state: RootState) => state.course;

export const { setCourseDetails } = courseSlice.actions;

export default courseSlice.reducer;
