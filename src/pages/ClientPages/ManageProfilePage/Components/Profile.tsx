import { LoadingButton } from '@mui/lab';
import {
    DatePicker,
    DatePickerProps,
    Divider,
    Input,
    Radio,
    RadioChangeEvent,
    Typography,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { useState } from 'react';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    sex: string;
    birthdate: dayjs.Dayjs | null;
    biography: string;
}
const initialData: FormData = {
    biography: '',
    birthdate: null,
    email: '',
    firstName: '',
    lastName: '',
    sex: 'female',
};

const Profile = () => {
    const [formData, setFormData] = useState(initialData);

    const handleOnGenderChange = (e: RadioChangeEvent) => {
        setFormData({ ...formData, sex: e.target.value });
    };
    const handleOnBiographyChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setFormData({ ...formData, biography: e.target.value });
    };
    const handleOnEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, email: e.target.value });
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
    const handleOnBirthdateChange: DatePickerProps['onChange'] = (date, dateString) => {
        setFormData({ ...formData, birthdate: date });
    };
    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
                                value={formData.firstName}
                                onChange={handleOnFirstNameChange}
                            />
                        </div>
                        <div>
                            <Typography.Title level={5}>Tên</Typography.Title>
                            <Input
                                required
                                placeholder="Nhập tên của bạn"
                                allowClear
                                value={formData.lastName}
                                onChange={handleOnLastNameChange}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <Typography.Title level={5}>Giới tính</Typography.Title>
                            <Radio.Group onChange={handleOnGenderChange} value={formData.sex}>
                                <Radio required value={'female'}>
                                    Nữ
                                </Radio>
                                <Radio required value={'male'}>
                                    Nam
                                </Radio>
                            </Radio.Group>
                        </div>
                        <div>
                            <Typography.Title level={5}>Ngày sinh</Typography.Title>
                            <DatePicker
                                value={formData.birthdate}
                                onChange={handleOnBirthdateChange}
                            />
                        </div>
                    </div>
                    <div>
                        <Typography.Title level={5}>Email</Typography.Title>
                        <Input
                            placeholder="Nhập địa chỉ email của bạn"
                            allowClear
                            required
                            type="email"
                            value={formData.email}
                            onChange={handleOnEmailChange}
                        />
                    </div>

                    <div>
                        <Typography.Title level={5}> Tiểu sử</Typography.Title>
                        <TextArea
                            showCount
                            maxLength={100}
                            value={formData.biography}
                            onChange={handleOnBiographyChange}
                            placeholder="Thêm tiểu sử của bạn"
                        />
                    </div>

                    <div className="w-1/3 min-w-fit">
                        <LoadingButton color="primary" fullWidth variant="contained" type="submit">
                            Lưu
                        </LoadingButton>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Profile;
