import { CircularProgress, IconButton } from '@mui/material';
import { useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import { motion } from 'framer-motion';
import CreateIcon from '@mui/icons-material/Create';

export interface EditableItemProps {
    editElement: React.ReactNode;
    displayElement: React.ReactNode;
    showEditFirst?: boolean;
    onEditClick?: () => void;
    onDoneClick?: () => void;
    isLoading?: boolean;
}

const EditableItem = ({
    displayElement,
    editElement,
    showEditFirst = false,
    onDoneClick = () => {},
    onEditClick = () => {},
    isLoading = false,
}: EditableItemProps) => {
    const [isEdit, setIsEdit] = useState(showEditFirst);
    const [isHovered, setIsHovered] = useState(false);

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
                    <div className={`flex w-full items-center gap-4`}>
                        {editElement}
                        <IconButton disabled={isLoading} onClick={handleOnDoneClick}>
                            {!isLoading && <DoneIcon />}
                            {isLoading && <CircularProgress className="!h-[18px] !w-[18px]" />}
                        </IconButton>
                    </div>
                </div>
            ) : (
                <div>{displayElement}</div>
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
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default EditableItem;
