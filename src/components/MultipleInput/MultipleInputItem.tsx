import { Input } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { Dispatch, SetStateAction, useState } from 'react';
interface MultipleInputItemProps {
    setStore: Dispatch<SetStateAction<string[]>>;
    index: number;
    placeholder?: string;
    value?: string;
    maxLength?: number;
    size?: SizeType;
}

const MultipleInputItem = ({
    setStore,
    index,
    placeholder,
    value,
    maxLength,
    size = 'large',
}: MultipleInputItemProps) => {
    const [data, setData] = useState(value ? value : '');

    return (
        <div>
            <Input
                onChange={(e) => {
                    setData(e.target.value);

                    setStore((pre) => {
                        const arr = [...pre];
                        arr[index] = e.target.value;
                        return arr;
                    });
                }}
                value={data}
                maxLength={maxLength}
                showCount
                allowClear
                size={size}
                className="!max-w-[500px]"
                placeholder={placeholder}
            />
        </div>
    );
};

export default MultipleInputItem;
