import { configureStore } from '@reduxjs/toolkit';
import { coursesApi } from './services/course.services';
import { authApi } from './services/auth.services';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';

//gennerate store
export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        user: userSlice.reducer,
        [coursesApi.reducerPath]: coursesApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (defaultMidleWare) => defaultMidleWare().concat(authApi.middleware),
});

// get roostate and appdispatch from store handle for typescript
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

//
setupListeners(store.dispatch);
