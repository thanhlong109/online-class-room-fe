import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import SectionCreator from './SectionCreator';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { Section } from '../../../../../types/Course.type';
import AddIcon from '@mui/icons-material/Add';
import { Reorder } from 'framer-motion';
import { setSectionList } from '../../../../../slices/courseSlice';
import { useUpdateStepMutation } from '../../../../../services/step.services';

const Curriculum = () => {
    const dispatch = useDispatch();
    const courseCreatedData = useSelector(
        (state: RootState) => state.course.addCourse.courseCreatedData,
    );
    const [updateStepMutation, { isLoading: isUpdateLoading }] = useUpdateStepMutation();
    const sectionList = courseCreatedData.sections;
    const [sections, setSection] = useState<Section[]>(sectionList);

    useEffect(() => {
        setSection(sectionList);
    }, [courseCreatedData]);

    const initialSectionValue: Section = {
        course: null,
        courseId: courseCreatedData?.courseId!,
        position: 0,
        sectionId: -1,
        steps: [],
        title: '',
    };
    const handleSaveClick = () => {
        sections.forEach((section) => {
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
    };
    let prePosisition = 0;
    return (
        <div>
            <p className="mb-4 text-xl font-bold text-[#1677ff]">Chu trình học</p>
            <div className="flex flex-col gap-8">
                <Reorder.Group
                    values={sections}
                    onReorder={(arr) => {
                        const sortedArr = JSON.parse(JSON.stringify(arr));
                        arr.forEach((_, index) => {
                            sortedArr[index].position = index + 1;
                        });
                        setSection(sortedArr);
                    }}
                >
                    {sections.map((section, index) => {
                        prePosisition += index === 0 ? 0 : sections[index - 1].steps.length;
                        return (
                            <Reorder.Item
                                key={section.sectionId}
                                value={section}
                                onDragEnd={() => dispatch(setSectionList(sections))}
                                className="m-4 active:cursor-move"
                            >
                                <SectionCreator
                                    isCreate={section.sectionId === -1}
                                    position={index + 1}
                                    key={section.sectionId}
                                    section={section}
                                    startStepPosition={index === 0 ? 0 : prePosisition}
                                />
                            </Reorder.Item>
                        );
                    })}
                </Reorder.Group>
            </div>
            <div className="mt-8 flex justify-between">
                <Button
                    icon={<AddIcon />}
                    onClick={() => setSection([...sections, initialSectionValue])}
                >
                    Thêm Chương
                </Button>
                <Button loading={isUpdateLoading} onClick={handleSaveClick}>
                    Lưu
                </Button>
            </div>
        </div>
    );
};

export default Curriculum;
