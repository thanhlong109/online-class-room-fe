import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum RoleType {
    STUDENT = 'Student',
    ADMIN = 'Admin',
    STAFF = 'Staff',
    PARENT = 'Parent',
    GUESS = 'Guess',
}

export interface AuthToken {
    accessToken: string | null;
    refreshToken: string | null;
    email: string | null;
    isLogin: boolean;
    currentRole: RoleType;
    expired: string | null;
}

const initialState: AuthToken = {
    accessToken: null,
    refreshToken: null,
    email: null,
    isLogin: false,
    currentRole: RoleType.GUESS,
    expired: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (
            state,
            action: PayloadAction<{
                accessToken: string | null;
                refreshToken: string | null;
                email: string | null;
                expired: string | null;
                isLogin: boolean;
            }>,
        ) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.email = action.payload.email;
            state.isLogin = action.payload.isLogin;
            state.expired = action.payload.expired;
            localStorage.setItem(
                'user',
                JSON.stringify({
                    accessToken: action.payload.accessToken,
                    refreshToken: action.payload.refreshToken,
                    email: action.payload.email,
                    expired: action.payload.expired,
                }),
            );
        },
        logoutUser: (state) => {
            localStorage.clear();
            state.accessToken = null;
            state.email = null;
            state.refreshToken = null;
            state.isLogin = false;
        },
        loadUser: (state) => {
            const user = localStorage.getItem('user');
            if (user) {
                const userData = JSON.parse(user);
                state.isLogin = true;
                state.accessToken = userData ? userData.accessToken : null;
                state.email = userData ? userData.email : null;
                state.refreshToken = userData ? userData.refreshToken : null;
                state.expired = userData ? userData.expired : null;
            }
        },
        setLoginRole: (state, action: PayloadAction<RoleType>) => {
            state.currentRole = action.payload;
        },
    },
});

export const selectAuth = (state: RootState) => state.auth;

export const { setUser, logoutUser, loadUser, setLoginRole } = authSlice.actions;

export default authSlice.reducer;
