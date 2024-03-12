import { useDispatch, useSelector } from 'react-redux';
import { EditableText } from '../../../../components';
import { RootState } from '../../../../store';
import { setCoursePrice, setCoursePublish, setSalesCampaign } from '../../../../slices/courseSlice';
import { useState } from 'react';
import { formatNumberWithCommas } from '../../../../utils/NumberFormater';
import { Checkbox, Slider, SliderSingleProps } from 'antd';

const minPrice = 0;

const marks: SliderSingleProps['marks'] = {
    0: '0%',
    25: {
        style: { color: '#ffbf00' },
        label: <strong>25%</strong>,
    },
    50: {
        style: { color: '#ff8f00' },
        label: <strong>50%</strong>,
    },
    75: {
        style: { color: '#f50' },
        label: <strong>75%</strong>,
    },
    100: {
        style: { color: '#f00' },
        label: <strong>100%</strong>,
    },
};

const Publication = () => {
    const dispatch = useDispatch();
    const courseCreatedData = useSelector(
        (state: RootState) => state.course.addCourse.courseCreatedData,
    );
    const [isError, setIsError] = useState(false);

    return (
        <div>
            <p className="text-xl font-bold text-[#1677ff]">Xuất bản khóa học</p>
            <div className="mt-8 flex flex-col gap-8 bg-[#f7f9fa] px-4 pb-10 pt-6">
                <div className="flex items-center gap-4">
                    <p className="text-base font-medium text-[#1677ff]">Mức giá cho khóa học:</p>
                    <EditableText
                        value={courseCreatedData.price}
                        displayValue={
                            courseCreatedData.price === 0
                                ? 'Miễn Phí'
                                : formatNumberWithCommas(courseCreatedData.price) + ' VND'
                        }
                        textCSS="font-medium"
                        type="number"
                        onDoneClick={() => console.log('done')}
                        onChage={(e) => {
                            if (typeof e === 'number') {
                                dispatch(setCoursePrice(e));
                                if (e < minPrice) {
                                    setIsError(true);
                                } else {
                                    setIsError(false);
                                }
                            }
                        }}
                        isError={isError}
                        errorMessage="Giá tiền không hợp lệ!"
                    />
                </div>
                <div>
                    <div className="flex items-center gap-4">
                        <p className="text-base font-medium text-[#1677ff]">Khuyến mãi:</p>
                        <span className="font-medium">
                            {Math.round(courseCreatedData.salesCampaign * 100)}%
                        </span>
                    </div>
                    <div className="flex-1">
                        <Slider
                            className="max-w-[500px]"
                            defaultValue={courseCreatedData.salesCampaign * 100}
                            marks={marks}
                            step={1}
                            min={0}
                            max={100}
                            onChange={(value) => dispatch(setSalesCampaign(value / 100))}
                        />
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-4">
                        <p className="text-base font-medium text-[#1677ff]">Xuất bản khóa học:</p>
                        <span className="font-medium">
                            <Checkbox
                                checked={courseCreatedData.isPublic}
                                onChange={(e) => dispatch(setCoursePublish(e.target.checked))}
                            >
                                Hiển thị khóa học này với mọi người?
                            </Checkbox>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Publication;
