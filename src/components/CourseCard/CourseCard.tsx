import { Rating, styled } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { formatNumberWithCommas } from '../../utils/NumberFormater';
import { Popover } from 'antd';
import { CourseCardHover } from '..';

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

const CourseCard = () => {
    const starRating = 4.5;
    const tototalRating = formatNumberWithCommas(4852);
    const price = formatNumberWithCommas(1699000);
    return (
        <>
            <Popover content={<CourseCardHover />} trigger="hover">
                <div className="flex flex-col gap-2">
                    <img src="https://img-b.udemycdn.com/course/480x270/5544072_edc7_5.jpg" />
                    <h2 className="font-bold normal-case">Lập trình game với unity</h2>
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
                    <div className="font-medium">{price}đ</div>
                </div>
            </Popover>
        </>
    );
};

export default CourseCard;
