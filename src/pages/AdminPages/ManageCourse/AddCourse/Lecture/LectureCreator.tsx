import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Input } from 'antd';
import { CircularProgress, IconButton } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import LectureContentType, { LectureType } from './LectureContentType';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ArticleIcon from '@mui/icons-material/Article';
import CloseIcon from '@mui/icons-material/Close';
import { useAddStepMutation, useUpdateStepMutation } from '../../../../../services/step.services';
import { useDispatch } from 'react-redux';
import { addCourseStep, setStep, updateStepTitle } from '../../../../../slices/courseSlice';
import LectureVideoContent from './LectureVideoContent';
import LectureQuizzContent from './LectureQuizzContent';
import { Step } from '../../../../../types/Course.type';
import { Button as MuiButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { RichTextEditor } from '../../../../../components';

interface LectureProps {
    position: number;
    isCreate: boolean;
    step?: Step | null;
}

export enum LectureState {
    DEFAULT,
    SELECT_CONTENT,
    SELECTED_CONTENT,
    COLLAPSE_CONTENT,
}

const LectureCreator = ({ position, isCreate, step = null }: LectureProps) => {
    const dispatch = useDispatch();

    const [isCreateFirst, setIsCreateFirst] = useState(isCreate);
    const [tempLable, setTempLable] = useState('');
    const [addStepMutation, { isSuccess, isLoading, data }] = useAddStepMutation();
    const [
        updateStepMutation,
        { isSuccess: isUpdateSucess, isLoading: isUpdateLoading, data: updateData },
    ] = useUpdateStepMutation();
    const [isEdit, setIsEdit] = useState(isCreate);
    const [isHovered, setIsHovered] = useState(false);
    const [lectureState, setLectureState] = useState(LectureState.DEFAULT);
    const [lectureSelectedType, setLectureSelectedType] = useState(LectureType.VIDEO);
    const [isAddDescription, setIsAddDescription] = useState(false);
    const handleOnRemoveClick = () => {};
    const handleOnClickDone = () => {
        if (isCreateFirst) {
            addStepMutation({
                duration: 0,
                position: position,
                quizId: 1,
                sectionId: step!.sectionId,
                stepDescription: 'string',
                title: tempLable,
                videoUrl: 'string',
            });
        } else {
            updateStepMutation({
                duration: step!.duration,
                position: position,
                quizId: step!.quizId,
                stepDescription: step!.stepDescription,
                stepId: step!.stepId,
                title: step!.title,
                videoUrl: step!.videoUrl,
            });
        }
    };

    useEffect(() => {
        if (step?.quizId && step?.videoUrl) {
            if (step.quizId != 1) {
                setLectureSelectedType(LectureType.QUIZZ);
                setLectureState(LectureState.COLLAPSE_CONTENT);
            } else if (step.videoUrl.length > 10) {
                setLectureSelectedType(LectureType.VIDEO);
                setLectureState(LectureState.COLLAPSE_CONTENT);
            } else {
                setLectureState(LectureState.DEFAULT);
            }
        }
    }, [step]);

    const handleOnTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isCreateFirst) {
            setTempLable(e.target.value);
        } else {
            if (step?.stepId && step.sectionId) {
                dispatch(
                    updateStepTitle({
                        sectionId: step.sectionId,
                        stepId: step.stepId,
                        title: e.target.value,
                    }),
                );
            }
        }
    };

    useEffect(() => {
        if (isSuccess && data) {
            dispatch(addCourseStep(data));
            dispatch(setStep(data));
            setIsCreateFirst(false);
            setIsEdit(false);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isUpdateSucess && updateData) {
            dispatch(setStep(updateData));
            setIsEdit(false);
        }
    }, [isUpdateSucess]);

    const handleOnSelectLectureType = (lectureSelectedType: LectureType) => {
        setLectureSelectedType(lectureSelectedType);
        setLectureState(LectureState.SELECTED_CONTENT);
    };

    const handleOnCloseLecture = () => {
        switch (lectureState) {
            case LectureState.SELECT_CONTENT: {
                setLectureState(LectureState.DEFAULT);
                break;
            }
            case LectureState.SELECTED_CONTENT: {
                if (step?.quizId != 1) {
                    setLectureSelectedType(LectureType.QUIZZ);
                    setLectureState(LectureState.COLLAPSE_CONTENT);
                } else if (step?.videoUrl.length > 10) {
                    setLectureSelectedType(LectureType.VIDEO);
                    setLectureState(LectureState.COLLAPSE_CONTENT);
                } else {
                    setLectureState(LectureState.DEFAULT);
                }
                break;
            }
        }
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
                                    value={isCreateFirst ? tempLable : step?.title}
                                    maxLength={200}
                                    showCount
                                />
                                <IconButton
                                    disabled={isLoading || isUpdateLoading}
                                    onClick={handleOnClickDone}
                                >
                                    {!isLoading && !isUpdateLoading && <DoneIcon />}
                                    {isLoading ||
                                        (isUpdateLoading && (
                                            <CircularProgress className="!h-[18px] !w-[18px]" />
                                        ))}
                                </IconButton>
                            </div>
                        ) : (
                            <span className="">{' ' + step?.title}</span>
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
                        {lectureState === LectureState.COLLAPSE_CONTENT && (
                            <MuiButton
                                variant="outlined"
                                startIcon={<CheckCircleIcon />}
                                className="!border-[#333] !text-[#333]"
                                onClick={() => setLectureState(LectureState.SELECTED_CONTENT)}
                            >
                                {lectureSelectedType === LectureType.VIDEO ? 'Video' : 'Quizz'}
                            </MuiButton>
                        )}
                    </div>
                </div>
                <div>
                    {lectureState != LectureState.DEFAULT &&
                        lectureState != LectureState.COLLAPSE_CONTENT && (
                            <div className="relative border-t-[1px] border-[#c3c4c4] bg-[#ffffff] px-4 py-4">
                                <div className="absolute right-4 top-0 flex h-8 w-fit translate-y-[-100%] items-center justify-end  gap-2 border-x-[1px] border-t-[1px] border-[#c3c4c4] bg-white px-2">
                                    {LectureState.SELECT_CONTENT === lectureState && (
                                        <p className="text-sm">Lựa chọn loại nội dung</p>
                                    )}
                                    {LectureState.SELECTED_CONTENT === lectureState &&
                                        LectureType.QUIZZ === lectureSelectedType && (
                                            <p className="text-sm">Quizz</p>
                                        )}
                                    {LectureState.SELECTED_CONTENT === lectureState &&
                                        LectureType.VIDEO === lectureSelectedType && (
                                            <p className="text-sm">Video</p>
                                        )}
                                    <IconButton size="small" onClick={handleOnCloseLecture}>
                                        <CloseIcon className="!text-base" />
                                    </IconButton>
                                </div>
                                {LectureState.SELECT_CONTENT === lectureState && (
                                    <div>
                                        {' '}
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
                                    lectureSelectedType === LectureType.VIDEO && (
                                        <LectureVideoContent step={step!} />
                                    )}
                                {LectureState.SELECTED_CONTENT === lectureState &&
                                    lectureSelectedType === LectureType.QUIZZ && (
                                        <LectureQuizzContent />
                                    )}
                                {!isAddDescription && (
                                    <div className="flex flex-col gap-4">
                                        <MuiButton
                                            startIcon={<AddIcon />}
                                            variant="outlined"
                                            className="!border-[#333] !text-[#333]"
                                            onClick={() => setIsAddDescription(true)}
                                        >
                                            Thêm miêu tả
                                        </MuiButton>
                                    </div>
                                )}
                                {isAddDescription && (
                                    <RichTextEditor
                                        initialValue=""
                                        onValueChange={(e) => console.log(e)}
                                    />
                                )}
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
};

export default LectureCreator;
