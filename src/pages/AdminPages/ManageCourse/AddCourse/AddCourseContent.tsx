import { StepProps, Steps } from 'antd';
import { useState } from 'react';

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
        <div>
            <div className="h-full w-fit">
                <Steps
                    type="default"
                    className="h-[600px]"
                    current={current}
                    onChange={onStepChange}
                    direction="vertical"
                    size="small"
                    items={totalSteps}
                />
            </div>
        </div>
    );
};

export default AddCourseContent;
