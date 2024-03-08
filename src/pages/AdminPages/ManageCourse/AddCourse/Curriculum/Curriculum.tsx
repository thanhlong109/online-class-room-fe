import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import SectionCreator from './SectionCreator';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { Section } from '../../../../../types/Course.type';
import AddIcon from '@mui/icons-material/Add';
import { Reorder } from 'framer-motion';
import { setSectionList } from '../../../../../slices/courseSlice';

const Curriculum = () => {
    const dispatch = useDispatch();
    const courseCreatedData = useSelector(
        (state: RootState) => state.course.addCourse.courseCreatedData,
    );
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
    return (
        <div>
            <p className="mb-4 text-xl font-bold text-[#1677ff]">Chu trình học</p>
            <div className="flex flex-col gap-8">
                <Reorder.Group values={sections} onReorder={setSection}>
                    {sections.map((section, index) => (
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
                            />
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </div>
            <div className="mt-8 flex justify-between">
                <Button
                    icon={<AddIcon />}
                    onClick={() => setSection([...sections, initialSectionValue])}
                >
                    Thêm Chương
                </Button>
                <Button>Lưu</Button>
            </div>
        </div>
    );
};

export default Curriculum;
