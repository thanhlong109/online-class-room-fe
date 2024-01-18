import { useState } from 'react';
import CourseStep from './CourseStep';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormatType, secondsToTimeString } from '../../utils/TimeFormater';

interface TracksProps {
    track: Tracks;
}

const CourseSectionItem = ({ track }: TracksProps) => {
    const [displaySteps, isDisplaySteps] = useState(false);
    const handleOnSectionClick = () => {
        isDisplaySteps((pre) => !pre);
    };
    let totalMinute: number = 0;
    track.track_steps.map((trackStep) => {
        totalMinute += trackStep.step.duration;
    });
    const formattedTime = secondsToTimeString(totalMinute, FormatType.HH_MM, ['giờ', 'phút']);
    return (
        <>
            <div className="w-full border-[1px] border-[#d1d7dc]">
                <div
                    onClick={handleOnSectionClick}
                    className="relative flex cursor-pointer select-none justify-between rounded-lg  bg-[#f7f9fa] py-[14px] pl-[48px] pr-[30px] text-sm text-[#333] duration-500 ease-in-out"
                >
                    <span className={`absolute  left-5`}>
                        <KeyboardArrowDownIcon />
                    </span>
                    <span className="font-medium">
                        {track.position} - {track.title}
                    </span>
                    <span>
                        {track.track_steps.length} bài học . {formattedTime}
                    </span>
                </div>
                <div>
                    {displaySteps &&
                        track.track_steps.map((step) => (
                            <CourseStep key={step.position} steps={step} />
                        ))}
                </div>
            </div>
        </>
    );
};

export default CourseSectionItem;
