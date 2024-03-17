import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { Section, Step } from '../../types/Course.type';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FormatType, secondsToTimeString } from '../../utils/TimeFormater';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setStepActive } from '../../slices/learningCourseSlice';

export interface AccordionSection {
    sections: Section[];
    lastPosition: number;
}

const AccordionSection = ({ sections, lastPosition }: AccordionSection) => {
    const dispatch = useDispatch();
    const selectingStepPos = useSelector(
        (state: RootState) => state.learningCourse.stepActive.stepId,
    );
    const handleOnStepClick = (step: Step, sectionIndex: number, stepIndex: number) => {
        if (step.position <= lastPosition && selectingStepPos != step.position) {
            dispatch(setStepActive({ sectionIndex, stepIndex }));
        }
    };

    return (
        <div>
            {sections.map((section, sectionIndex) => (
                <Accordion key={sectionIndex} className=" !bg-[#ffffff]">
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        className="!px-8"
                    >
                        <Typography className="!text-[15px] !font-medium !text-[#1C2025]">
                            {section.position + ' - ' + section.title}
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails className=" !bg-white !p-0 ">
                        {section.steps.map((step, stepIndex) => {
                            return (
                                <div
                                    key={stepIndex}
                                    className={`flex select-none justify-between ${step.stepId === selectingStepPos ? 'bg-[#edf5fb]' : ''}  text-sm ${lastPosition >= step.position ? 'cursor-pointer hover:bg-[#edf5fb]' : 'cursor-auto text-[#c6c6c6]'} py-4 pl-12 pr-8`}
                                    onClick={() => handleOnStepClick(step, sectionIndex, stepIndex)}
                                >
                                    <span>
                                        {step.position}. {step.title}
                                    </span>
                                    <span className="min-w-11">
                                        {secondsToTimeString(step.duration, FormatType.MM_SS, [
                                            ' m',
                                            ' s',
                                        ])}
                                    </span>
                                </div>
                            );
                        })}
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default AccordionSection;
