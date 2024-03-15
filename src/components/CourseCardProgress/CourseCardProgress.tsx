import { Rating, styled } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { formatNumberWithCommas } from '../../utils/NumberFormater';
import { Popover } from 'antd';
import { CourseCardHover } from '..';
import { Course } from '../../types/Course.type';
import { useNavigate } from 'react-router-dom';

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

const CourseCardProgress = ({ course }: Props) => {
    const starRating = 4.5;
    const tototalRating = formatNumberWithCommas(4852);
    const navigate = useNavigate();
    const handleOnCourseClick = () => {
        if (course) {
            navigate(`/courses/${course?.courseId}`);
        }
    };
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
                            <span className=" font-mediuminde">{starRating}</span>
                            <StyledRating
                                name="half-rating-read"
                                defaultValue={starRating}
                                precision={0.1}
                                emptyIcon={<StarIcon fontSize="inherit" />}
                                size="small"
                                readOnly
                            />
                            <span>({tototalRating})</span>
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

export default CourseCardProgress;
