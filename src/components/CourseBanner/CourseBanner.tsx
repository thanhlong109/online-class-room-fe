import { Rating, styled } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { formatNumberWithCommas } from '../../utils/NumberFormater';
import { Course } from '../../types/Course.type';
import { Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { useGetRatingCourseQuery } from '../../services/ratingCourse.services';
import { useCountStudentPerCourseQuery } from '../../services/course.services';

const StyledRating = styled(Rating)({
    '& .MuiRating-icon': {
        color: '#cccccc',
    },
    '& .MuiRating-iconFilled': {
        color: '#f69c08',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});

interface Props {
    course: Course;
    isLoading: boolean;
}

const CourseBanner = ({ isLoading, course }: Props) => {
    // const starRating = 3.8;
    // const totalRating = formatNumberWithCommas(9999);
    // const totalStudentJoin = formatNumberWithCommas(999999);
    const [ratingData, setRatingData] = useState<{ averageRating: number; ratingCount: number }>({
        averageRating: 0,
        ratingCount: 0,
    });
    const { data: rating, isSuccess } = useGetRatingCourseQuery(course?.courseId || 0);
    useEffect(() => {
        if (isSuccess && rating) {
            setRatingData({
                averageRating: rating.averageRating,
                ratingCount: rating.ratingCount,
            });
        }
    }, [isSuccess, rating]);

    const [totalStudents, setTotalStudents] = useState<number>(0);
    const { data: courseData, isError } = useCountStudentPerCourseQuery();
    useEffect(() => {
        if (courseData && courseData.length > 0) {
            // Lấy totalStudents từ dữ liệu câu truy vấn
            const courseWithMatchingId = courseData.find(
                (item) => item.courseId === course.courseId,
            );
            setTotalStudents(courseWithMatchingId?.totalStudents || 0);
        }
    }, [courseData]);

    if (isError) return <div>Error fetching data</div>;

    if (!courseData || courseData.length === 0) return <div>No data available</div>;

    return (
        <>
            {isLoading && <Skeleton active />}
            {!isLoading && course && (
                <div className="flex  bg-[#2d2f31] py-8">
                    <div className="container m-auto text-white">
                        <h1 className="text-3xl font-bold ">{course.title}</h1>
                        <h2 className="mt-2 text-lg"></h2>
                        <div className="mt-2 flex h-8 items-center gap-2 text-[#f69c08]">
                            <span className="text-sm">{ratingData.averageRating}</span>
                            <StyledRating
                                name="half-rating-read"
                                value={ratingData.averageRating}
                                defaultValue={0}
                                precision={0.1}
                                emptyIcon={<StarIcon fontSize="inherit" />}
                                size="small"
                                readOnly
                            />
                            <span className="text-sm text-white">
                                ({ratingData.ratingCount} đánh giá)
                            </span>
                            <span className="text-sm font-medium">
                                {formatNumberWithCommas(totalStudents)} học sinh
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CourseBanner;
