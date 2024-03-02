import { useState } from 'react';
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

interface LectureProps {
    position: number;
    lable: string;
}

export enum LectureState {
    DEFAULT,
    SELECT_CONTENT,
    SELECTED_CONTENT,
}

const LectureCreator = ({ lable, position }: LectureProps) => {
    const [lectureLable, setLectureLable] = useState(lable);
    const [isEdit, setIsEdit] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [lectureState, setLectureState] = useState(LectureState.DEFAULT);
    const [lectureSelectedType, setLectureSelectedType] = useState(LectureType.VIDEO);
    const handleOnRemoveClick = () => {};
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
                                <Input value={lectureLable} maxLength={200} showCount />
                                <IconButton>
                                    <DoneIcon />
                                </IconButton>
                            </div>
                        ) : (
                            <span className="">{' ' + lectureLable}</span>
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
                        <div className="border-t-[1px] border-[#c3c4c4] bg-[#ffffff] px-4 py-4">
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
