import { Section } from '../../types/Course.type';
import CourseSectionItem from './CourseSectionItem';
interface Props {
    courseSections: Section[] | undefined;
    active: boolean | undefined;
    isWrap: boolean;
}

const CourseSection = ({ courseSections, isWrap, active }: Props) => {
    return (
        <>
            <div className="flex w-full flex-col border-[1px] border-[#d1d7dc]">
                {courseSections &&
                    courseSections.map((section, index) => (
                        <CourseSectionItem
                            active={active}
                            key={index}
                            isWrap={isWrap}
                            section={section}
                        />
                    ))}
            </div>
        </>
    );
};

export default CourseSection;
