import { useEffect, useState } from 'react';
import { EditableText, MultipleQuestionInputItem } from '..';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { Question } from '../../types/Question.type';
import { Radio } from 'antd';

interface MultipleQuestionInputProps {
    placeholders?: string[];
    onDataChange: (question: Question) => void;
    seperator: string;
    values: Question;
    maxInputItem: number;
    maxLengthInput?: number;
    size?: SizeType;
    isCreate?: boolean;
    position?: number;
    onDoneClick?: () => void;
    onDeleteClick?: () => void;
    initalQuestion?: number;
}

const MultipleQuestionInput = ({
    onDataChange,
    placeholders,
    seperator,
    values,
    maxInputItem,
    maxLengthInput = 60,
    size = 'middle',
    isCreate = false,
    position = 1,
    onDoneClick = () => {},
    initalQuestion = 3,
    onDeleteClick = undefined,
}: MultipleQuestionInputProps) => {
    const [arr, setArr] = useState<string[]>(
        values.anwser.split(seperator).filter((value) => value !== ''),
    );
    const [correctAnswer, setCorrectAnswer] = useState(values.correctAnwser);
    const [currentNum, setCurrentNum] = useState(arr.length > 0 ? arr.length : initalQuestion);
    const [title, setTitle] = useState(values.questionTitle);
    const [isEdit, setIsEdit] = useState(isCreate);

    useEffect(() => {
        let answer = '';
        arr.forEach((data) => {
            if (data !== '') {
                answer += data + seperator;
            }
        });
        const question: Question = {
            ...values,
            anwser: answer,
            correctAnwser: correctAnswer,
            questionTitle: title,
        };
        onDataChange(question);
    }, [arr, correctAnswer, title]);
    const handleOnAddClick = () => {
        if (currentNum < maxInputItem) {
            setCurrentNum(currentNum + 1);
        }
    };

    const handleOnDeleteClick = (index: number) => {
        const newArr = [...arr];
        newArr.splice(index, 1);
        setArr([...newArr]);
        setCurrentNum(currentNum - 1);
    };

    return (
        <div>
            <div className="flex flex-col gap-4">
                <EditableText
                    onChage={(value) => {
                        if (typeof value === 'string') {
                            setTitle(value);
                        }
                    }}
                    displayValue={`Câu ${position}: ${title}`}
                    onDoneClick={() => {
                        onDoneClick();
                        setIsEdit(false);
                    }}
                    onEditClick={() => setIsEdit(true)}
                    maxLength={300}
                    showCount
                    textCSS="font-medium"
                    value={title}
                    edit={isEdit}
                    onDeleteClick={onDeleteClick}
                />
                <Radio.Group
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                    value={correctAnswer}
                    className="grid grid-cols-2 gap-8 px-4"
                >
                    {Array.from({ length: currentNum }, (_, index) => (
                        <div className="flex items-center gap-2 bg-[#f7f9fa] p-4">
                            <div className="flex-1">
                                <MultipleQuestionInputItem
                                    maxLength={maxLengthInput}
                                    value={arr[index] ? arr[index] : ''}
                                    key={index}
                                    setStore={setArr}
                                    index={index}
                                    placeholder={placeholders?.[index]}
                                    size={size}
                                    edit={isEdit}
                                />
                            </div>
                            <Radio value={index} checked={correctAnswer === index} />
                            {isEdit && (
                                <IconButton
                                    onClick={() => handleOnDeleteClick(index)}
                                    size="small"
                                    color="error"
                                    className=""
                                >
                                    <DeleteIcon />{' '}
                                </IconButton>
                            )}
                        </div>
                    ))}
                </Radio.Group>{' '}
                {isEdit && currentNum < maxInputItem && (
                    <Button
                        onClick={handleOnAddClick}
                        className="!w-fit justify-start"
                        variant="text"
                        size="small"
                        style={{ fontSize: '12px' }}
                        startIcon={<AddIcon />}
                    >
                        Thêm đáp án
                    </Button>
                )}
            </div>
        </div>
    );
};

export default MultipleQuestionInput;
