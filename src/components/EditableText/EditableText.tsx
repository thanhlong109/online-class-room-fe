import { CircularProgress, IconButton } from '@mui/material';
import { Input } from 'antd';
import { useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import { motion } from 'framer-motion';
import CreateIcon from '@mui/icons-material/Create';

interface EditableTextProps {
    value: string;
    onChage: (value: string) => void;
    maxLength?: number | undefined;
    showCount?: boolean;
    onDoneClick: () => void;
    isLoading?: boolean;
    textCSS?: string;
}

const EditableText = ({
    value,
    onChage,
    onDoneClick,
    maxLength = undefined,
    showCount = false,
    isLoading = false,
    textCSS = '',
}: EditableTextProps) => {
    const [isEdit, setIsEdit] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChage(e.target.value);
    };
    const handleOnDoneClick = () => {
        onDoneClick();
        setIsEdit(false);
    };
    return (
        <div
            className="flex items-center gap-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isEdit ? (
                <div className={`flex w-full items-center gap-4 ${textCSS}`}>
                    <Input
                        value={value}
                        maxLength={maxLength}
                        onChange={handleOnChange}
                        showCount={showCount}
                        className="flex-1"
                    />
                    <IconButton disabled={isLoading} onClick={handleOnDoneClick}>
                        {!isLoading && <DoneIcon />}
                        {isLoading && <CircularProgress className="!h-[18px] !w-[18px]" />}
                    </IconButton>
                </div>
            ) : (
                <span className={textCSS}>{value}</span>
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
                            onClick={() => setIsEdit(true)}
                            size="small"
                        >
                            <CreateIcon />
                        </IconButton>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default EditableText;
