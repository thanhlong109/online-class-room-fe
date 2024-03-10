import { Button, Input } from 'antd';
import MyCarouselLogin from './MyCarouselLogin';
import { EyeInvisibleOutlined, EyeTwoTone, GoogleOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../../hooks/appHook';
import { LoginRequest, useLoginUserMutation } from '../../../services/auth.services';
import { useEffect, useState } from 'react';
import { AuthToken, setUser } from '../../../slices/authSlice';
import { checkEmailValidaion, checkEmptyValidation } from '../../../utils/Validation';
import { Link, useNavigate } from 'react-router-dom';

const initFromData: LoginRequest = {
    accountEmail: '',
    accountPassword: '',
};

interface validationProps {
    isError: boolean;
    errorMessage: string;
}

const initialValidation: validationProps = {
    errorMessage: '',
    isError: false,
};

function LoginPage() {
    const useDispach = useAppDispatch();
    const [formData, setFormData] = useState(initFromData);
    const [emailValidation, setEmailValidation] = useState(initialValidation);
    const [passwordValidation, setPasswordValidation] = useState(initialValidation);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [
        loginUser,
        {
            data: loginData,
            isLoading: isLoginLoading,
            isSuccess: isLoginSuccess,
            isError: isLoginError,
        },
    ] = useLoginUserMutation();

    useEffect(() => {
        if (isLoginError) {
            setErrorMessage('Địa chỉ email hoặc mật khẩu không đúng!');
        }
    }, [isLoginError]);
    useEffect(() => {
        if (isLoginSuccess) {
            const userData: AuthToken = {
                accessToken: loginData.jwtToken,
                refreshToken: loginData.jwtRefreshToken,
                email: formData.accountEmail,
                isLogin: true,
            };
            useDispach(setUser(userData));
            navigate('/');
        }
    }, [isLoginSuccess]);

    const handleOnSubmit = async () => {
        await loginUser(formData);
    };
    const handleOnEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { isError, message } = checkEmailValidaion(e.target.value);
        setEmailValidation({ isError: isError, errorMessage: message });
        setFormData({ ...formData, accountEmail: e.target.value });
    };
    const handleOnPassworldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { isError, message } = checkEmptyValidation(
            e.target.value,
            'Mật khẩu không được để trống',
        );
        setPasswordValidation({ isError: isError, errorMessage: message });
        setFormData({ ...formData, accountPassword: e.target.value });
    };

    return (
        <div className="flex bg-greenHome">
            <div className="w-full bg-white sm:w-[30%] sm:rounded-br-xl sm:rounded-tr-xl md:h-screen">
                <form className="mt-8 flex flex-col items-center justify-center space-y-5">
                    <section className="w-[70%] space-y-5 ">
                        <div className="mb-12 ml-1 mt-[40%] ">
                            <h1 className="text-3xl">Đăng nhập</h1>
                            <p className="sm:max-xl:text-md mt-2 text-base text-grayLine">
                                Mừng trở lại!. Vui lòng điền thông tin bên dưới để tiếp tục
                            </p>
                        </div>
                        <div>
                            <Input
                                onChange={handleOnEmailChange}
                                allowClear
                                size="large"
                                className="px-5 py-3"
                                placeholder="Nhập địa chỉ Email"
                                status={emailValidation.isError ? 'error' : undefined}
                            />
                            <p className="ml-2 mt-1 text-sm text-red-500">
                                {emailValidation.errorMessage}
                            </p>
                        </div>
                        <div>
                            <Input.Password
                                value={formData.accountPassword}
                                onChange={handleOnPassworldChange}
                                size="large"
                                status={passwordValidation.isError ? 'error' : undefined}
                                placeholder="Nhập mật khẩu"
                                className="px-5 py-3"
                                iconRender={(visible) =>
                                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                }
                            />
                            <p className="ml-2 mt-1 text-sm text-red-500">
                                {passwordValidation.errorMessage}
                            </p>
                        </div>
                    </section>
                    <p className="ml-2 text-sm text-red-500">{errorMessage}</p>
                    <Button
                        disabled={
                            emailValidation.isError ||
                            passwordValidation.isError ||
                            formData.accountEmail.length == 0 ||
                            formData.accountPassword.length == 0
                        }
                        onClick={handleOnSubmit}
                        loading={isLoginLoading}
                        type="primary"
                        className="text-md  h-11 w-[70%] bg-greenHome font-bold"
                    >
                        Đăng nhập
                    </Button>
                    <div>Or</div>
                    <Button
                        type="default"
                        className=" flex h-11 w-[70%] items-center justify-center space-x-2 text-lg"
                    >
                        <GoogleOutlined style={{ fontSize: '24px', color: 'red' }} />
                        <span className="text-black">Google</span>
                    </Button>
                    <div>
                        Đã có tài khoản?{' '}
                        <Link to={'/register'} className="text-red-500">
                            Đăng ký ngay.
                        </Link>
                    </div>
                </form>
            </div>
            <div className="hidden justify-end sm:block sm:w-[70%]">
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/estudyhub-a1699.appspot.com/o/logo%2Flogo-black-tail.png?alt=media&token=e65f65a8-94a6-4504-a370-730b122ba42e"
                    alt="logo"
                    className="absolute right-1 top-2 w-[100px]"
                />
                <MyCarouselLogin></MyCarouselLogin>
            </div>
        </div>
    );
}

export default LoginPage;
