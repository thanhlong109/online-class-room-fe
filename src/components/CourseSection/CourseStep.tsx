import { Step } from '../../types/Course.type';
import { secondsToTimeString, FormatType } from '../../utils/TimeFormater';

interface Props {
    step: Step;
    active: boolean | undefined;
}

const CourseStep = ({ step, active }: Props) => {
    const { position, duration } = step;
    const formattedTime = secondsToTimeString(duration, FormatType.MM_SS, [' m', ' s']);
    const handleOnClick = () => {
        if (active) {
            //dis[play video]
        }
    };
    return (
        <>
            <div
                onClick={handleOnClick}
                className={`flex min-h-[48px] items-center justify-between py-4 pl-[48px] pr-[30px] text-sm shadow-sm ${active ? 'cursor-pointer hover:bg-[#d0e1ed]' : ''}`}
            >
                <span>
                    {position}. {step?.title}
                </span>
                <span className="min-w-11">{formattedTime}</span>
            </div>
        </>
    );
};

export default CourseStep;
