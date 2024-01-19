import { Rating, styled } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { formatNumberWithCommas } from '../../utils/NumberFormater';

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

const CourseBanner = () => {
    const starRating = 3.8;
    const totalRating = formatNumberWithCommas(9999);
    const totalStudentJoin = formatNumberWithCommas(999999);
    return (
        <>
            <div className="flex  bg-[#2d2f31] py-8">
                <div className="container m-auto text-white">
                    <h1 className="text-3xl font-bold ">Khóa không giới hạn code game với Unity</h1>
                    <h2 className="mt-2 text-lg">Lên tầm cao mới với khả năng code game của bạn</h2>
                    <div className="mt-2 flex h-8 items-center gap-2 text-[#f69c08]">
                        <span className="text-sm">{starRating}</span>
                        <StyledRating
                            name="half-rating-read"
                            defaultValue={starRating}
                            precision={0.1}
                            emptyIcon={<StarIcon fontSize="inherit" />}
                            size="small"
                            readOnly
                        />
                        <span className="text-sm text-white">({totalRating} đánh giá)</span>
                        <span className="text-sm font-medium">{totalStudentJoin} học sinh</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CourseBanner;