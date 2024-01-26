import { Skeleton } from 'antd';
import CourseSection from '../../components/CourseSection/CourseSection';
import { CourseBanner, CourseCardPreview, RatingCourseItem } from '../../components';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { FormatType, secondsToTimeString } from '../../utils/TimeFormater';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const CourseDetailsPage = () => {
    const courseState = useSelector((state: RootState) => state.course.courseDetails);
    const [course, setCourse] = useState(courseState);
    const location = useLocation();
    useEffect(() => {
        if (!course) {
            const courseId = location.pathname.split('/').pop();
            //load course
        }
    }, []);

    const handleCalTotalTime = (tracks: Tracks[]) => {
        let totalTimeLession = 0;
        tracks.map((track) => {
            track.track_steps.map((step) => {
                totalTimeLession += step.step.duration;
            });
        });
        return secondsToTimeString(totalTimeLession, FormatType.HH_MM, ['h', 'm']);
    };

    const handleCalLession = (tracks: Tracks[]) => {
        let totalLession = 0;
        tracks.map((track) => {
            totalLession += track.track_steps.length;
        });
        return totalLession;
    };
    return (
        <>
            {course && (
                <div>
                    <div>
                        <CourseBanner course={course} />
                        <div className="container">
                            <div className="flex max-w-[1290px] flex-col gap-10 md:flex-row">
                                <div className="order-3 flex flex-1 flex-col gap-10 py-10 md:order-1">
                                    <div className=" border-[1px] border-[#d1d7dc] px-4 pb-4 pt-6">
                                        <h1 className="text-2xl font-bold text-[#2d2f31]">
                                            Bạn sẽ học được:
                                        </h1>
                                        <div className="mt-3 grid grid-cols-2 gap-2">
                                            {course.knowdledgeDescription
                                                .split('|')
                                                .map((text, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-2 text-base"
                                                    >
                                                        <span>
                                                            <CheckOutlinedIcon
                                                                style={{ fontSize: 'inherit' }}
                                                            />
                                                        </span>
                                                        <span>{text}</span>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="mb-4 text-2xl font-bold text-[#2d2f31]">
                                            Nội dung khóa học:
                                        </h1>
                                        {/* <div>
                                        {!isLoading && data?.tracks != null && (
                                            <span>
                                                {data.tracks.length} học phần -{' '}
                                                {handleCalLession(data.tracks)} bài học -{' '}
                                                {handleCalTotalTime(data.tracks)} tổng thời gian học
                                            </span>
                                        )}
                                    </div>
                                    <div className="mt-4">
                                        {isLoading && <Skeleton active />}
                                        {!isLoading && (
                                            <CourseSection
                                                active={false}
                                                courseSections={data?.tracks}
                                            />
                                        )}
                                    </div> */}
                                    </div>
                                    <div>
                                        <h1 className="mb-4 text-2xl font-bold text-[#2d2f31]">
                                            Chi tiết khóa học:
                                        </h1>
                                        <p className="text-sm">{course.description}</p>
                                    </div>
                                    <div>
                                        <h1 className="mb-4 text-2xl font-bold text-[#2d2f31]">
                                            5 course rating - 47 ratings
                                        </h1>
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <RatingCourseItem />
                                            <RatingCourseItem />
                                            <RatingCourseItem />
                                            <RatingCourseItem />
                                        </div>
                                    </div>
                                </div>
                                <div className="order-2 m-auto mt-[-10px] md:mt-[-100px]">
                                    <CourseCardPreview course={course} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CourseDetailsPage;
