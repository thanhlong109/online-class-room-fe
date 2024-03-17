import { useDispatch, useSelector } from 'react-redux';
import { UploadFileCustom, Video } from '../../../../../components';
import { UploadFileType, UploadStyle } from '../../../../../components/UploadFile/UploadFileCustom';
import { RootState } from '../../../../../store';
import { Step } from '../../../../../types/Course.type';
import { useUpdateStepMutation } from '../../../../../services/step.services';
import { useEffect, useState } from 'react';
import { setStep } from '../../../../../slices/courseSlice';
import CreateIcon from '@mui/icons-material/Create';
import { Button, CircularProgress } from '@mui/material';
import { deleteFile } from '../../../../../utils/FirebaseUtils';
import DeleteIcon from '@mui/icons-material/Delete';
import { Popconfirm, message } from 'antd';

interface LectureVideoContentProps {
    step: Step;
}

const LectureVideoContent = ({ step }: LectureVideoContentProps) => {
    const dispatch = useDispatch();
    const { stepId, sectionId, duration, position, quizId, title, stepDescription } = step;
    const courseId = useSelector(
        (state: RootState) => state.course.addCourse.courseCreatedData.courseId,
    );
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [updateStepMutation, { isSuccess, data }] = useUpdateStepMutation();
    const onUploadFileSuccess = (url: string, duration?: number) => {
        updateStepMutation({
            duration: duration ? Math.ceil(duration) : 0,
            position,
            quizId,
            stepDescription,
            stepId,
            title,
            videoUrl: url,
        });
        setIsLoadingDelete(false);
    };
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        if (isSuccess && data) {
            dispatch(setStep(data));
            setIsUpdate(false);
        }
    }, [isSuccess]);
    const fileName = `lecture-${stepId}`;
    const storagePath = `videos/courses/course-${courseId}/section-${sectionId}/`;
    const handleOnDeleteSuccess = () => {
        updateStepMutation({
            duration,
            position,
            quizId,
            stepDescription,
            stepId,
            title,
            videoUrl: 'string',
        });
        message.success('Xóa video thành công!');
    };
    const onConfirmDelete = () => {
        deleteFile(storagePath + fileName, handleOnDeleteSuccess, (e) => {
            console.log(e.message);
        });
    };
    return (
        <div className="p-4">
            {(step.videoUrl.length < 10 || isUpdate) && (
                <div className="flex">
                    <div className="flex-1">
                        <UploadFileCustom
                            fileName={fileName}
                            fileType={UploadFileType.VIDEO}
                            onUploadFileError={(e) => {
                                console.log(e);
                            }}
                            onUploadFileSuccess={onUploadFileSuccess}
                            storePath={storagePath}
                            uploadStyle={UploadStyle.SMALL}
                            showPreview={false}
                        />
                    </div>
                    {isUpdate && (
                        <Button
                            variant="contained"
                            className="!bg-[#333]"
                            onClick={() => setIsUpdate(false)}
                        >
                            Hủy
                        </Button>
                    )}
                </div>
            )}

            {step.videoUrl.length > 10 && !isUpdate && (
                <div className="flex gap-4">
                    <div className="max-w-[600px]">
                        <Video src={step.videoUrl} />
                    </div>
                    <div className="flex flex-col gap-4">
                        <Button
                            variant="outlined"
                            startIcon={<CreateIcon />}
                            onClick={() => setIsUpdate(true)}
                        >
                            Chỉnh sửa
                        </Button>

                        <Popconfirm
                            title="Xác nhận xóa"
                            description="Bạn có chắc là muốn xóa video này?"
                            onConfirm={onConfirmDelete}
                            onCancel={() => {}}
                            okText="Yes"
                            cancelText="No"
                            okButtonProps={{ style: { background: '#d32f2f' } }}
                        >
                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={isLoadingDelete ? <CircularProgress /> : <DeleteIcon />}
                                disabled={isLoadingDelete}
                            >
                                Xóa
                            </Button>
                        </Popconfirm>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LectureVideoContent;
