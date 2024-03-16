import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { adminRoutes, privateRoutes, publicRoutes, parentRoutes } from './routes';
import { getMessagingToken, onMessageListener } from './firebase/firebase';
import { useState, useEffect } from 'react';
import { message } from 'antd';
import { useUpdateDeviceTokenMutation } from './services/notification.services';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { LocalUserData } from './types/Account.type';
import { DecodedToken } from './types/Auth.type';
import { jwtDecode } from 'jwt-decode';
import { RoleType, loadUser, setLoginRole } from './slices/authSlice';
import { useGetUserInfoQuery } from './services/auth.services';
import { setUserInfo } from './slices/userSlice';

function App() {
    const [show] = useState(false);
    const [notification] = useState({ title: '', body: '' });
    const [isDeviceTokenFound, setDeviceTokenFound] = useState(false);

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

    const user = localStorage.getItem('user');
    const role = useSelector((state: RootState) => state.auth.currentRole);
    const dispatch = useDispatch();
    const [userLocalData, setUserLocalData] = useState<LocalUserData | null>(null);
    const userEmailState = useSelector((state: RootState) => state.auth.email);
    const userEmailLocal = userLocalData ? userLocalData.email : '';
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (user) {
            const userData: LocalUserData = JSON.parse(user);
            const decodedToken: DecodedToken = jwtDecode(userData.accessToken);
            const roleLoaded: any =
                decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            if (typeof roleLoaded === 'string') {
                switch (roleLoaded) {
                    case RoleType.ADMIN: {
                        dispatch(setLoginRole(RoleType.ADMIN));
                        if (!location.pathname.includes('admin/')) {
                            navigate('/admin/');
                        }

                        break;
                    }
                    case RoleType.PARENT: {
                        dispatch(setLoginRole(RoleType.PARENT));
                        if (!location.pathname.includes('parent/')) {
                            navigate('/parent/');
                        }
                        break;
                    }
                    case RoleType.STAFF: {
                        dispatch(setLoginRole(RoleType.STAFF));
                        break;
                    }
                    case RoleType.STUDENT: {
                        dispatch(setLoginRole(RoleType.STUDENT));
                        break;
                    }
                    default: {
                        dispatch(setLoginRole(RoleType.GUESS));
                        break;
                    }
                }
            }
            setUserLocalData(userData);
        }
    }, [user]);

    const {
        data,
        isSuccess: isSuccessUserInfo,
        refetch,
    } = useGetUserInfoQuery(userEmailState ? userEmailState : userEmailLocal);
    useEffect(() => {
        if (isSuccessUserInfo && data) {
            dispatch(loadUser());
            dispatch(setUserInfo({ ...data }));
        }
    }, [isSuccessUserInfo]);

    useEffect(() => {
        refetch();
    }, [userLocalData]);

    return (
        <>
            <Routes>
                {(role === RoleType.GUESS || role === RoleType.STUDENT || role == RoleType.ADMIN) &&
                    publicRoutes.map(({ layout, component, path }, index) => {
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

                {role === RoleType.PARENT &&
                    parentRoutes.map(({ layout, component, path }, index) => {
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

                {(role === RoleType.GUESS || role === RoleType.STUDENT) &&
                    privateRoutes.map(({ layout, component, path }, index) => {
                        const Layout = layout;
                        const Component = component;
                        return (
                            <Route
                                key={index}
                                path={path}
                                element={
                                    <Layout
                                        requireRole={RoleType.STUDENT}
                                        whenRoleUnMatchNavTo="/login"
                                        childen={<Component />}
                                    />
                                }
                            />
                        );
                    })}

                {role === RoleType.ADMIN &&
                    adminRoutes.map(({ layout, component, path }, index) => {
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
