import { Button, CircularProgress } from '@mui/material';
import { Input, Skeleton, StepProps, Steps, Tag, message } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import {
    CouseMode,
    addCourseSection,
    setAddCourse,
    setCourseCreatedData,
    setCourseMode,
} from '../../../../slices/courseSlice';
import { MultipleInput, RichTextEditor } from '../../../../components';
import CourseContent from './CourseContent';
import { useAddNewCourseMutation } from '../../../../services/course.services';
import { useAddSectionMutation } from '../../../../services/section.services';
import { useGetCategoryQuery } from '../../../../services/categoryService';
import { CategoryRespone } from '../../../../types/Course.type';

const totalSteps: StepProps[] = [
    { title: 'Tiêu đề' },
    { title: 'Mô tả tổng quan' },
    { title: 'Thể loại' },
    { title: 'Mục tiêu học tập' },
];

const { CheckableTag } = Tag;

const AddCoursePage = () => {
    const dispatch = useDispatch();
    const {
        isLoading: isGetCategoryLoading,
        isSuccess: isGetCategorySuccess,
        data: getCategoryData,
    } = useGetCategoryQuery();
    const [tagsData, setTagsData] = useState<CategoryRespone[]>([]);
    const addCourseState = useSelector((state: RootState) => state.course.addCourse);
    const [addCourseMutation, { isLoading, isSuccess, data }] = useAddNewCourseMutation();
    const [addSection, { isSuccess: isAddSectionSuccess, data: sectionData }] =
        useAddSectionMutation();
    const addCourseData = addCourseState.data;
    const addCourseStep = addCourseState.currentStep;
    const [currentStep, setCurrentStep] = useState(addCourseStep);

    useEffect(() => {
        if (isSuccess && data) {
            dispatch(setCourseCreatedData(data));
            addSection({ courseId: data.courseId, title: 'Giới thiệu khóa học', position: 1 });
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isGetCategorySuccess && getCategoryData) {
            setTagsData([...getCategoryData]);
        }
    }, [isGetCategorySuccess]);

    useEffect(() => {
        dispatch(setCourseMode(CouseMode.CREATE));
    }, []);

    useEffect(() => {
        if (isAddSectionSuccess && sectionData) {
            console.log(sectionData);
            dispatch(addCourseSection(sectionData));
            next();
            dispatch(
                setAddCourse({
                    currentStep: currentStep + 1,
                    data: { ...addCourseData },
                }),
            );
            message.success('Tạo khóa học thành công!');
        }
    }, [isAddSectionSuccess]);

    const next = () => {
        setCurrentStep(currentStep + 1);
    };
    const selectedTags = addCourseData.categoryList;
    const handleTagChange = (tagid: number, checked: boolean) => {
        const nextSelectedTags = checked
            ? [...selectedTags, tagid]
            : selectedTags.filter((t) => t !== tagid);
        dispatch(
            setAddCourse({
                data: { ...addCourseData, categoryList: nextSelectedTags },
                currentStep: currentStep,
            }),
        );
    };
    const prev = () => {
        setCurrentStep(currentStep - 1);
    };
    const handleCreateCourseClick = () => {
        addCourseMutation(addCourseState.data);
    };
    return (
        <div>
            {!(currentStep === 4) && (
                <div>
                    <Steps size="small" current={currentStep} items={totalSteps} />
                    <div className="mt-12 text-center">
                        {currentStep === 0 && (
                            <>
                                <p className="text-2xl font-medium">
                                    Đặt một tiêu đề hay cho khóa học của bạn?
                                </p>
                                <p className="mt-3 text-base">
                                    Sẽ ổn nếu bạn không nghĩ được một tiêu đề hay ngay bây giờ. Bạn
                                    có thể thay đổi nó sau!.
                                </p>
                                <Input
                                    onChange={(e) =>
                                        dispatch(
                                            setAddCourse({
                                                data: { ...addCourseData, title: e.target.value },
                                                currentStep: currentStep,
                                            }),
                                        )
                                    }
                                    value={addCourseData.title}
                                    maxLength={60}
                                    showCount
                                    size="large"
                                    className="mt-10 !max-w-[500px]"
                                    placeholder="vd: Lập trình cơ bản cho người mới bắt đầu"
                                />
                            </>
                        )}
                        {currentStep === 1 && (
                            <>
                                <p className="text-2xl font-medium">Mô tả tổng quan về khóa học</p>
                                <p className="mt-3 text-base">
                                    Một phần mô tả ngắn gọn về nội dung chính của khóa học
                                </p>
                                <RichTextEditor
                                    initialValue={addCourseData.description}
                                    onChange={(value) =>
                                        dispatch(
                                            setAddCourse({
                                                currentStep: currentStep,
                                                data: {
                                                    ...addCourseData,
                                                    description: value,
                                                },
                                            }),
                                        )
                                    }
                                />
                            </>
                        )}
                        {currentStep === 2 && (
                            <>
                                {' '}
                                <p className="text-2xl font-medium">Lĩnh vực liên quan</p>
                                <p className="mt-3 text-base">
                                    Chọn những lĩnh vực mà khóa học của bạn có liên quan
                                </p>
                                {!isGetCategoryLoading && (
                                    <div className="m-auto mt-8 flex max-w-[700px] flex-wrap gap-3">
                                        {tagsData.map(({ catgoryId, name }) => (
                                            <CheckableTag
                                                className="select-none p-1 text-sm"
                                                key={catgoryId}
                                                checked={selectedTags.includes(catgoryId)}
                                                onChange={(checked) =>
                                                    handleTagChange(catgoryId, checked)
                                                }
                                            >
                                                {name}
                                            </CheckableTag>
                                        ))}
                                    </div>
                                )}
                                {isGetCategoryLoading && <Skeleton active />}
                            </>
                        )}
                        {currentStep === 3 && (
                            <>
                                {' '}
                                <p className="text-2xl font-medium">Mục tiêu học tập</p>
                                <p className="mt-3 text-base">
                                    Liệt kê những kiến thức nắm bắt được sau khi hoàn thành khóa học
                                </p>
                                <div className="m-auto mt-10 flex max-w-[500px] flex-col gap-4">
                                    <MultipleInput
                                        maxInputItem={8}
                                        maxLengthInput={160}
                                        seperator="|"
                                        placeholders={[
                                            'vd: Kiến thức OOP',
                                            'vd: Kiến thức về giải mã hóa',
                                            'vd: Kiến thức CSDL cơ bản',
                                        ]}
                                        onDataChange={(data) => {
                                            dispatch(
                                                setAddCourse({
                                                    currentStep: currentStep,
                                                    data: {
                                                        ...addCourseData,
                                                        knowdledgeDescription: data,
                                                    },
                                                }),
                                            );
                                        }}
                                        values={addCourseData.knowdledgeDescription}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                    <div
                        style={{ marginTop: 24 }}
                        className="m-auto flex max-w-[1000px] justify-between"
                    >
                        {currentStep == 0 && <span />}
                        {currentStep > 0 && (
                            <Button
                                className="!normal-case"
                                variant="outlined"
                                style={{ margin: '0 8px' }}
                                onClick={() => prev()}
                            >
                                Quay lại
                            </Button>
                        )}
                        {currentStep < totalSteps.length - 1 && (
                            <Button
                                disabled={
                                    (currentStep === 0 && addCourseData.title === '') ||
                                    (currentStep === 1 && addCourseData.description.length < 150) ||
                                    (currentStep === 2 && selectedTags.length === 0)
                                }
                                className="!normal-case"
                                variant="contained"
                                onClick={() => next()}
                            >
                                Kế tiếp
                            </Button>
                        )}
                        {currentStep === totalSteps.length - 1 && (
                            <Button
                                disabled={
                                    (currentStep === 3 &&
                                        addCourseData.knowdledgeDescription.split('|').length - 1 <
                                            3) ||
                                    isLoading
                                }
                                className="!normal-case"
                                variant="contained"
                                onClick={handleCreateCourseClick}
                            >
                                {isLoading && (
                                    <CircularProgress
                                        color="secondary"
                                        className="!h-[24px] !w-[24px]"
                                        variant="indeterminate"
                                    />
                                )}
                                Hoàn thành
                            </Button>
                        )}
                    </div>
                </div>
            )}
            {currentStep === 4 && <CourseContent />}
        </div>
    );
};

export default AddCoursePage;
