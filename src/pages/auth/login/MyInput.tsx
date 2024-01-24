import { Input } from 'antd';
import { ErrorMessage } from 'formik';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

export interface MyInputProps {
    id: string;
    field: {
        name: string;
        value: string;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    };
    placeholder: string;
}

function MyInput({ field, placeholder }: MyInputProps) {
    const { name, value, onChange } = field;
    return (
        <div className="relative">
            <Input
                {...field}
                onChange={onChange}
                value={value || ''}
                allowClear
                size="large"
                className="px-5 py-3 "
            />
            <p className="absolute top-0 z-50 -translate-y-2 translate-x-3 bg-white px-1 text-xs">
                {placeholder}
            </p>
            <ErrorMessage name={name} component="p" className="ml-2 text-sm text-red-500" />
        </div>
    );
}

function MyInputPassword({ field, placeholder }: MyInputProps) {
    const { name, value, onChange } = field;
    return (
        <div className="relative">
            <Input.Password
                {...field}
                value={value || ''}
                onChange={onChange}
                size="large"
                className="px-5 py-3"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
            <p className="absolute top-0 z-50 -translate-y-2 translate-x-3 bg-white px-1 text-xs">
                {placeholder}
            </p>
            <ErrorMessage name={name} component="p" className="ml-2 text-sm text-red-500" />
        </div>
    );
}
export { MyInput, MyInputPassword };
