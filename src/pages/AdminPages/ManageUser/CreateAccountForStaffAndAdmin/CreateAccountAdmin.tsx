import { Button, Form, Input, Select, Typography } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';

type FieldType = {
    accountEmail: string;
    accountPassword: string;
    confirmAccountPassword: string;
    role: number;
};

const CreateAccountAdmin = () => {
    const { Title } = Typography;
    const { Option } = Select;
    const formItemLayout = {
        labelCol: { span: 8 }, // Kích thước của cột label
        wrapperCol: { span: 16 }, // Kích thước của cột input
    };

    const validationSchema = Yup.object().shape({
        accountEmail: Yup.string()
            .matches(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Email phải có định dạng user@example.com',
            )
            .required('Email không được bỏ trống'),
        accountPassword: Yup.string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{6,}$/,
                'Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa, 1 số, 1 kí tự đặc biệt và có độ dài ít nhất 6 kí tự',
            )
            .required('Mật khẩu không được bỏ trống'),
        confirmAccountPassword: Yup.string()
            .oneOf(
                [Yup.ref('accountPassword'), undefined],
                'Xác nhận mật khẩu phải trùng khớp với mật khẩu',
            )
            .required('Xác nhận mật khẩu không được bỏ trống'),
        role: Yup.number().required('Vui lòng chọn role'),
    });

    const handleSubmit = (values: FieldType) => {
        // Xử lý submit form ở đây
        console.log(values);
    };

    const formik = useFormik({
        initialValues: {
            accountEmail: '',
            accountPassword: '',
            confirmAccountPassword: '',
            role: 0,
        },
        validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <div className="mx-auto flex max-w-[80%] flex-col items-center justify-center rounded-xl bg-gradient-to-bl from-gray-100 via-white to-transparent p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <Title level={4}>Tạo tài khoản cho ADMIN và STAFF</Title>
            <div className="mt-4 w-full max-w-md">
                <Form autoComplete="off" onFinish={formik.handleSubmit}>
                    <Form.Item<FieldType>
                        {...formItemLayout}
                        label="Email"
                        name="accountEmail"
                        validateStatus={
                            formik.errors.accountEmail && formik.touched.accountEmail ? 'error' : ''
                        }
                        help={
                            formik.errors.accountEmail && formik.touched.accountEmail
                                ? formik.errors.accountEmail
                                : ''
                        }
                    >
                        <Input
                            name="accountEmail"
                            value={formik.values.accountEmail}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </Form.Item>
                    <Form.Item<FieldType>
                        {...formItemLayout}
                        label="Mật khẩu"
                        name="accountPassword"
                        validateStatus={
                            formik.errors.accountPassword && formik.touched.accountPassword
                                ? 'error'
                                : ''
                        }
                        help={
                            formik.errors.accountPassword && formik.touched.accountPassword
                                ? formik.errors.accountPassword
                                : ''
                        }
                    >
                        <Input
                            name="accountPassword"
                            value={formik.values.accountPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </Form.Item>
                    <Form.Item<FieldType>
                        {...formItemLayout}
                        label="Xác nhận mật khẩu"
                        name="confirmAccountPassword"
                        validateStatus={
                            formik.errors.confirmAccountPassword &&
                            formik.touched.confirmAccountPassword
                                ? 'error'
                                : ''
                        }
                        help={
                            formik.errors.confirmAccountPassword &&
                            formik.touched.confirmAccountPassword
                                ? formik.errors.confirmAccountPassword
                                : ''
                        }
                    >
                        <Input
                            name="confirmAccountPassword"
                            value={formik.values.confirmAccountPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </Form.Item>
                    <Form.Item<FieldType>
                        {...formItemLayout}
                        label="Vai trò"
                        name="role"
                        validateStatus={formik.errors.role && formik.touched.role ? 'error' : ''}
                        help={formik.errors.role && formik.touched.role ? formik.errors.role : ''}
                    >
                        <Select
                            value={formik.values.role}
                            onChange={(value: number) => formik.setFieldValue('role', value)}
                            onBlur={formik.handleBlur}
                        >
                            <Option value={0}>Admin</Option>
                            <Option value={1}>Staff</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 16, offset: 15 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-[168px] rounded-md bg-blue-500 text-white"
                        >
                            Tạo tài khoản
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default CreateAccountAdmin;
