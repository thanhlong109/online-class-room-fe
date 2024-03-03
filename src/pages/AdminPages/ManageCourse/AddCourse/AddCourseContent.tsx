import { Paper } from '@mui/material';
import { Steps } from 'antd';
import { UploadFileCustom } from '../../../../components';
import { UploadFileType } from '../../../../components/UploadFile/UploadFileCustom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import Curriculum from './Curriculum/Curriculum';
import { setCourseContentCurrent, setCourseCreatedData } from '../../../../slices/courseSlice';
import { useUpdateCourseMutation } from '../../../../services/course.services';
import { UpdateCourseRequest } from '../../../../types/Course.type';
import { useEffect } from 'react';

const AddCourseContent = () => {
    const dispatch = useDispatch();
    const [updatecourse, { isSuccess: isUpdateSuccess, isLoading: isUpdateLoading, data }] =
        useUpdateCourseMutation();
    const addCourseState = useSelector((state: RootState) => state.course.addCourse);
    const courseCreatedData = addCourseState.courseCreatedData;
    const current = addCourseState.navStatus.findIndex((value) => value.status === 'process');
    const totalSteps = addCourseState.navStatus;
    const onStepChange = (value: number) => {
        dispatch(setCourseContentCurrent(value));
    };

    const handleOnUploadThumbnailSuccess = (dowloadUrl: string) => {
        if (courseCreatedData.courseId) {
            var udpateCourseData: UpdateCourseRequest = {
                ...addCourseState.data,
                imageUrl: dowloadUrl,
                courseId: courseCreatedData.courseId,
                videoPreviewUrl: courseCreatedData.videoPreviewUrl,
            };
            updatecourse(udpateCourseData);
        }
    };
    const handleOnUploadVideoPreviewSuccess = (dowloadUrl: string) => {
        if (courseCreatedData.courseId) {
            var udpateCourseData: UpdateCourseRequest = {
                ...addCourseState.data,
                imageUrl: courseCreatedData.imageUrl,
                videoPreviewUrl: dowloadUrl,
                courseId: courseCreatedData.courseId,
            };
            updatecourse(udpateCourseData);
        }
    };

    useEffect(() => {
        if (isUpdateSuccess && data) {
            dispatch(setCourseCreatedData(data));
        }
    }, [isUpdateSuccess]);
    return (
        <div className="flex ">
            <div className="h-full w-fit">
                <Steps
                    type="default"
                    className="min-h-[600px]"
                    current={current}
                    onChange={onStepChange}
                    direction="vertical"
                    size="small"
                    items={totalSteps}
                />
            </div>
            <div className="p-x-4 p-y-2 ml-4 flex-1">
                <Paper elevation={1} className="h-full p-6">
                    {current === 0 && (
                        <div>
                            <p className="text-xl font-bold text-[#1677ff]">
                                Thêm Thumbnail cho video
                            </p>
                            <div>
                                <UploadFileCustom
                                    onUploadFileSuccess={handleOnUploadThumbnailSuccess}
                                    onUploadFileError={(e) => console.log(e)}
                                    fileName={`course${addCourseState.courseCreatedData.courseId}`}
                                    fileType={UploadFileType.IMAGE}
                                    showPreview
                                    storePath="images/courseThumbnail/"
                                    buttonText="Lưu"
                                />
                            </div>
                            <p className="mb-6 mt-12 text-xl font-bold text-[#1677ff]">
                                Thêm video video giới thiệu ngắn cho khóa học
                            </p>
                            <div>
                                <UploadFileCustom
                                    onUploadFileSuccess={handleOnUploadVideoPreviewSuccess}
                                    onUploadFileError={(e) => console.log(e)}
                                    fileName={`course${addCourseState.courseCreatedData.courseId}`}
                                    fileType={UploadFileType.VIDEO}
                                    showPreview
                                    storePath="videos/coursesPreview/"
                                    buttonText="Lưu"
                                    isLoading={isUpdateLoading}
                                />
                            </div>
                        </div>
                    )}
                    {current === 1 && <Curriculum />}
                </Paper>
            </div>
        </div>
    );
};

export default AddCourseContent;
