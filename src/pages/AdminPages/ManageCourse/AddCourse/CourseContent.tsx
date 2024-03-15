import { IconButton, Paper } from '@mui/material';
import { Skeleton, Steps, Tag, message } from 'antd';
import {
    EditableText,
    MultipleInput,
    RenderRichText,
    RichTextEditor,
    UploadFileCustom,
} from '../../../../components';
import { UploadFileType } from '../../../../components/UploadFile/UploadFileCustom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import Curriculum from './Curriculum/Curriculum';
import { motion } from 'framer-motion';
import CreateIcon from '@mui/icons-material/Create';

import {
    CouseMode,
    setCourseContentCurrent,
    setCourseCreatedData,
    setCourseDescription,
    setCourseKnowledge,
    setSaveAndQuit,
    updateCourseCategory,
    updateCourseImageUrl,
    updateCoursePreviewUrl,
} from '../../../../slices/courseSlice';
import { useUpdateCourseMutation } from '../../../../services/course.services';
import {
    CategoryRespone,
    CourseCategory,
    UpdateCourseRequest,
} from '../../../../types/Course.type';
import { useEffect, useState } from 'react';
import { useGetCategoryQuery } from '../../../../services/categoryService';
import { LoadingButton } from '@mui/lab';
import Publication from './Publication';
import { useUpdateStepMutation } from '../../../../services/step.services';
import { useNavigate } from 'react-router-dom';

const { CheckableTag } = Tag;

const CourseContent = () => {
    const dispatch = useDispatch();
    const addCourseState = useSelector((state: RootState) => state.course.addCourse);
    const [updateStepMutation, { isLoading: isUpdateStepLoading }] = useUpdateStepMutation();
    const [isSaveAndQuit, setIsSaveAndQuit] = useState(false);
    const navigate = useNavigate();
    ///////////// update course basic infor ///////////////
    const {
        isLoading: isGetCategoryLoading,
        isSuccess: isGetCategorySuccess,
        data: getCategoryData,
    } = useGetCategoryQuery();
    const [tagsData, setTagsData] = useState<CategoryRespone[]>([]);
    const courseCategories = addCourseState.courseCreatedData.courseCategories;
    const handleTagChange = (categoryId: number, checked: boolean) => {
        const category: CourseCategory = {
            categoryId: categoryId,
            courseId: -1,
            courseCategoryId: -1,
        };
        const nextSelectedTags = checked
            ? [...courseCategories, category]
            : courseCategories.filter((c) => c.categoryId !== categoryId);
        dispatch(updateCourseCategory(nextSelectedTags));
    };
    const [isEditDescription, setEditDescription] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const [updatecourse, { isSuccess: isUpdateSuccess, isLoading: isUpdateLoading, data }] =
        useUpdateCourseMutation();

    const currentMode = useSelector((state: RootState) => state.course.currentMode);
    const courseCreatedData = addCourseState.courseCreatedData;
    const current = addCourseState.navStatus.findIndex((value) => value.status === 'process');
    const totalSteps = addCourseState.navStatus;
    const onStepChange = (value: number) => {
        dispatch(setCourseContentCurrent(value));
    };

    const handleOnUploadThumbnailSuccess = (dowloadUrl: string) => {
        if (courseCreatedData.courseId) {
            const data = getUpdateCourseRequest();
            updatecourse({ ...data, imageUrl: dowloadUrl });
        }
    };
    const handleOnUploadVideoPreviewSuccess = (dowloadUrl: string) => {
        if (courseCreatedData.courseId) {
            const data = getUpdateCourseRequest();
            updatecourse({ ...data, videoPreviewUrl: dowloadUrl });
        }
    };

    const getUpdateCourseRequest = (): UpdateCourseRequest => {
        const categoryList = courseCreatedData.courseCategories.map((c) => c.categoryId);
        var udpateCourseData: UpdateCourseRequest = {
            categoryList: categoryList,
            courseId: courseCreatedData.courseId,
            courseIsActive: courseCreatedData.courseIsActive,
            description: courseCreatedData.description,
            imageUrl: courseCreatedData.imageUrl,
            isPublic: courseCreatedData.isPublic,
            knowdledgeDescription: courseCreatedData.knowdledgeDescription,
            linkCertificated: courseCreatedData.linkCertificated,
            price: courseCreatedData.price,
            salesCampaign: courseCreatedData.salesCampaign,
            title: courseCreatedData.title,
            totalDuration: courseCreatedData.totalDuration,
            videoPreviewUrl: courseCreatedData.videoPreviewUrl,
        };
        return udpateCourseData;
    };

    const handleOnSaveAll = () => {
        courseCreatedData.sections.forEach((section) => {
            section.steps.forEach(
                ({ duration, position, quizId, videoUrl, stepDescription, stepId, title }) => {
                    updateStepMutation({
                        duration,
                        position,
                        quizId,
                        videoUrl,
                        stepDescription,
                        stepId,
                        title,
                    });
                },
            );
        });
        const data = getUpdateCourseRequest();
        updatecourse(data);
        setIsSaveAndQuit(true);
    };

    useEffect(() => {
        if (isUpdateSuccess && data) {
            dispatch(updateCourseImageUrl(data.imageUrl));
            dispatch(updateCoursePreviewUrl(data.videoPreviewUrl));
            message.success('Lưu thành công!');
            if (isSaveAndQuit) {
                dispatch(setSaveAndQuit());
                setIsSaveAndQuit(false);
                navigate('/admin/getAllCourse/');
            }
        }
    }, [isUpdateSuccess]);

    useEffect(() => {
        if (isGetCategorySuccess && getCategoryData) {
            setTagsData([...getCategoryData]);
        }
    }, [isGetCategorySuccess]);

    return (
        <div className="flex ">
            <div className="h-full w-fit">
                <div>
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

                <LoadingButton
                    loading={isUpdateLoading || isUpdateStepLoading}
                    className="w-full"
                    onClick={handleOnSaveAll}
                    size="large"
                    variant="contained"
                >
                    Lưu & Quay Lại
                </LoadingButton>
            </div>
            <div className="p-x-4 p-y-2 ml-4 flex-1">
                <Paper elevation={1} className="h-full p-6">
                    {currentMode === CouseMode.UPDATE && current === 0 && (
                        <div className="text-[#333]">
                            <p className="text-xl font-bold text-[#1677ff]">Thông Tin cơ bản</p>
                            <div className="mt-8 flex flex-col gap-8 bg-[#f7f9fa] px-4 py-2">
                                <div className="flex items-center">
                                    <p className="text-base font-medium text-[#1677ff]">
                                        Tiêu đề khóa học:
                                    </p>
                                    <div className="flex-1 px-4">
                                        <EditableText
                                            onChage={(value) =>
                                                dispatch(
                                                    setCourseCreatedData({
                                                        ...addCourseState.courseCreatedData,
                                                        title: value + '',
                                                    }),
                                                )
                                            }
                                            maxLength={60}
                                            onDoneClick={() => {
                                                console.log('click done');
                                            }}
                                            showCount
                                            value={addCourseState.courseCreatedData.title}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-base font-medium text-[#1677ff]">
                                        Thể loại:
                                    </p>
                                    <div className="px-4">
                                        {!isGetCategoryLoading && (
                                            <div className="mt-4 flex flex-wrap gap-3">
                                                {tagsData.map((category) => (
                                                    <CheckableTag
                                                        className="select-none p-1 text-sm"
                                                        key={category.catgoryId}
                                                        checked={
                                                            courseCategories.findIndex(
                                                                (c) =>
                                                                    c.categoryId ===
                                                                    category.catgoryId,
                                                            ) >= 0
                                                        }
                                                        onChange={(checked) =>
                                                            handleTagChange(
                                                                category.catgoryId,
                                                                checked,
                                                            )
                                                        }
                                                    >
                                                        {category.name}
                                                    </CheckableTag>
                                                ))}
                                            </div>
                                        )}
                                        {isGetCategoryLoading && <Skeleton active />}
                                    </div>
                                </div>
                                <div
                                    className={
                                        isEditDescription ? '' : 'flex flex-wrap items-center'
                                    }
                                >
                                    <p className="text-base font-medium text-[#1677ff]">
                                        Mô tả khóa học khóa học:
                                    </p>
                                    <div
                                        className="px-4"
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                    >
                                        {isEditDescription && (
                                            <div className="mt-4">
                                                <RichTextEditor
                                                    initialValue={
                                                        addCourseState.courseCreatedData.description
                                                    }
                                                    onSave={(value) => {
                                                        dispatch(setCourseDescription(value));
                                                        setEditDescription(false);
                                                    }}
                                                />
                                            </div>
                                        )}
                                        {!isEditDescription && (
                                            <div className="flex items-center gap-4">
                                                <p className="w-fit">
                                                    <RenderRichText
                                                        jsonData={
                                                            addCourseState.courseCreatedData
                                                                .description
                                                        }
                                                    />
                                                </p>
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
                                                        transition={{
                                                            duration: 0.3,
                                                            type: 'spring',
                                                        }}
                                                        className="space-x-4"
                                                    >
                                                        <IconButton
                                                            disabled={!isHovered}
                                                            onClick={() => setEditDescription(true)}
                                                            size="small"
                                                        >
                                                            <CreateIcon />
                                                        </IconButton>
                                                    </motion.div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-base font-medium text-[#1677ff]">
                                        Mục tiêu khóa học:
                                    </p>
                                    <div className="flex-1 px-4">
                                        <div className="mt-4">
                                            <MultipleInput
                                                maxInputItem={8}
                                                maxLengthInput={160}
                                                seperator="|"
                                                placeholders={[
                                                    'vd: Kiến thức OOP',
                                                    'vd: Kiến thức về giải mã hóa',
                                                    'vd: Kiến thức CSDL cơ bản',
                                                ]}
                                                onDataChange={(data) =>
                                                    dispatch(setCourseKnowledge(data))
                                                }
                                                values={courseCreatedData.knowdledgeDescription}
                                                size="middle"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {((currentMode === CouseMode.CREATE && current === 0) ||
                        (currentMode === CouseMode.UPDATE && current === 1)) && (
                        <div>
                            <p className="text-xl font-bold text-[#1677ff]">Hiển thị</p>
                            <div className="mt-8 flex flex-col gap-4 bg-[#f7f9fa] px-4 py-2">
                                <p className="text-base font-medium text-[#1677ff]">
                                    Thêm Thumbnail cho khóa học
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
                            </div>
                            <div className="mt-8 flex flex-col gap-4 bg-[#f7f9fa] px-4 py-2">
                                <p className="text-base font-medium text-[#1677ff]">
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
                        </div>
                    )}
                    {((currentMode === CouseMode.CREATE && current === 1) ||
                        (currentMode === CouseMode.UPDATE && current === 2)) && <Curriculum />}

                    {((currentMode === CouseMode.CREATE && current === 2) ||
                        (currentMode === CouseMode.UPDATE && current === 3)) && <Publication />}
                </Paper>
            </div>
        </div>
    );
};

export default CourseContent;
