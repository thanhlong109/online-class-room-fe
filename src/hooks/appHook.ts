import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { useEffect, useState } from 'react';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useLastLocationPath = () => {
    return location.pathname.split('/').pop();
};

export interface LocalUserData {
    accessToken: string;
    email: string;
    refreshToken: string;
}

export const useGetAccessTokenLocal = () => {
    const user = localStorage.getItem('user');
    const [localUserData, setLocalUserData] = useState<LocalUserData | null>(null);
    useEffect(() => {
        if (user) {
            const userData = JSON.parse(user);
            setLocalUserData(userData);
        }
    }, [user]);
    return localUserData;
};
