import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface UserInfo {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    birthDate: string;
    biography: string;
    profileImg: string;
    sex: string;
    deviceToken?: string;
    parentEmail?: string;
}

const initialState: UserInfo = {
    id: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    birthDate: '',
    biography: '',
    profileImg: '',
    sex: '',
    deviceToken: '',
    parentEmail: '',
};

export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<UserInfo>) => {
            state.id = action.payload.id;
            state.biography = action.payload.biography;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.phoneNumber = action.payload.phoneNumber;
            state.profileImg = action.payload.profileImg;
            state.sex = action.payload.sex;
            state.birthDate = action.payload.birthDate;
            if (action.payload.deviceToken) state.deviceToken = action.payload.deviceToken;
            if (action.payload.parentEmail) state.parentEmail = action.payload.parentEmail;
        },
    },
});

export const selectUser = (state: RootState) => state.user;

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
