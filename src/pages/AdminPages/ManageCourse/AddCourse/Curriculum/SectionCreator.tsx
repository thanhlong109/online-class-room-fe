import { IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Input, Popconfirm } from 'antd';
import { useDispatch } from 'react-redux';
import {
    addCourseSection,
    setSection,
    setStepList,
    updateSectionId,
} from '../../../../../slices/courseSlice';
import AddIcon from '@mui/icons-material/Add';
import LectureCreator from '../Lecture/LectureCreator';
import { Section, Step } from '../../../../../types/Course.type';
import { Reorder } from 'framer-motion';
import {
    useAddSectionMutation,
    useUpdateSectionMutation,
} from '../../../../../services/section.services';

export interface SectionCreatorProps {
    position: number;
    section: Section;
    isCreate: boolean;
    startStepPosition: number;
}

const SectionCreator = ({
    position,
    section,
    isCreate,
    startStepPosition,
}: SectionCreatorProps) => {
    const dispatch = useDispatch();
    const [tempLable, setTempLable] = useState('');
    const [addSection, { isSuccess: isAddSectionSuccess, data: addSectionRespone }] =
        useAddSectionMutation();
    const [updateSection, { isSuccess: isUpdateSectionSuccess, data: updateSectionRespone }] =
        useUpdateSectionMutation();
    const [isCreateFirst, setIsCreateFirst] = useState(isCreate);
    const [isHovered, setIsHovered] = useState(false);
    const [isEdit, setIsEdit] = useState(isCreate);
    const handleOnRemoveClick = () => {};
    const [isProgressAdd, setIsProgressAdd] = useState(false);
    const handleOnTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isCreateFirst) {
            setTempLable(e.target.value);
        } else {
            dispatch(updateSectionId({ title: e.target.value, sectionId: section.sectionId }));
        }
    };
    const [steps, setSteps] = useState(section.steps);
    useEffect(() => {
        setSteps(section.steps);
    }, [section]);

    const initialStepValue: Step = {
        duration: 0,
        position: 0,
        quizId: 1,
        section: undefined,
        sectionId: section.sectionId,
        stepDescription: 'string',
        stepId: -1,
        title: 'string',
        videoUrl: 'string',
        quiz: undefined,
    };

    const handleOnClickDone = () => {
        if (isCreateFirst) {
            addSection({ courseId: section.courseId, position: position, title: tempLable });
        } else {
            updateSection({
                position: position,
                sectionId: section.sectionId,
                title: section.title,
            });
        }
        setIsEdit(false);
    };

    useEffect(() => {
        if (isAddSectionSuccess && addSectionRespone) {
            dispatch(addCourseSection(addSectionRespone));
            //dispatch(setSection(addSectionRespone));
            setIsCreateFirst(false);
            setIsEdit(false);
        }
    }, [isAddSectionSuccess]);

    useEffect(() => {
        if (isUpdateSectionSuccess && updateSectionRespone) {
            dispatch(setSection(updateSectionRespone));
            setIsEdit(false);
        }
    }, [isUpdateSectionSuccess]);

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
                            value={isCreateFirst ? tempLable : section.title}
                            maxLength={200}
                            onChange={handleOnTitleChange}
                            showCount
                        />
                        <IconButton onClick={() => handleOnClickDone()}>
                            <DoneIcon />
                        </IconButton>
                    </div>
                ) : (
                    <span className="text-base font-medium">{section.title}</span>
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
                                color="info"
                            >
                                <CreateIcon />
                            </IconButton>
                            <Popconfirm
                                title="Xác nhận xóa"
                                description="Bạn có chắc là muốn xóa ? toàn bộ nội dung trong chương này sẽ bị mất!"
                                onConfirm={() => {}}
                                onCancel={() => {}}
                                okText="Yes"
                                cancelText="No"
                                okButtonProps={{ style: { background: '#d32f2f' } }}
                            >
                                <IconButton
                                    disabled={!isHovered}
                                    onClick={handleOnRemoveClick}
                                    color="error"
                                    size="small"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Popconfirm>
                        </motion.div>
                    </div>
                )}
            </div>
            <div>
                <div className="mt-4 flex flex-col gap-3">
                    <Reorder.Group
                        values={steps}
                        onReorder={(arr) => {
                            const sortedArr = JSON.parse(JSON.stringify(arr));
                            arr.forEach((_, index) => {
                                sortedArr[index].position = index + startStepPosition + 1;
                            });
                            setSteps(sortedArr);
                        }}
                    >
                        {steps.map((item, index) => (
                            <Reorder.Item
                                key={item.stepId}
                                value={item}
                                onDragEnd={() =>
                                    dispatch(
                                        setStepList({ sectionId: section.sectionId, steps: steps }),
                                    )
                                }
                                className="m-4 active:cursor-move"
                            >
                                <LectureCreator
                                    isCreate={item.stepId === -1}
                                    step={item}
                                    position={index + startStepPosition + 1}
                                />
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                </div>
                {!isProgressAdd && (
                    <Button
                        className="mt-3 bg-white"
                        icon={<AddIcon />}
                        onClick={() => {
                            setSteps([...steps, initialStepValue]);
                            setIsProgressAdd(true);
                        }}
                    >
                        Thêm bài học
                    </Button>
                )}
            </div>
        </div>
    );
};

export default SectionCreator;
