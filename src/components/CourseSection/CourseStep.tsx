import { secondsToTimeString, FormatType } from '../../utils/TimeFormater';

interface Props {
    steps: TrackSteps;
}

const CourseStep = ({ steps }: Props) => {
    const { step, position } = steps;
    const formattedTime = secondsToTimeString(step.duration, FormatType.MM_SS);
    return (
        <>
            <div className="flex h-[48px] items-center justify-between pl-[48px] pr-[30px] text-sm shadow-sm">
                <span>
                    {position}. {step.title}
                </span>
                <span>{formattedTime}</span>
            </div>
        </>
    );
};

export default CourseStep;
