import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store.ts';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import Lottie from 'lottie-react';
import preloaderData from './assets/AnimationPreloader.json';
import { AuthProvider } from './context/AuthContext.tsx';

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate
                loading={
                    <div className="flex min-h-screen w-full items-center justify-center">
                        <Lottie animationData={preloaderData} className="max-w-[300px]" />
                    </div>
                }
                persistor={persistor}
            >
                <AuthProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </AuthProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
);
