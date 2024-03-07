import { Button, Input } from 'antd';
// import React, { useState } from 'react';
import MyCarouselLogin from './MyCarouselLogin';
import { EyeInvisibleOutlined, EyeTwoTone, GoogleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

// const initFromData: LoginRequest = {
//     accountEmail: '',
//     accountPassword: '',
// };

// interface validationProps {
//     isError: boolean;
//     errorMessage: string;
// }

// const initialValidation: validationProps = {
//     errorMessage: '',
//     isError: false,
// };

function RegisterPage() {
    // const useDispatch = useAppDispatch();
    // const [formData, setFormData] = useState(initFromData);
    // const [emailValidation, setEmailValidation] = useState(initialValidation);
    // const [passwordValidation, setPasswordValidation] = useState(initialValidation);
    // const [errorMessage, setErrorMessage] = useState('');
    // const navigate = useNavigate();

    return (
        <div className="flex bg-greenHome">
            <div className="w-full bg-white sm:w-[30%] sm:rounded-br-xl sm:rounded-tr-xl md:h-screen">
                <form className="mt-3 flex flex-col items-center justify-center space-y-5">
                    <section className="w-[70%] space-y-5 ">
                        <div className="mb-12 ml-1 mt-[40%] ">
                            <h1 className="text-3xl">Đăng ký</h1>
                            <p className="sm:max-xl:text-md mt-2 text-base text-grayLine">
                                Mừng đến với hệ thống! Vui lòng điền thông tin bên dưới để tiếp tục
                            </p>
                        </div>
                        <div>
                            <Input
                                // onChange={handleOnEmailChange}
                                allowClear
                                size="large"
                                className="px-5 py-3"
                                placeholder="Nhập địa chỉ Email"
                                // status={emailValidation.isError ? 'error' : undefined}
                            />
                            <p className="ml-2 mt-1 text-sm text-red-500">
                                {/* {emailValidation.errorMessage} */}
                            </p>
                        </div>
                        <div>
                            <Input.Password
                                autoComplete="new-password"
                                // value={formData.accountPassword}
                                // onChange={handleOnPassworldChange}
                                size="large"
                                // status={passwordValidation.isError ? 'error' : undefined}
                                placeholder="Nhập mật khẩu"
                                className="px-5 py-3"
                                iconRender={(visible) =>
                                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                }
                            />
                            <p className="ml-2 mt-1 text-sm text-red-500">
                                {/* {passwordValidation.errorMessage} */}
                            </p>
                        </div>
                        <div>
                            <Input.Password
                                autoComplete="new-password"
                                // value={formData.accountPassword}
                                // onChange={handleOnPassworldChange}
                                size="large"
                                // status={passwordValidation.isError ? 'error' : undefined}
                                placeholder="Nhập lại mật khẩu"
                                className="px-5 py-3"
                                iconRender={(visible) =>
                                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                }
                            />
                            <p className="ml-2 mt-1 text-sm text-red-500">
                                {/* {passwordValidation.errorMessage} */}
                            </p>
                        </div>
                    </section>
                    {/* <p className="ml-2 text-sm text-red-500">{errorMessage}</p> */}
                    <Button
                        // disabled={
                        //     emailValidation.isError ||
                        //     passwordValidation.isError ||
                        //     formData.accountEmail.length == 0 ||
                        //     formData.accountPassword.length == 0
                        // }
                        // onClick={handleOnSubmit}
                        // loading={isRegisterLoading}
                        type="primary"
                        className="text-md  h-11 w-[70%] bg-greenHome font-bold"
                    >
                        Đăng ký
                    </Button>
                    <div>Hay</div>
                    <Button
                        type="default"
                        className=" flex h-11 w-[70%] items-center justify-center space-x-2 text-lg"
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
