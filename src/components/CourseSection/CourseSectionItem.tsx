import { useState } from 'react';
import CourseStep from './CourseStep';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormatType, secondsToTimeString } from '../../utils/TimeFormater';
import { motion } from 'framer-motion';

interface TracksProps {
    track: Tracks;
    active: boolean | undefined;
}

const CourseSectionItem = ({ track, active }: TracksProps) => {
    const [displaySteps, isDisplaySteps] = useState(false);
    const [maxHeight, setmaxHeight] = useState('0px');
    const [rotate, setRotate] = useState(0);
    const handleOnSectionClick = () => {
        isDisplaySteps((pre) => !pre);
        setmaxHeight(displaySteps ? '0px' : `${52 * track.track_steps.length + 200}px`);
        setRotate(displaySteps ? 0 : 180);
    };

    let totalMinute: number = 0;
    track.track_steps.forEach((trackStep) => {
        totalMinute += trackStep.step.duration;
    });
    const formattedTime = secondsToTimeString(totalMinute, FormatType.HH_MM, ['h', 'm']);
    return (
        <>
            <div className="w-full border-[1px] border-[#d1d7dc]">
                <div
                    onClick={handleOnSectionClick}
                    className="relative flex cursor-pointer select-none justify-between rounded-lg  bg-[#f7f9fa] py-[14px] pl-[48px] pr-[30px] text-sm text-[#333]"
                >
                    <span className={`absolute  left-4`}>
                        <motion.div
                            animate={{ rotate: rotate }}
                            transition={{ duration: 0.3, type: 'tween' }}
                        >
                            <span>
                                <KeyboardArrowDownIcon />
                            </span>
                        </motion.div>
                    </span>
                    <span className="font-medium">
                        {track.position} - {track.title}
                    </span>
                    <span>
                        {track.track_steps.length} bài . {formattedTime}
                    </span>
                </div>
                <motion.div
                    animate={{ maxHeight: maxHeight }}
                    transition={{ duration: 0.3, type: 'tween' }}
                    className="overflow-hidden"
                >
                    {track.track_steps.map((step) => (
                        <CourseStep active={active} key={step.position} steps={step} />
                    ))}
                </motion.div>
            </div>
        </>
    );
};

export default CourseSectionItem;
