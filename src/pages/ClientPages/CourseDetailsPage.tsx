import { Skeleton } from 'antd';
import CourseSection from '../../components/CourseSection/CourseSection';
import {
    CourseBanner,
    CourseCardPreview,
    RatingCourseItem,
    RenderRichText,
} from '../../components';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { FormatType, secondsToTimeString } from '../../utils/TimeFormater';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetCourseIDQuery } from '../../services';
import { Course, Section } from '../../types/Course.type';

const CourseDetailsPage = () => {
    const location = useLocation();
    const [course, setCourse] = useState<Course>();
    const courseId = location.pathname.split('/').pop();
    const { data, isLoading } = useGetCourseIDQuery(courseId ? courseId : '');
    useEffect(() => {
        if (data) setCourse(data);
    }, [data]);
    const handleCalTotalTime = (sections: Section[]) => {
        let totalTimeLession = 0;
        sections.forEach((section) => {
            section?.steps.forEach((step) => {
                totalTimeLession += step?.duration;
            });
        });
        return secondsToTimeString(totalTimeLession, FormatType.HH_MM, ['h', 'm']);
    };

    const handleCalLession = (sections: Section[]) => {
        let totalLession = 0;
        sections.forEach((section) => {
            totalLession += section?.steps?.length;
        });
        return totalLession;
    };
    return (
        <>
            {course && (
                <div>
                    <div>
                        <CourseBanner isLoading={isLoading} course={course} />
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
                                                .filter((value) => value.trim().length > 0)
                                                .map((text, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-2 text-base"
                                                    >
                                                        <span className="h-fit">
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
                                        <div>
                                            {!isLoading && course != null && (
                                                <span>
                                                    {course?.sections?.length} học phần -{' '}
                                                    {handleCalLession(course?.sections)} bài học -{' '}
                                                    {handleCalTotalTime(course?.sections)} tổng thời
                                                    gian học
                                                </span>
                                            )}
                                            {isLoading && <Skeleton active />}
                                        </div>
                                        <div className="mt-4">
                                            {isLoading && <Skeleton active />}
                                            {!isLoading && (
                                                <CourseSection
                                                    isWrap={false}
                                                    active={false}
                                                    courseSections={course?.sections}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="mb-4 text-2xl font-bold text-[#2d2f31]">
                                            Chi tiết khóa học:
                                        </h1>
                                        <RenderRichText jsonData={course?.description} />
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
