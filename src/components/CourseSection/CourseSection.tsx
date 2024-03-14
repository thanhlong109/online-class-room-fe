import { Section, Step } from '../../types/Course.type';
import CourseSectionItem from './CourseSectionItem';
interface Props {
    courseSections: Section[] | undefined;
    active: boolean | undefined;
    isWrap: boolean;
    onSelectStep?: (step: Step) => void;
}

const CourseSection = ({ courseSections, isWrap, active, onSelectStep }: Props) => {
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
                            onSelectStep={onSelectStep}
                        />
                    ))}
            </div>
        </>
    );
};

export default CourseSection;
