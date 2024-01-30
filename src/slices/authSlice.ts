import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface AuthToken {
    accessToken: string | null;
    refreshToken: string | null;
    email: string | null;
    isLogin: boolean;
}

const initialState: AuthToken = {
    accessToken: null,
    refreshToken: null,
    email: null,
    isLogin: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<AuthToken>) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.email = action.payload.email;
            state.isLogin = action.payload.isLogin;
            localStorage.setItem(
                'user',
                JSON.stringify({
                    accessToken: action.payload.accessToken,
                    refreshToken: action.payload.refreshToken,
                    email: action.payload.email,
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
            }
        },
    },
});

export const selectAuth = (state: RootState) => state.auth;

export const { setUser, logoutUser, loadUser } = authSlice.actions;

export default authSlice.reducer;
