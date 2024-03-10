export interface ValidationResult {
    isError: boolean;
    message: string;
}

const containNoUpercaseRegex = new RegExp('^(?=.*[a-z])');
const containUpercaseRegex = new RegExp('^(?=.*[A-Z])');
const containNumberRegex = new RegExp('^(?=.*[0-9])');
const containSpecialCharacterRegex = new RegExp('^(?=.*[!@#%^&*()-_+])');
const validEmailRegex = new RegExp('^([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9_.-]+.[a-zA-Z]{2,})');

export function checkPasswordValidation(password: string, currentPassworld: string | null = null) {
    let result: ValidationResult = { isError: true, message: '' };
    if (password.length < 8) {
        result.message = 'Mật khẩu dài tối thiểu 8 ký tự';
    } else if (password.length > 16) {
        result.message = 'Mật khẩu dài tối đa 16 ký tự';
    } else if (!containNoUpercaseRegex.test(password)) {
        result.message = 'Mật khẩu cần ít nhất 1 chữ thường ';
    } else if (!containUpercaseRegex.test(password)) {
        result.message = 'Mật khẩu cần ít nhất 1 chữ in hoa';
    } else if (!containNumberRegex.test(password)) {
        result.message = 'Mật khẩu cần ít nhất 1 chữ số';
    } else if (!containSpecialCharacterRegex.test(password)) {
        result.message = 'Mật khẩu cần ít nhất 1 kí tự đặc biệt';
    } else if (currentPassworld && currentPassworld != password) {
        result.message = 'Mật khẩu không không khớp mật khẩu mới';
    } else {
        result.isError = false;
    }
    return result;
}

export function checkEmailValidaion(email: string) {
    let result: ValidationResult = { isError: true, message: '' };
    if (email.length == 0) {
        result.message = 'Email không được để trống';
    } else if (!validEmailRegex.test(email)) {
        result.message = 'Email không hợp lệ';
    } else {
        result.isError = false;
    }
    return result;
}

export function checkEmptyValidation(text: string, message: string | null = null) {
    let result: ValidationResult = { isError: true, message: '' };
    if (text.length == 0) {
        result.message = 'Vui lòng không bỏ trống trường này!';
    } else {
        result.isError = false;
    }
    if (result.isError && message) {
        result.message = message;
    }
    return result;
}


