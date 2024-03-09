import { Input, Radio, Typography } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { Dispatch, SetStateAction, useState } from 'react';
interface MultipleQuestionInputItemProps {
    setStore: Dispatch<SetStateAction<string[]>>;
    index: number;
    placeholder?: string;
    value?: string;
    maxLength?: number;
    size?: SizeType;
    edit?: boolean;
}
const answerPrefix: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M'];

const MultipleQuestionInputItem = ({
    setStore,
    index,
    placeholder,
    value,
    maxLength,
    size = 'large',
    edit = true,
}: MultipleQuestionInputItemProps) => {
    const [data, setData] = useState(value ? value : '');

    return (
        <div className={`flex ${edit ? 'items-center' : 'items-start'} gap-2`}>
            <Typography.Title level={5}>
                {index < answerPrefix.length ? answerPrefix[index] + '.' : ''}
            </Typography.Title>
            {!edit && <Typography.Text className="!mt-0 flex-1 ">{value}</Typography.Text>}
            {edit && (
                <Input
                    className="flex-1"
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
                    placeholder={placeholder}
                />
            )}
        </div>
    );
};

export default MultipleQuestionInputItem;
