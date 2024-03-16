import getAllAccountSlice from './slices/getAllAccountSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { coursesApi } from './services/course.services';
import { authApi } from './services/auth.services';
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    persistStore,
} from 'redux-persist';
import sessionStorage from 'redux-persist/es/storage/session';
import { wishlistApi } from './services/wishlist.services';
import courseSlice from './slices/courseSlice';
import { sectionApi } from './services/section.services';
import { stepApi } from './services/step.services';
import getCourseAllSlice from './slices/getCourseAllSlice';
import { categoryApi } from './services/categoryService';
import { quizApi } from './services/quiz.services';
import quizSlice from './slices/quizSlice';
import { questionApi } from './services/question.services';
import { accountApi } from './services/account.services';
import { notificationApi } from './services/notification.services';
import { registrationCourseApi } from './services/registrationCourse.services';
import registrationCourseSlice from './slices/registrationCourseSlice';
import { orderApi } from './services/order.services';
import orderSlice from './slices/orderSlice';
import learningCourseSlice from './slices/learningCourseSlice';
import { ratingCourseApi } from './services/ratingCourse.services';

export const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    whitelist: [
        'auth',
        'user',
        'course',
        'quiz',
        'order',
        'accountAll',
        'courseAll',
        'learningCourse',
    ],
};

const rootReducer = combineReducers({
    auth: authSlice,
    user: userSlice,
    course: courseSlice,
    quiz: quizSlice,
    order: orderSlice,
    learningCourse: learningCourseSlice,
    [coursesApi.reducerPath]: coursesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    [sectionApi.reducerPath]: sectionApi.reducer,
    [stepApi.reducerPath]: stepApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [quizApi.reducerPath]: quizApi.reducer,
    [questionApi.reducerPath]: questionApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    courseAll: getCourseAllSlice,
    [accountApi.reducerPath]: accountApi.reducer,
    accountAll: getAllAccountSlice,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [registrationCourseApi.reducerPath]: registrationCourseApi.reducer,
    registrationCourse: registrationCourseSlice,
    [ratingCourseApi.reducerPath]: ratingCourseApi.reducer,
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
            .concat(coursesApi.middleware)
            .concat(wishlistApi.middleware)
            .concat(sectionApi.middleware)
            .concat(stepApi.middleware)
            .concat(categoryApi.middleware)
            .concat(quizApi.middleware)
            .concat(questionApi.middleware)
            .concat(accountApi.middleware)
            .concat(notificationApi.middleware)
            .concat(registrationCourseApi.middleware)
            .concat(orderApi.middleware)
            .concat(ratingCourseApi.middleware),
});

// get roostate and appdispatch from store handle for typescript
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
//
//setupListeners(store.dispatch);
