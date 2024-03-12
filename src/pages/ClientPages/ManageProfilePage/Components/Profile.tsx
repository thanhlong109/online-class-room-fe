import { LoadingButton } from '@mui/lab';
import {
    DatePicker,
    DatePickerProps,
    Divider,
    Form,
    Input,
    Select,
    Typography,
    message,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { UserInfo, setUserInfo } from '../../../../slices/userSlice';
import { useUpdateUserInfoMutation } from '../../../../services/auth.services';

const Profile = () => {
    const dispatch = useDispatch();
    const email = useSelector((state: RootState) => state.auth.email);
    const [updateUserMutate, { isSuccess, data, isLoading }] = useUpdateUserInfoMutation();

    const userLoaded = useSelector((state: RootState) => state.user);
    const [formData, setFormData] = useState<UserInfo>(userLoaded);
    useEffect(() => {
        setFormData(userLoaded);
    }, [userLoaded]);
    useEffect(() => {
        if (isSuccess && data) {
            dispatch(setUserInfo(data));
            message.success('cập nhật thành công!');
        }
    }, [isSuccess]);

    const handleOnBirthdateChange: DatePickerProps['onChange'] = (_, dateString) => {
        setFormData({ ...formData, birthDate: dateString });
    };

    const onSubmit = (data: UserInfo) => {
        const userData = {
            ...data,
            birthDate: formData.birthDate,
            id: formData.id,
            profileImg: formData.profileImg,
        };
        updateUserMutate(userData);
    };

    return (
        <>
            <Form
                className=""
                onFinish={onSubmit}
                initialValues={{ ...formData, birthDate: dayjs(formData.birthDate), email: email }}
            >
                <Typography.Title className="text-center" level={3}>
                    Thông tin cơ bản
                </Typography.Title>
                <Divider />
                <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <Form.Item
                                label="Họ"
                                name="firstName"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập họ của bạn!' },
                                    { min: 2, message: 'Họ cần ít nhất 2 kí tự' },
                                    { whitespace: true },
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="Nhập họ của bạn" />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                label="Tên"
                                name="lastName"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập tên của bạn!' },
                                    { min: 2, message: 'Họ cần ít nhất 2 kí tự' },
                                    { whitespace: true },
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="Nhập tên của bạn" />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <Form.Item
                                label="Giới tính"
                                name="sex"
                                rules={[
                                    { required: true, message: 'Please input your last name!' },
                                ]}
                                hasFeedback
                            >
                                <Select>
                                    <Select.Option value={'nữ'}>Nữ</Select.Option>
                                    <Select.Option value={'nam'}>Nam</Select.Option>
                                    <Select.Option value={'khác'}>Khác</Select.Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                label="Ngày sinh"
                                name="birthDate"
                                rules={[
                                    { required: true, message: 'Please input your last name!' },
                                ]}
                                hasFeedback
                            >
                                <DatePicker allowClear={false} onChange={handleOnBirthdateChange} />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: 'Please input your last name!' },
                                ]}
                                hasFeedback
                            >
                                <Input
                                    placeholder="Nhập địa chỉ email của bạn"
                                    type="email"
                                    readOnly
                                    value={email ? email : ''}
                                />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                label="Số điện thoại"
                                name="phoneNumber"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập số điện thoại của bạn!',
                                    },
                                    {
                                        pattern: /^\d{10,11}$/,
                                        message: 'Số điện thoại không hợp lệ!',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Nhập số điện thoại của bạn"
                                    type="phoneNumber"
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <div>
                        <Form.Item label="Tiểu sử" name="biography">
                            <TextArea
                                showCount
                                maxLength={200}
                                placeholder="Thêm tiểu sử của bạn"
                            />
                        </Form.Item>
                    </div>
                    <div className="w-1/3 min-w-fit">
                        <LoadingButton
                            loading={isLoading}
                            color="primary"
                            fullWidth
                            variant="contained"
                            type="submit"
                        >
                            Lưu
                        </LoadingButton>
                    </div>
                </div>
            </Form>
        </>
    );
};

export default Profile;
