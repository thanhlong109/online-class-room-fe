import { useEffect, useState } from 'react';
import { LoginRequest, useLoginUserMutation } from '../../services/auth.services';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AuthState, setUser } from '../../slices/authSlice';
import { useAppDispatch } from '../../hooks/appHook';

const initFromData: LoginRequest = {
    accountEmail: '',
    accountPassword: '',
};

const TestApiPage = () => {
    const useDispach = useAppDispatch();
    const [formData, setFormData] = useState(initFromData);
    const [loginUser, { data: loginData, isLoading: isLoginLoading, isSuccess: isLoginSuccess }] =
        useLoginUserMutation();
    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await loginUser(formData);
    };
    useEffect(() => {
        console.log(loginData);
        if (isLoginSuccess) {
            const userData: AuthState = {
                accessToken: loginData.jwtToken,
                refreshToken: loginData.jwtRefreshToken,
            };
            console.warn(userData);
            useDispach(setUser(userData));
        }
    }, [isLoginSuccess]);
    return (
        <>
            <div>
                <form
                    onSubmit={handleOnSubmit}
                    className="m-auto flex max-w-[500px] flex-col gap-4"
                >
                    <TextField
                        label="email"
                        onChange={(e) => {
                            setFormData({ ...formData, accountEmail: e.target.value });
                        }}
                    />
                    <TextField
                        label="password"
                        onChange={(e) => {
                            setFormData({ ...formData, accountPassword: e.target.value });
                        }}
                    />
                    <LoadingButton type="submit" loading={isLoginLoading} variant="contained">
                        Login
                    </LoadingButton>
                </form>
            </div>
        </>
    );
};

export default TestApiPage;
