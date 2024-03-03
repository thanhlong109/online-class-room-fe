import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Input } from 'antd';
import { IconButton } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import LectureContentType, { LectureType } from './LectureContentType';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ArticleIcon from '@mui/icons-material/Article';
import CloseIcon from '@mui/icons-material/Close';
import { useAddStepMutation } from '../../../../../services/step.services';
import { useDispatch } from 'react-redux';
import { addCourseStep, setStep, updateStepTitle } from '../../../../../slices/courseSlice';

interface LectureProps {
    position: number;
    lable: string;
    isCreate: boolean;
    sectionId: number;
    stepId: number;
}

export enum LectureState {
    DEFAULT,
    SELECT_CONTENT,
    SELECTED_CONTENT,
}

const LectureCreator = ({ lable, position, isCreate, sectionId, stepId }: LectureProps) => {
    const dispatch = useDispatch();
    const [isCreateFirst, setIsCreateFirst] = useState(isCreate);
    const [tempLable, setTempLable] = useState('');
    const [addStepMutation, { isSuccess, isLoading, data }] = useAddStepMutation();
    const [isEdit, setIsEdit] = useState(isCreate);
    const [isHovered, setIsHovered] = useState(false);
    const [lectureState, setLectureState] = useState(LectureState.DEFAULT);
    const [lectureSelectedType, setLectureSelectedType] = useState(LectureType.VIDEO);
    const handleOnRemoveClick = () => {};
    const handleOnClickDone = () => {
        if (isCreateFirst) {
            addStepMutation({
                duration: 0,
                position: position,
                sectionId: sectionId,
                stepDescription: 'string',
                title: tempLable,
                videoUrl: 'string',
            });
            setIsCreateFirst(false);
        } else {
            setIsEdit(false);
        }
    };

    const handleOnTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isCreateFirst) {
            setTempLable(e.target.value);
        } else {
            dispatch(updateStepTitle({ sectionId, stepId, title: e.target.value }));
        }
    };

    useEffect(() => {
        if (isSuccess && data) {
            dispatch(addCourseStep(data));
            dispatch(setStep(data));
            setIsEdit(false);
        }
    }, [isSuccess]);

    const handleOnSelectLectureType = (lectureSelectedType: LectureType) => {
        setLectureSelectedType(lectureSelectedType);
        setLectureState(LectureState.SELECTED_CONTENT);
    };
    return (
        <div>
            <div className="border-[1px] border-[#c3c4c4] bg-[#ffffff]">
                <div
                    className="flex items-center justify-between gap-4  px-4 py-2"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="flex items-center gap-4">
                        <p className="text-base font-medium">Bài {position}: </p>
                        {isEdit ? (
                            <div className="flex items-center gap-4 font-medium">
                                <Input
                                    minLength={6}
                                    onChange={handleOnTitleChange}
                                    value={isCreateFirst ? tempLable : lable}
                                    maxLength={200}
                                    showCount
                                />
                                <IconButton onClick={handleOnClickDone}>
                                    <DoneIcon />
                                </IconButton>
                            </div>
                        ) : (
                            <span className="">{' ' + lable}</span>
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
                                        <CreateIcon className="!text-xl" />
                                    </IconButton>
                                    <IconButton
                                        disabled={!isHovered}
                                        onClick={handleOnRemoveClick}
                                        size="small"
                                    >
                                        <DeleteIcon className="!text-xl" />
                                    </IconButton>
                                </motion.div>
                            </div>
                        )}
                    </div>
                    <div>
                        {lectureState === LectureState.DEFAULT && (
                            <Button
                                icon={<AddIcon />}
                                onClick={() => setLectureState(LectureState.SELECT_CONTENT)}
                            >
                                Thêm nội dung
                            </Button>
                        )}
                    </div>
                </div>
                <div>
                    {LectureState.SELECT_CONTENT === lectureState && (
                        <div className="relative border-t-[1px] border-[#c3c4c4] bg-[#ffffff] px-4 py-4">
                            <div className="absolute right-4 top-0 flex h-8 w-fit translate-y-[-100%] items-center justify-end  gap-2 border-x-[1px] border-t-[1px] border-[#c3c4c4] bg-white px-2">
                                <p className="text-sm">Lựa chọn loại nội dung</p>
                                <IconButton
                                    size="small"
                                    onClick={() => setLectureState(LectureState.DEFAULT)}
                                >
                                    <CloseIcon className="!text-base" />
                                </IconButton>
                            </div>
                            <p className="text-center">
                                Lựa chọn loại nội dung chính trong bài học này:
                            </p>
                            <div className="mt-2 flex items-center justify-center gap-8">
                                <LectureContentType
                                    onSelect={handleOnSelectLectureType}
                                    icon={<PlayCircleIcon />}
                                    lectureType={LectureType.VIDEO}
                                    lable="Video"
                                />
                                <LectureContentType
                                    onSelect={handleOnSelectLectureType}
                                    icon={<ArticleIcon />}
                                    lectureType={LectureType.QUIZZ}
                                    lable="Quiz"
                                />
                            </div>
                        </div>
                    )}
                    {LectureState.SELECTED_CONTENT === lectureState &&
                        lectureSelectedType === LectureType.VIDEO && <div>video</div>}
                    {LectureState.SELECTED_CONTENT === lectureState &&
                        lectureSelectedType === LectureType.QUIZZ && <div>Quiz</div>}
                </div>
            </div>
        </div>
    );
};

export default LectureCreator;
