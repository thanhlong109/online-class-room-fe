import { useNavigate } from 'react-router-dom';
import { RegistrationCourse } from '../../types/RegistrationCourse.type';
import { Progress } from 'antd';
import { Paper } from '@mui/material';
import moment from 'moment/min/moment-with-locales';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface Props {
    registrationCourse: RegistrationCourse;
}

const CourseCardProgress = ({ registrationCourse }: Props) => {
    const navigate = useNavigate();
    const handleOnCourseClick = () => {
        if (registrationCourse) {
            navigate(`/courses/${registrationCourse.courseId}`);
        }
    };
    const parsedDate = moment(registrationCourse.enrollmentDate);
    const [isHover, setIsHover] = useState(false);
    return (
        <>
            <motion.div animate={{ scale: isHover ? 1.05 : 1 }} transition={{ duration: 0.3 }}>
                <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                    <Paper
                        elevation={2}
                        className="flex cursor-pointer flex-col gap-2 !rounded-[8px]"
                        onClick={handleOnCourseClick}
                    >
                        <div className="flex max-h-[120px] items-center justify-center overflow-hidden overflow-y-hidden rounded-t-[8px]">
                            <img
                                className="h-[120px] min-h-[120px] w-full"
                                src={registrationCourse.courseImg}
                            />
                        </div>
                        <div className="flex flex-col gap-1 px-2 py-1">
                            <p className="line-clamp-2 text-sm font-bold normal-case">
                                {registrationCourse.courseTitle}
                            </p>
                            <div className="flex items-center gap-1 text-sm">
                                <p className="flex-1 text-sm">Đã tham gia: </p>
                                <p className="text-sm">
                                    {parsedDate.locale('vi').startOf('hour').fromNow()}
                                </p>
                            </div>
                            <div className="text-[15px] font-bold">
                                <Progress
                                    percent={Math.round(registrationCourse.learningProgress * 100)}
                                />{' '}
                            </div>
                        </div>
                    </Paper>
                </div>
            </motion.div>
        </>
    );
};

export default CourseCardProgress;
