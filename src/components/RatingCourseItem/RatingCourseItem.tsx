import { Avatar, Paper, Rating, styled } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

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

const RatingCourseItem = () => {
    const starRating = 4.8;
    return (
        <>
            <Paper elevation={2}>
                <div className="px-6 py-6 text-[#2d2f31]">
                    <div className="flex gap-4">
                        <Avatar
                            style={{ height: '40px', width: '40px' }}
                            src="https://th.bing.com/th/id/R.8da1bbe00590cf6fd1a30c7ec52833c6?rik=oJKgqspCMDp0hw&pid=ImgRaw&r=0"
                        />
                        <div>
                            <h2 className="font-bold ">Jost</h2>
                            <div className="mt-1 flex">
                                <span>
                                    <StyledRating
                                        name="half-rating-read"
                                        defaultValue={starRating}
                                        precision={0.1}
                                        emptyIcon={<StarIcon fontSize="inherit" />}
                                        size="small"
                                        readOnly
                                    />
                                </span>
                                <span className="ml-2 items-center text-xs font-bold">
                                    a month ago
                                </span>
                            </div>
                            <div className="text-sm">
                                A very complete course, I would say it is an intermediate level
                                course, although at the beginning you start with the basics.
                            </div>
                        </div>
                    </div>
                </div>
            </Paper>
        </>
    );
};

export default RatingCourseItem;
