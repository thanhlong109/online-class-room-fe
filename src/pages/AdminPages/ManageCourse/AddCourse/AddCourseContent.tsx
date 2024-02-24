import { Paper } from '@mui/material';
import { StepProps, Steps } from 'antd';
import { useState } from 'react';
import { UploadFileCustom } from '../../../../components';
import { UploadFileType } from '../../../../components/UploadFile/UploadFileCustom';

const totalSteps: StepProps[] = [
    { title: 'Hiển thị' },
    { title: 'Chu trình học', status: 'finish' },
    { title: 'Thể loại' },
    { title: 'Mục tiêu học tập', status: 'finish' },
];

const AddCourseContent = () => {
    const [current, setCurrent] = useState(0);
    const onStepChange = (value: number) => {
        setCurrent(value);
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
                                    onUploadFileSuccess={(url) => console.log(url)}
                                    onUploadFileError={(e) => console.log(e)}
                                    fileName="fileTest"
                                    fileType={UploadFileType.IMAGE}
                                    showPreview
                                    storePath="images/test/"
                                />
                            </div>
                        </div>
                    )}
                </Paper>
            </div>
        </div>
    );
};

export default AddCourseContent;
