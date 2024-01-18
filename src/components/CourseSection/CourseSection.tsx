import CourseSectionItem from './CourseSectionItem';
interface Props {
    courseSections: Tracks[] | undefined;
    active: boolean | undefined;
}

const CourseSection = ({ courseSections, active }: Props) => {
    return (
        <>
            <div className="flex w-full flex-col border-[1px] border-[#d1d7dc]">
                {courseSections &&
                    courseSections.map((track, index) => (
                        <CourseSectionItem active={active} key={index} track={track} />
                    ))}
            </div>
        </>
    );
};

export default CourseSection;
