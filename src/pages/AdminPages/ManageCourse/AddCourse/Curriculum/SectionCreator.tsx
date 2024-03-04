import { IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import { updateSectionId } from '../../../../../slices/courseSlice';
import AddIcon from '@mui/icons-material/Add';
import LectureCreator from '../Lecture/LectureCreator';
import { Section, Step } from '../../../../../types/Course.type';

export interface SectionCreatorProps {
    position: number;
    section: Section;
}

const SectionCreator = ({ position, section }: SectionCreatorProps) => {
    const dispatch = useDispatch();
    const addCourseState = useSelector((state: RootState) => state.course.addCourse);
    const [isHovered, setIsHovered] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [totalSteps, setTotalStep] = useState(section.steps.length);
    const handleOnRemoveClick = () => {};
    const handleOnTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateSectionId({ title: e.target.value, sectionId: section.sectionId }));
    };
    const initialStepValue: Step = {
        duration: 0,
        position: 0,
        quizId: 0,
        section: undefined,
        sectionId: section.sectionId,
        stepDescription: 'string',
        stepId: 0,
        title: 'string',
        videoUrl: 'string',
        quiz: undefined,
    };
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
                        <Input
                            value={section.title}
                            maxLength={200}
                            onChange={handleOnTitleChange}
                            showCount
                        />
                        <IconButton onClick={() => setIsEdit(false)}>
                            <DoneIcon />
                        </IconButton>
                    </div>
                ) : (
                    <span className="font-medium">{section.title}</span>
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
            <div>
                <div className="mt-4 flex flex-col gap-3">
                    {Array.from({ length: totalSteps }, (_, index) => (
                        <LectureCreator
                            isCreate={index > section.steps.length - 1}
                            step={
                                index > section.steps.length - 1
                                    ? initialStepValue
                                    : section.steps[index]
                            }
                            key={index}
                            position={index + 1}
                        />
                    ))}
                </div>
                <Button
                    className="mt-3 bg-white"
                    icon={<AddIcon />}
                    onClick={() => setTotalStep(totalSteps + 1)}
                >
                    Thêm bài học
                </Button>
            </div>
        </div>
    );
};

export default SectionCreator;
