interface ValidationResult {
    isError: boolean;
    message: string;
}

const containNoUpercaseRegex = new RegExp('^(?=.*[a-z])');
const containUpercaseRegex = new RegExp('^(?=.*[A-Z])');
const containNumberRegex = new RegExp('^(?=.*[0-9])');
const containSpecialCharacterRegex = new RegExp('^(?=.*[!@#%^&*()-_+])');

export function checkPasswordValidation(password: string) {
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
    } else {
        result.isError = false;
    }
    return result;
}

export function checkEmptyValidation(text: string) {
    let result: ValidationResult = { isError: true, message: '' };
    if (text.length == 0) {
        result.message = 'Vui lòng không bỏ trống trường này!';
    } else {
        result.isError = false;
    }
    return result;
}
