import { CircularProgress, IconButton } from '@mui/material';
import { Input } from 'antd';
import { useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import { motion } from 'framer-motion';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

export interface EditableTextProps {
    value: string | number;
    onChage: (value: string | number) => void;
    maxLength?: number | undefined;
    showCount?: boolean;
    onDoneClick: () => void;
    isLoading?: boolean;
    textCSS?: string;
    type?: string;
    isError?: boolean;
    errorMessage?: string;
    displayValue?: string;
    edit?: boolean;
    onEditClick?: () => void;
    onDeleteClick?: () => void;
}

const EditableText = ({
    value,
    onChage,
    onDoneClick,
    maxLength = undefined,
    showCount = false,
    isLoading = false,
    textCSS = '',
    type = 'string',
    isError = false,
    errorMessage = '',
    displayValue = undefined,
    edit = false,
    onEditClick = () => {},
    onDeleteClick = undefined,
}: EditableTextProps) => {
    const [isEdit, setIsEdit] = useState(edit);
    const [isHovered, setIsHovered] = useState(false);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = type === 'string' ? e.target.value : parseInt(e.target.value);
        onChage(value);
    };
    const handleOnDoneClick = () => {
        onDoneClick();
        setIsEdit(false);
    };

    const handleOnEditClick = () => {
        setIsEdit(true);
        onEditClick();
    };
    return (
        <div
            className="flex items-center gap-4"
            onMouseEnter={() => {
                setIsHovered(true);
            }}
            onMouseLeave={() => {
                setIsHovered(false);
            }}
        >
            {isEdit ? (
                <div className="w-full">
                    <div className={`flex w-full items-center gap-4 ${textCSS}`}>
                        <Input
                            value={value}
                            maxLength={maxLength}
                            onChange={handleOnChange}
                            showCount={showCount}
                            className="flex-1"
                            type={type}
                            status={isError ? 'error' : undefined}
                        />
                        <IconButton disabled={isLoading} onClick={handleOnDoneClick}>
                            {!isLoading && <DoneIcon />}
                            {isLoading && <CircularProgress className="!h-[18px] !w-[18px]" />}
                        </IconButton>
                    </div>
                    {isError && <p>{errorMessage}</p>}
                </div>
            ) : (
                <span className={textCSS}>{displayValue ? displayValue : value}</span>
            )}
            {!isEdit && (
                <div>
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: isHovered ? 0.5 : 1,
                        }}
                        animate={{
                            opacity: isHovered ? 1 : 0,
                            scale: isHovered ? 1 : 0.5,
                        }}
                        transition={{ duration: 0.3, type: 'spring' }}
                        className="space-x-4"
                    >
                        <IconButton
                            disabled={!isHovered}
                            onClick={handleOnEditClick}
                            color="info"
                            size="small"
                        >
                            <CreateIcon />
                        </IconButton>
                        {onDeleteClick && (
                            <IconButton
                                color="error"
                                disabled={!isHovered}
                                onClick={onDeleteClick}
                                size="small"
                            >
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default EditableText;
