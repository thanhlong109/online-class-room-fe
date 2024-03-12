import { useEffect, useState } from 'react';
import { MultipleInputItem } from '..';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { SizeType } from 'antd/es/config-provider/SizeContext';

interface MultipleInputProps {
    placeholders?: string[];
    onDataChange: (data: string) => void;
    seperator: string;
    values: string;
    maxInputItem: number;
    maxLengthInput?: number;
    size?: SizeType;
}

const MultipleInput = ({
    onDataChange,
    placeholders,
    seperator,
    values,
    maxInputItem,
    maxLengthInput = 60,
    size,
}: MultipleInputProps) => {
    const [arr, setArr] = useState<string[]>(
        values.split(seperator).filter((value) => value !== ''),
    );
    const [currentNum, setCurrentNum] = useState(arr.length);
    useEffect(() => {
        let dataString = '';
        arr.forEach((data) => {
            if (data !== '') {
                dataString += data + seperator;
            }
        });
        onDataChange(dataString);
    }, [arr]);
    const handleOnAddClick = () => {
        if (currentNum < maxInputItem) {
            setCurrentNum(currentNum + 1);
        }
    };
    return (
        <div>
            <div className="flex flex-col gap-4">
                {Array.from({ length: currentNum }, (_, index) => (
                    <MultipleInputItem
                        maxLength={maxLengthInput}
                        value={arr[index] ? arr[index] : ''}
                        key={index}
                        setStore={setArr}
                        index={index}
                        placeholder={placeholders?.[index]}
                        size={size}
                    />
                ))}{' '}
                {currentNum < maxInputItem && (
                    <Button
                        onClick={handleOnAddClick}
                        className="!w-fit justify-start"
                        variant="outlined"
                        startIcon={<AddIcon />}
                    >
                        Thêm mục mới
                    </Button>
                )}
            </div>
        </div>
    );
};

export default MultipleInput;
