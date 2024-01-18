import CourseSectionItem from './CourseSectionItem';
interface Props {
    courseSections: Tracks[] | undefined;
}

const CourseSection = ({ courseSections }: Props) => {
    return (
        <>
            <div className="flex flex-col border-[1px] border-[#d1d7dc]">
                {courseSections &&
                    courseSections.map((track, index) => (
                        <CourseSectionItem key={index} track={track} />
                    ))}
            </div>
        </>
    );
};

export default CourseSection;
