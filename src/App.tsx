import './App.css';
import { Route, Routes } from 'react-router-dom';
import { adminRoutes, privateRoutes, publicRoutes } from './routes';
import { fetchToken, getMessagingToken, onMessageListener } from './firebase/firebase';
import { useState, useEffect } from 'react';
import { message } from 'antd';
import { useUpdateDeviceTokenMutation } from './services/notification.services';
import { useSelector } from 'react-redux';
import { RootState } from './store';

function App() {
    const [show] = useState(false);
    const [notification] = useState({ title: '', body: '' });
    const [isDeviceTokenFound, setDeviceTokenFound] = useState(false);

    const [makeIsReadNoti, { isSuccess }] = useUpdateDeviceTokenMutation();

    useEffect(() => {
        const handleMessage = async () => {
            try {
                const payload: any = await onMessageListener();
                message.info(payload.notification.body);
            } catch (err) {
                console.log('failed: ', err);
            }
        };

        handleMessage();
    }, []); // Chạy một lần khi component được render lần đầu tiên

    // console.log(show, notification);

    const accountId = useSelector((state: RootState) => (state.user.id ? state.user.id : ''));
    const [updateDeviceToken, { isSuccess: successUpdate }] = useUpdateDeviceTokenMutation();

    useEffect(() => {
        if (successUpdate) {
            console.log('hihiii ');
        }
    }, [successUpdate]);

    useEffect(() => {
        const deviceToken = localStorage.getItem('deviceToken');

        if (deviceToken) {
            updateDeviceToken({ accountId: accountId, deviceToken });
        }
        getMessagingToken(setDeviceTokenFound);
    }, [accountId]);

    return (
        <>
            <Routes>
                {publicRoutes.map(({ layout, component, path }, index) => {
                    const Layout = layout;
                    const Component = component;
                    return (
                        <Route
                            key={index}
                            path={path}
                            element={<Layout childen={<Component />} />}
                        />
                    );
                })}

                {privateRoutes.map(({ layout, component, path }, index) => {
                    const Layout = layout;
                    const Component = component;
                    return (
                        <Route
                            key={index}
                            path={path}
                            element={<Layout childen={<Component />} />}
                        />
                    );
                })}

                {adminRoutes.map(({ layout, component, path }, index) => {
                    const Layout = layout;
                    const Component = component;
                    return (
                        <Route
                            key={index}
                            path={path}
                            element={<Layout childen={<Component />} />}
                        />
                    );
                })}
            </Routes>
        </>
    );
}

export default App;
