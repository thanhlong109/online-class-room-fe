import { Divider, Input, Typography } from 'antd';
import React, { useState } from 'react';
import { checkPasswordValidation } from '../../../../utils/Validation';
import { LoadingButton } from '@mui/lab';

interface PasswordProps {
    value: string;
    isError: boolean;
    errorMessage: string;
    isVisible: boolean;
}

const initialPasswordProps: PasswordProps = {
    errorMessage: '',
    isError: false,
    value: '',
    isVisible: false,
};

const Security = () => {
    const [newPassword, setNewPassword] = useState(initialPasswordProps);
    const [newPasswordRetype, setNewPasswordRetype] = useState(initialPasswordProps);
    const [oldPassword, setOldPassword] = useState(initialPasswordProps);

    const handleOnNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { isError, message } = checkPasswordValidation(e.target.value);
        setNewPassword({
            errorMessage: message,
            isError: isError,
            value: e.target.value,
            isVisible: newPassword.isVisible,
        });
    };

    const handleOnPasswordToggle = (
        setPassword: React.Dispatch<React.SetStateAction<PasswordProps>>,
    ) => {
        setPassword((pre) => {
            return { ...pre, isVisible: !pre.isVisible };
        });
    };

    const handleOnNewPasswordRetypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { isError, message } = checkPasswordValidation(e.target.value);
        setNewPasswordRetype({
            errorMessage: message,
            isError: isError,
            value: e.target.value,
            isVisible: newPasswordRetype.isVisible,
        });
    };
    return (
        <>
            <div>
                <Typography.Title className="text-center" level={3}>
                    Đặt lại mật khẩu
                </Typography.Title>
                <Divider />
                <div className="m-auto flex max-w-[350px] flex-col gap-8">
                    <div>
                        <Typography.Title level={5}>Mật khẩu cũ</Typography.Title>
                        <Input.Password
                            placeholder="Nhập mật khẩu cũ"
                            visibilityToggle={{
                                visible: oldPassword.isVisible,
                                onVisibleChange: () => handleOnPasswordToggle(setOldPassword),
                            }}
                        />
                    </div>
                    <div>
                        <Typography.Title level={5}>Mật khẩu mới</Typography.Title>
                        <div className="flex flex-col gap-3">
                            <div>
                                <Input.Password
                                    placeholder="Nhập mật mới"
                                    visibilityToggle={{
                                        visible: newPassword.isVisible,
                                        onVisibleChange: () =>
                                            handleOnPasswordToggle(setNewPassword),
                                    }}
                                    count={{
                                        show: true,
                                        max: 16,
                                    }}
                                    value={newPassword.value}
                                    status={newPassword.isError ? 'error' : undefined}
                                    onChange={handleOnNewPasswordChange}
                                />
                                <p className="mt-1 text-xs font-medium text-red-500">
                                    {newPassword.errorMessage}
                                </p>
                            </div>
                            <div>
                                <Input.Password
                                    placeholder="Nhập lại mật khẩu mới"
                                    count={{
                                        show: true,
                                        max: 16,
                                    }}
                                    visibilityToggle={{
                                        visible: newPasswordRetype.isVisible,
                                        onVisibleChange: () =>
                                            handleOnPasswordToggle(setNewPasswordRetype),
                                    }}
                                    value={newPasswordRetype.value}
                                    onChange={handleOnNewPasswordRetypeChange}
                                />
                                <p className="mt-1 text-xs font-medium text-red-500">
                                    {newPasswordRetype.errorMessage}
                                </p>
                            </div>
                        </div>
                    </div>
                    <LoadingButton variant="contained">Lưu</LoadingButton>
                </div>
            </div>
        </>
    );
};

export default Security;
