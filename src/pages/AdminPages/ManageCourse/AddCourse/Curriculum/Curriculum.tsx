import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import SectionCreator from './SectionCreator';

const Curriculum = () => {
    const sectionList = useSelector(
        (state: RootState) => state.course.addCourse.courseCreatedData.sections,
    );
    return (
        <div>
            <p className="mb-4 text-xl font-bold text-[#1677ff]">Chu trình học</p>
            {sectionList.map((section) => (
                <SectionCreator
                    position={section.position}
                    key={section.sectionId}
                    section={section}
                />
            ))}
        </div>
    );
};

export default Curriculum;
