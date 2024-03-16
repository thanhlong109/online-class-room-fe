import { Divider, Input, Typography, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { checkEmptyValidation, checkPasswordValidation } from '../../../../utils/Validation';
import { LoadingButton } from '@mui/lab';
import { useUpdatePasswordMutation } from '../../../../services/auth.services';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

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
    const [currentPassword, setCurrentPassword] = useState(initialPasswordProps);
    const email = useSelector((state: RootState) => state.auth.email);
    const [updatePasswordMutation, { isSuccess, isLoading, isError }] = useUpdatePasswordMutation();

    useEffect(() => {
        if (isSuccess) {
            message.success('Thay đổi mật khẩu thành công!');
            setNewPassword(initialPasswordProps);
            setNewPasswordRetype(initialPasswordProps);
            setCurrentPassword(initialPasswordProps);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            message.error('Mật khẩu không đúng!');
        }
    }, [isError]);

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
        const { isError, message } = checkPasswordValidation(e.target.value, newPassword.value);
        setNewPasswordRetype({
            errorMessage: message,
            isError: isError,
            value: e.target.value,
            isVisible: newPasswordRetype.isVisible,
        });
    };

    const handleOnCurrentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { isError, message } = checkEmptyValidation(
            e.target.value,
            'Vui lòng nhập mật khẩu hiện tại',
        );
        setCurrentPassword({
            errorMessage: message,
            isError: isError,
            value: e.target.value,
            isVisible: newPasswordRetype.isVisible,
        });
    };

    const handleOnClickSave = () => {
        updatePasswordMutation({
            confirmNewPassword: newPasswordRetype.value,
            currentPassword: currentPassword.value,
            newPassword: newPassword.value,
            email: email ? email : '',
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
                        <Typography.Title level={5}>Mật khẩu hiện tại</Typography.Title>
                        <Input.Password
                            placeholder="Nhập mật khẩu hiện tại"
                            onChange={handleOnCurrentPasswordChange}
                            visibilityToggle={{
                                visible: currentPassword.isVisible,
                                onVisibleChange: () => handleOnPasswordToggle(setCurrentPassword),
                            }}
                            value={currentPassword.value}
                        />
                        <p className="mt-1 text-xs font-medium text-red-500">
                            {currentPassword.errorMessage}
                        </p>
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
                    <LoadingButton
                        disabled={
                            currentPassword.value.length == 0 ||
                            newPassword.value.length == 0 ||
                            newPasswordRetype.value.length == 0 ||
                            newPasswordRetype.isError
                        }
                        variant="contained"
                        onClick={handleOnClickSave}
                        loading={isLoading}
                    >
                        Lưu
                    </LoadingButton>
                </div>
            </div>
        </>
    );
};

export default Security;
