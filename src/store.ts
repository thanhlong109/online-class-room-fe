import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { coursesApi } from './services/course.services';
import { authApi } from './services/auth.services';
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';
import courseSlice from './slices/courseSlice';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import sessionStorage from 'redux-persist/es/storage/session';

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    whitelist: ['auth', 'user', 'course'],
};

const rootReducer = combineReducers({
    auth: authSlice,
    user: userSlice,
    course: courseSlice,
    [coursesApi.reducerPath]: coursesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (defaultMiddleware) =>
        defaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
            .concat(authApi.middleware)
            .concat(coursesApi.middleware),
});

// get roostate and appdispatch from store handle for typescript
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

//
//setupListeners(store.dispatch);
