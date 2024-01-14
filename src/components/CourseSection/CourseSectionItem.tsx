import { useState } from 'react';
import CourseStep from './CourseStep';

interface TracksProps {
    track: Tracks;
}

const CourseSectionItem = ({ track }: TracksProps) => {
    const [displaySteps, isDisplaySteps] = useState(false);
    const handleOnSectionClick = () => {
        isDisplaySteps((pre) => !pre);
    };
    return (
        <>
            <div className="w-[900px]">
                <div
                    onClick={handleOnSectionClick}
                    className="flex cursor-pointer select-none justify-between rounded-lg border-[2px] border-[#ebebeb] bg-[#f5f5f5] py-[14px] pl-[48px] pr-[30px] text-sm text-[#333] duration-500 ease-in-out"
                >
                    <span className="font-medium">
                        {track.position} - {track.title}
                    </span>
                    <span>{track.track_steps.length} bài học</span>
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
