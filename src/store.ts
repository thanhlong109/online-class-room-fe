import { configureStore } from '@reduxjs/toolkit';
import { coursesApi } from './services/course.services';

//gennerate store
export const store = configureStore({
    reducer: { [coursesApi.reducerPath]: coursesApi.reducer },
    middleware: (defaultMidleWare) => defaultMidleWare().concat(coursesApi.middleware),
});

// get roostate and appdispatch from store handle for typescript
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
