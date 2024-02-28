import { IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';

export interface SectionCreatorProps {
    position: number;
    lable: string;
}

const SectionCreator = ({ position, lable }: SectionCreatorProps) => {
    const addCourseState = useSelector((state: RootState) => state.course.addCourse);

    const [isHovered, setIsHovered] = useState(false);
    const [sectionLable, setSectionLable] = useState(lable);
    const [isEdit, setIsEdit] = useState(false);
    const handleOnEditClick = () => {
        setIsEdit(true);
    };

    const handleOnRemoveClick = () => {};
    return (
        <div className="bg-[#f7f9fa] p-4">
            <div
                className="flex items-center gap-4"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <p className="text-base font-bold">Chương {position}: </p>
                {isEdit ? (
                    <div className="flex items-center gap-4 font-medium">
                        <Input value={sectionLable} maxLength={200} showCount />
                        <IconButton>
                            <DoneIcon />
                        </IconButton>
                    </div>
                ) : (
                    <span className="font-medium">{sectionLable}</span>
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
                            <IconButton
                                disabled={!isHovered}
                                onClick={handleOnRemoveClick}
                                size="small"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SectionCreator;
