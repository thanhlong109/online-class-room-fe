import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RegistrationCourse } from '../types/RegistrationCourse.type';
import { RootState } from '../store';

export interface registrationCourse {
    currentRegistrationCourse: RegistrationCourse[];
    isFetching: boolean;
    error: boolean;
}

const initialState: registrationCourse = {
    currentRegistrationCourse: [],
    isFetching: false,
    error: false,
};

export const registrationCourseSLice = createSlice({
    name: 'registrationCourse',
    initialState,
    reducers: {
        setRegistrationCourse: (state, action: PayloadAction<RegistrationCourse[]>) => {
            state.currentRegistrationCourse = action.payload;
        },
        setFetching: (state, action) => {
            state.isFetching = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const selectRegistrationCourse = (state: RootState) => state.registrationCourse;

export const { setRegistrationCourse, setFetching, setError } = registrationCourseSLice.actions;
export default registrationCourseSLice.reducer;
