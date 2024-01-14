import dayjs from 'dayjs';

interface Props {
    steps: TrackSteps;
}

const CourseStep = ({ steps }: Props) => {
    const { step, position } = steps;
    const formattedTime = dayjs().set('minute', step.duration).format('HH:mm');
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
