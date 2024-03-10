import { Button, Input } from 'antd';
import MyCarouselLogin from './MyCarouselLogin';
import { EyeInvisibleOutlined, EyeTwoTone, GoogleOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../../hooks/appHook';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterUserRequest, useRegisterUserMutation } from '../../../services/auth.services';
import { checkEmailValidaion, checkPasswordValidation } from '../../../utils/Validation';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../../../firebase/firebase';

const initFromData: RegisterUserRequest = {
    accountEmail: '',
    accountPassword: '',
    confirmAccountPassword: '',
    birthDate: '2024-03-10T04:59:03.327Z',
    lastName: 'string',
    firstName: 'string',
    accountPhone: 'string',
};

interface validationProps {
    isError: boolean;
    errorMessage: string;
}

const initialValidation: validationProps = {
    errorMessage: '',
    isError: false,
};

function RegisterPage() {
    const useDispach = useAppDispatch();
    const [formData, setFormData] = useState(initFromData);
    const [emailValidation, setEmailValidation] = useState(initialValidation);
    const [passwordValidation, setPasswordValidation] = useState(initialValidation);
    const [confirmPasswordValidation, setConfirmPasswordValidation] = useState(initialValidation);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [
        registerUser,
        {
            data: registerData,
            isLoading: isRegisterLoading,
            isSuccess: isRegisterSuccess,
            isError: isRegisterError,
        },
    ] = useRegisterUserMutation();

    useEffect(() => {
        if (isRegisterError) {
            setErrorMessage('Email đã có người sử dụng');
        }
    }, [isRegisterError]);

    useEffect(() => {
        if (isRegisterSuccess) {
            navigate('/login');
        }
    }, [isRegisterSuccess]);

    const handleOnSubmit = async () => {
        await registerUser(formData);
    };

    const handleOnEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { isError, message } = checkEmailValidaion(e.target.value);
        setEmailValidation({ isError: isError, errorMessage: message });
        setFormData({ ...formData, accountEmail: e.target.value });
    };

    const handleOnPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { isError, message } = checkPasswordValidation(
            e.target.value,
            formData.confirmAccountPassword,
        );
        setPasswordValidation({ isError: isError, errorMessage: message });
        setFormData({ ...formData, accountPassword: e.target.value });
    };

    const handleOnConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { isError, message } = checkPasswordValidation(
            formData.accountPassword,
            e.target.value,
        );
        setConfirmPasswordValidation({ isError: isError, errorMessage: message });
        setFormData({ ...formData, confirmAccountPassword: e.target.value });
    };

    const handleLoginWithGoogle = async () => {
        try {
            const auth = await getAuth(app);
            const provider = new GoogleAuthProvider();
            const userData = await signInWithPopup(auth, provider);
            console.log(userData);
            const { displayName, email, photoURL } = userData.user;
            // Lưu thông tin người dùng vào localStorage
            localStorage.setItem(
                'userLogin',
                JSON.stringify({ name: displayName, email, avatar: photoURL }),
            );

            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex bg-greenHome">
            <div className="w-full bg-white sm:w-[30%] sm:rounded-br-xl sm:rounded-tr-xl md:h-screen">
                <form className="mt-8 flex flex-col items-center justify-center space-y-5">
                    <section className="w-[70%] space-y-5 ">
                        <div className="mb-12 ml-1 mt-[40%] ">
                            <h1 className="text-3xl">Đăng ký</h1>
                            <p className="sm:max-xl:text-md mt-2 text-base text-grayLine">
                                Mừng đến với hệ thống! Vui lòng điền thông tin bên dưới để tiếp tục
                            </p>
                        </div>
                        <div>
                            <Input
                                onChange={handleOnEmailChange}
                                allowClear
                                size="large"
                                className="px-5 py-3"
                                value={formData.accountEmail}
                                placeholder="Nhập địa chỉ Email"
                                status={emailValidation.isError ? 'error' : undefined}
                            />
                            <p className="ml-2 mt-1 text-sm text-red-500">
                                {emailValidation.errorMessage}
                            </p>
                        </div>
                        <div>
                            <Input.Password
                                onChange={handleOnPasswordChange}
                                size="large"
                                status={passwordValidation.isError ? 'error' : undefined}
                                value={formData.accountPassword}
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
                        <div>
                            <Input.Password
                                onChange={handleOnConfirmPasswordChange}
                                size="large"
                                status={confirmPasswordValidation.isError ? 'error' : undefined}
                                value={formData.confirmAccountPassword}
                                placeholder="Xác nhận mật khẩu"
                                className="px-5 py-3"
                                iconRender={(visible) =>
                                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                }
                            />
                            <p className="ml-2 mt-1 text-sm text-red-500">
                                {confirmPasswordValidation.errorMessage}
                            </p>
                        </div>
                    </section>
                    <p className="ml-2 text-sm text-red-500">{errorMessage}</p>
                    <Button
                        disabled={
                            emailValidation.isError ||
                            passwordValidation.isError ||
                            confirmPasswordValidation.isError ||
                            formData.accountEmail.length === 0 ||
                            formData.accountPassword.length === 0 ||
                            formData.confirmAccountPassword.length === 0
                        }
                        onClick={handleOnSubmit}
                        loading={isRegisterLoading}
                        type="primary"
                        className="text-md  h-11 w-[70%] bg-greenHome font-bold"
                    >
                        Đăng ký
                    </Button>
                    <div>Hay</div>
                    <Button
                        type="default"
                        className=" flex h-11 w-[70%] items-center justify-center space-x-2 text-lg"
                        onClick={handleLoginWithGoogle}
                    >
                        <GoogleOutlined style={{ fontSize: '24px', color: 'red' }} />
                        <span className="text-black">Google</span>
                    </Button>
                    <div>
                        Đã có tài khoản?{' '}
                        <Link to={'/login'} className="text-red-500">
                            Đăng nhập ngay.
                        </Link>
                    </div>
                </form>
            </div>
            <div className="hidden sm:block sm:w-[70%]">
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

export default RegisterPage;
