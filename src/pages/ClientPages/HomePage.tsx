import { Button, Paper } from '@mui/material';
import { CourseTabs } from '../../components';
import { Carousel } from 'antd';
import { useEffect, useState } from 'react';
import { Course } from '../../types/Course.type';
import {
    useGetCoursesBaseRatingQuery,
    useGetCoursesBaseSalesQuery,
    useGetCoursesBaseStudentJoinedQuery,
} from '../../services/course.services';
import { Link } from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const imgBaner = [
    'https://img-b.udemycdn.com/notices/featured_carousel_slide/image/b677b28c-9faf-4439-b042-2a2add2828ef.jpg',
    'https://img-b.udemycdn.com/notices/featured_carousel_slide/image/9ea59bc2-bd61-463e-9ce9-7e71e8e586ae.jpg',
];

const HomePage = () => {
    const [topCoursesJoined, setTopCoursesJoined] = useState<Course[] | undefined>([]);
    const [topCoursesRating, setTopCoursesRating] = useState<Course[] | undefined>([]);
    const [topCoursesSales, setTopCoursesSales] = useState<Course[] | undefined>([]);

    const {
        data: coursesBaseJoined,
        isFetching: coursesBaseJoinedIsFetching,
        isSuccess: coursesBaseJoinedIsSuccess,
    } = useGetCoursesBaseStudentJoinedQuery(10);

    const {
        data: coursesBaseRating,
        isFetching: coursesBaseRatingIsFetching,
        isSuccess: coursesBaseRatingIsSuccess,
    } = useGetCoursesBaseRatingQuery(10);

    const {
        data: coursesBaseSales,
        isFetching: coursesBaseSalesIsFetching,
        isSuccess: coursesBaseSalesIsSuccess,
    } = useGetCoursesBaseSalesQuery(10);

    useEffect(() => {
        if (coursesBaseJoinedIsSuccess) {
            setTopCoursesJoined(coursesBaseJoined);
        }
    }, [coursesBaseJoinedIsSuccess]);

    useEffect(() => {
        if (coursesBaseRatingIsSuccess) {
            setTopCoursesRating(coursesBaseRating);
        }
    }, [coursesBaseRatingIsSuccess]);

    useEffect(() => {
        if (coursesBaseSalesIsSuccess) {
            setTopCoursesSales(coursesBaseSales);
        }
    }, [coursesBaseSalesIsSuccess]);
    return (
        <>
            <div className="container flex flex-col gap-16 text-[#2d2f31]">
                <div>
                    <Carousel autoplay autoplaySpeed={3000}>
                        {imgBaner.map((url, index) => (
                            <div key={index} className="relative w-full">
                                <img className="w-full object-cover" src={url} />
                                <div className="absolute left-[10%] top-[10%] hidden md:block ">
                                    <Paper elevation={2}>
                                        <div className="max-w-[400px] bg-white p-4 text-[#2d2f31]">
                                            <h1 className="text-4xl font-bold">Slow and steady</h1>
                                            <p className="mt-4">
                                                Try learning just 5–10 minutes a day. Continue your
                                                course and reach your peak potential.
                                            </p>
                                        </div>
                                    </Paper>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
                <div>
                    <CourseTabs
                        isLoading={coursesBaseJoinedIsFetching}
                        tabsTitle="Top các khóa học được yêu thích"
                        courseList={topCoursesJoined}
                    />
                </div>
                <div>
                    <CourseTabs
                        isLoading={coursesBaseRatingIsFetching}
                        tabsTitle="Top các khóa học được đánh giá cao"
                        courseList={topCoursesRating}
                    />
                </div>
                <div>
                    <CourseTabs
                        isLoading={coursesBaseSalesIsFetching}
                        tabsTitle="Top các khóa học ưu đãi"
                        courseList={topCoursesSales}
                    />
                </div>
                <div className="self-end">
                    <Link to={'/courses/'}>
                        <Button endIcon={<ArrowRightAltIcon />}>Xem thêm</Button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default HomePage;
