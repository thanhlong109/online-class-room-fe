import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface UserInfo {
    accountId: string | null;
    firstName: string | null;
    lastName: string | null;
    phoneNumber: string | null;
    birthDate: string | null;
    biography: string | null;
    profileImg: string | null;
    sex: string | null;
}

const initialState: UserInfo = {
    accountId: null,
    firstName: null,
    lastName: null,
    phoneNumber: null,
    birthDate: null,
    biography: null,
    profileImg: null,
    sex: null,
};

export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<UserInfo>) => {
            state.biography = action.payload.biography;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.phoneNumber = action.payload.phoneNumber;
            state.profileImg = action.payload.profileImg;
            state.sex = action.payload.sex;
            state.birthDate = action.payload.birthDate;
        },
    },
});

export const selectUser = (state: RootState) => state.user;

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
