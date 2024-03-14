import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { adminRoutes, publicRoutes, privateRoutes } from './routes';
import { jwtDecode } from 'jwt-decode';
import { LocalUserData } from './types/Account.type';
import { DecodedToken } from './types/Auth.type';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserInfoQuery } from './services/auth.services';
import { RoleType, loadUser, setLoginRole } from './slices/authSlice';
import { setUserInfo } from './slices/userSlice';
import { RootState } from './store';

function App() {
    const user = localStorage.getItem('user');
    const role = useSelector((state: RootState) => state.auth.currentRole);
    const dispatch = useDispatch();
    const [userLocalData, setUserLocalData] = useState<LocalUserData | null>(null);
    const userEmailState = useSelector((state: RootState) => state.auth.email);
    const userEmailLocal = userLocalData ? userLocalData.email : '';
    const navigate = useNavigate();

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
                        navigate('/admin/');
                        break;
                    }
                    case RoleType.PARENT: {
                        dispatch(setLoginRole(RoleType.PARENT));
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

    const { data, isSuccess, refetch } = useGetUserInfoQuery(
        userEmailState ? userEmailState : userEmailLocal,
    );
    useEffect(() => {
        if (isSuccess && data) {
            dispatch(loadUser());
            dispatch(setUserInfo({ ...data }));
        }
    }, [isSuccess]);

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
