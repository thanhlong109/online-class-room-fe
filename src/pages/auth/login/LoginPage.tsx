import { Formik, Form, Field } from 'formik';
// import React from "react";
// import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';

import { MyInput, MyInputPassword } from './MyInput';
import { Button } from 'antd';
import MyCarouselLogin from './MyCarouselLogin';
import { ERROR_MESSAGES, LOGIN_PAGE_TEXT } from '../../../utils/messages';
import { GoogleOutlined } from '@ant-design/icons';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';

export interface FormValues {
    email: string;
    password: string;
}

function LoginPage() {
    const initialValues = {
        email: '',
        password: '',
    };

    const loginText = LOGIN_PAGE_TEXT;
    const validate = ERROR_MESSAGES;
    const validationSchema = Yup.object().shape({
        email: Yup.string().email(validate.email.invalid).required(validate.email.required),
        password: Yup.string()
            .min(6, validate.password.length)
            .required(validate.password.required),
    });
    // const navigate = useNavigate();
    // const handleSubmit = async (values: FormValues) => {};
    // const [showRegister, setShowRegister] = useState(false);
    // const handleToggleClick = () => {
    //     setShowRegister((prevShowRegister) => !prevShowRegister);
    // };

    return (
        <div className="bg-greenHome flex">
            <div className="w-full bg-white sm:w-[30%] sm:rounded-br-xl sm:rounded-tr-xl md:h-screen">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={() => {}}
                >
                    <Form className="mt-8 flex flex-col items-center justify-center space-y-4">
                        <section className="w-[70%] space-y-5 ">
                            <div className="mb-12 ml-1 mt-[40%] ">
                                <h1 className="text-3xl">{loginText.title}</h1>
                                <p className="sm:max-xl:text-md text-grayLine mt-2 text-base">
                                    {loginText.description}
                                </p>
                            </div>

                            <Field
                                name="email"
                                component={MyInput}
                                placeholder={loginText.emailPlaceholder}
                            />
                            <Field
                                name="password"
                                component={MyInputPassword}
                                placeholder={loginText.passwordPlaceholder}
                            />
                        </section>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="text-md bg-greenHome h-11 w-[70%] font-bold"
                        >
                            {loginText.loginButton}
                        </Button>
                        <div>Or</div>
                        <Button
                            type="default"
                            className=" flex h-11 w-[70%] items-center justify-center space-x-2 text-lg"
                        >
                            <GoogleOutlined style={{ fontSize: '24px', color: 'red' }} />
                            <span className="text-black">Google</span>
                        </Button>
                    </Form>
                </Formik>
            </div>
            <div className="hidden sm:block sm:w-[70%]">
                <img src="" alt="logo" className="absolute right-1 w-[100px]" />
                <MyCarouselLogin></MyCarouselLogin>
            </div>
        </div>
    );
}

export default LoginPage;
