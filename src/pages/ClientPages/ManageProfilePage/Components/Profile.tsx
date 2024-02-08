import { LoadingButton } from '@mui/lab';
import {
    DatePicker,
    DatePickerProps,
    Divider,
    Input,
    Radio,
    RadioChangeEvent,
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
    const [date, setDate] = useState<dayjs.Dayjs | null>(
        dayjs(useSelector((state: RootState) => state.user.birthDate)),
    );

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
    const handleOnGenderChange = (e: RadioChangeEvent) => {
        setFormData({ ...formData, sex: e.target.value });
    };
    const handleOnBiographyChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setFormData({ ...formData, biography: e.target.value });
    };
    const handleOnFirstNameChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setFormData({ ...formData, firstName: e.target.value });
    };
    const handleOnLastNameChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setFormData({ ...formData, lastName: e.target.value });
    };
    const handleOnPhoneNumberChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setFormData({ ...formData, phoneNumber: e.target.value });
    };
    const handleOnBirthdateChange: DatePickerProps['onChange'] = (date, dateString) => {
        setDate(date);
        setFormData({ ...formData, birthDate: dateString });
    };
    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateUserMutate(formData);
    };

    return (
        <>
            <form className="" onSubmit={handleOnSubmit}>
                <Typography.Title className="text-center" level={3}>
                    Thông tin cơ bản
                </Typography.Title>
                <Divider />
                <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <Typography.Title level={5}>Họ</Typography.Title>
                            <Input
                                required
                                placeholder="Nhập họ của bạn"
                                allowClear
                                value={formData.firstName ? formData.firstName : ''}
                                onChange={handleOnFirstNameChange}
                            />
                        </div>
                        <div>
                            <Typography.Title level={5}>Tên</Typography.Title>
                            <Input
                                required
                                placeholder="Nhập tên của bạn"
                                allowClear
                                value={formData.lastName ? formData.lastName : ''}
                                onChange={handleOnLastNameChange}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <Typography.Title level={5}>Giới tính</Typography.Title>
                            <Radio.Group onChange={handleOnGenderChange} value={formData.sex}>
                                <Radio required value={'nữ'}>
                                    Nữ
                                </Radio>
                                <Radio required value={'nam'}>
                                    Nam
                                </Radio>
                                <Radio required value={'khác'}>
                                    Khác
                                </Radio>
                            </Radio.Group>
                        </div>
                        <div>
                            <Typography.Title level={5}>Ngày sinh</Typography.Title>
                            <DatePicker
                                allowClear={false}
                                value={date}
                                onChange={handleOnBirthdateChange}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <Typography.Title level={5}>Email</Typography.Title>
                            <Input
                                placeholder="Nhập địa chỉ email của bạn"
                                allowClear
                                type="email"
                                readOnly
                                value={email ? email : ''}
                            />
                        </div>
                        <div>
                            <Typography.Title level={5}>Số điện thoại</Typography.Title>
                            <Input
                                placeholder="Nhập số điện thoại của bạn"
                                allowClear
                                required
                                type="phoneNumber"
                                value={formData.phoneNumber ? formData.phoneNumber : ''}
                                onChange={handleOnPhoneNumberChange}
                            />
                        </div>
                    </div>

                    <div>
                        <Typography.Title level={5}> Tiểu sử</Typography.Title>
                        <TextArea
                            showCount
                            maxLength={100}
                            value={formData.biography ? formData.biography : ''}
                            onChange={handleOnBiographyChange}
                            placeholder="Thêm tiểu sử của bạn"
                        />
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
            </form>
        </>
    );
};

export default Profile;
