import { Paper } from '@mui/material';
import { Steps } from 'antd';
import { UploadFileCustom } from '../../../../components';
import { UploadFileType } from '../../../../components/UploadFile/UploadFileCustom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import Curriculum from './Curriculum/Curriculum';
import { setAddCourse, setCourseContentCurrent } from '../../../../slices/courseSlice';

const AddCourseContent = () => {
    const dispatch = useDispatch();

    const addCourseState = useSelector((state: RootState) => state.course.addCourse);
    const current = addCourseState.navStatus.findIndex((value) => value.status === 'process');
    const totalSteps = addCourseState.navStatus;
    const onStepChange = (value: number) => {
        dispatch(setCourseContentCurrent(value));
    };
    const handleOnUploadThumbnailSuccess = (dowloadUrl: string) => {
        console.log(dowloadUrl);
        dispatch(
            setAddCourse({
                ...addCourseState,
                data: { ...addCourseState.data, imageUrl: dowloadUrl },
            }),
        );
    };
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
                                    fileName={`course${'id'}`}
                                    fileType={UploadFileType.VIDEO}
                                    showPreview
                                    storePath="images/courseThumbnail/"
                                    buttonText="Upload"
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
