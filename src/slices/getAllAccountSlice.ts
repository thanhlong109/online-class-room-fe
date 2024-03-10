import { GetAllAccount } from './../types/Account.type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface accountAll {
    // currentCourse: Course[] | null; // Change currentCourse to allow null or Course[]
    currentCourse: GetAllAccount;
    isFetching: boolean;
    error: boolean;
}

const initialState: accountAll = {
    // currentCourse: null, // Change to null
    currentCourse: {} as GetAllAccount,
    isFetching: false,
    error: false,
};

const accountAllSlice = createSlice({
    name: 'accountAll',
    initialState,
    reducers: {
        accountAllStart: (state) => {
            state.isFetching = true;
        },
        accountAllSuccess: (state, action: PayloadAction<GetAllAccount>) => {
            // Accept Course[]
            state.isFetching = false;
            state.currentCourse = action.payload;
            state.error = false;
        },
        accountAllFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const { accountAllStart, accountAllSuccess, accountAllFailure } = accountAllSlice.actions;

export default accountAllSlice.reducer;
