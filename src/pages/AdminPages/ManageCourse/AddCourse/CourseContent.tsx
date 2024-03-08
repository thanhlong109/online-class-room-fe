import { Paper } from '@mui/material';
import { Input, Steps } from 'antd';
import { UploadFileCustom } from '../../../../components';
import { UploadFileType } from '../../../../components/UploadFile/UploadFileCustom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import Curriculum from './Curriculum/Curriculum';
import {
    CouseMode,
    setCourseContentCurrent,
    setCourseCreatedData,
    updateCourseImageUrl,
    updateCoursePreviewUrl,
} from '../../../../slices/courseSlice';
import { useUpdateCourseMutation } from '../../../../services/course.services';
import { UpdateCourseRequest } from '../../../../types/Course.type';
import { useEffect } from 'react';

const CourseContent = () => {
    const dispatch = useDispatch();
    const [updatecourse, { isSuccess: isUpdateSuccess, isLoading: isUpdateLoading, data }] =
        useUpdateCourseMutation();
    const addCourseState = useSelector((state: RootState) => state.course.addCourse);
    const currentMode = useSelector((state: RootState) => state.course.currentMode);
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
            dispatch(updateCourseImageUrl(data.imageUrl));
            dispatch(updateCoursePreviewUrl(data.videoPreviewUrl));
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
                    {currentMode === CouseMode.UPDATE && current === 0 && (
                        <div>
                            <p className="text-xl font-bold text-[#1677ff]">Thông Tin cơ bản</p>
                            <div>
                                <p>Tiêu đề khóa học:</p>
                                <div></div>
                            </div>

                            <Input
                                className="text-base"
                                onChange={(e) =>
                                    dispatch(
                                        setCourseCreatedData({
                                            ...addCourseState.courseCreatedData,
                                            title: e.target.value,
                                        }),
                                    )
                                }
                            />
                        </div>
                    )}

                    {((currentMode === CouseMode.CREATE && current === 0) ||
                        (currentMode === CouseMode.UPDATE && current === 1)) && (
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
                                    imgLink={courseCreatedData.imageUrl}
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
                                    imgLink={courseCreatedData.videoPreviewUrl}
                                    buttonText="Lưu"
                                    isLoading={isUpdateLoading}
                                />
                            </div>
                        </div>
                    )}
                    {((currentMode === CouseMode.CREATE && current === 1) ||
                        (currentMode === CouseMode.UPDATE && current === 2)) && <Curriculum />}
                </Paper>
            </div>
        </div>
    );
};

export default CourseContent;
