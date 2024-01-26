import { useState } from 'react';
import CourseStep from './CourseStep';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormatType, secondsToTimeString } from '../../utils/TimeFormater';
import { motion } from 'framer-motion';
import { Section } from '../../types/Course.type';

interface SectionProps {
    section: Section;
    active: boolean | undefined;
    isWrap: boolean;
}

const CourseSectionItem = ({ section, active, isWrap }: SectionProps) => {
    const [displaySteps, isDisplaySteps] = useState(false);
    const [maxHeight, setmaxHeight] = useState('0px');
    const [rotate, setRotate] = useState(0);
    const handleOnSectionClick = () => {
        isDisplaySteps((pre) => !pre);
        setmaxHeight(displaySteps ? '0px' : `${52 * section.steps.length + 200}px`);
        setRotate(displaySteps ? 0 : 180);
    };

    let totalMinute: number = 0;
    section?.steps?.forEach((step) => {
        totalMinute += step.duration;
    });
    const formattedTime = secondsToTimeString(totalMinute, FormatType.HH_MM, ['h', 'm']);
    return (
        <>
            <div className="w-full border-[1px] border-[#d1d7dc]">
                <div
                    onClick={handleOnSectionClick}
                    className="relative flex cursor-pointer select-none rounded-lg  bg-[#f7f9fa] py-[14px] pl-[48px] pr-[30px] text-sm text-[#333]"
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
                    <div className={'flex flex-1 justify-between ' + (isWrap ? 'flex-col' : '')}>
                        <span className="font-medium">
                            {section?.position} - {section?.title}
                        </span>
                        <span className={isWrap ? 'ml-5' : ''}>
                            {section?.steps.length} bài . {formattedTime}
                        </span>
                    </div>
                </div>
                <motion.div
                    animate={{ maxHeight: maxHeight }}
                    transition={{ duration: 0.3, type: 'tween' }}
                    className="overflow-hidden"
                >
                    {section?.steps.map((step) => (
                        <CourseStep active={active} key={step.position} step={step} />
                    ))}
                </motion.div>
            </div>
        </>
    );
};

export default CourseSectionItem;
