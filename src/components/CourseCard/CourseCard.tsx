import { Rating, styled } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { formatNumberWithCommas } from '../../utils/NumberFormater';
import { Popover } from 'antd';
import { CourseCardHover } from '..';
import { Course } from '../../types/Course.type';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGetRatingCourseQuery } from '../../services/ratingCourse.services';

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
    course: Course | undefined;
}

const CourseCard = ({ course }: Props) => {
    // const starRating = 4.5;
    // const tototalRating = formatNumberWithCommas(4852);
    const navigate = useNavigate();
    const [ratingData, setRatingData] = useState<{ averageRating: number; ratingCount: number }>({
        averageRating: 0,
        ratingCount: 0,
    });
    const handleOnCourseClick = () => {
        if (course) {
            navigate(`/courses/${course?.courseId}`);
        }
    };
    const { data: rating, isSuccess } = useGetRatingCourseQuery(course?.courseId || 0);
    useEffect(() => {
        if (isSuccess && rating) {
            setRatingData({
                averageRating: rating.averageRating,
                ratingCount: rating.ratingCount,
            });
        }
    }, [isSuccess, rating]);

    return (
        <>
            {course && (
                <Popover content={<CourseCardHover course={course} />} trigger="hover">
                    <div className="flex flex-col gap-2" onClick={handleOnCourseClick}>
                        <div className="flex max-h-[180px] items-center justify-center overflow-hidden">
                            <img className="w-max" src={course?.imageUrl} />
                        </div>
                        <h2 className="font-bold normal-case">{course?.title}</h2>
                        <div className="flex items-center gap-1 text-sm">
                            <span className=" font-mediuminde">{ratingData.averageRating}</span>
                            <StyledRating
                                name="half-rating-read"
                                value={ratingData.averageRating}
                                defaultValue={0}
                                precision={0.1}
                                emptyIcon={<StarIcon fontSize="inherit" />}
                                size="small"
                                readOnly
                            />
                            <span>({ratingData.ratingCount})</span>
                        </div>
                        <div className="text-[15px] font-bold">
                            {formatNumberWithCommas(course?.price)}₫
                        </div>
                    </div>
                </Popover>
            )}
        </>
    );
};

export default CourseCard;
